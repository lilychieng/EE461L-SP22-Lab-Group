from flask import Flask, redirect, url_for, request, jsonify, abort, Response
from bson import json_util, ObjectId
import json
from pymongo import MongoClient
from cryptography.fernet import Fernet
from configparser import ConfigParser
from hashlib import sha256
from flask_cors import CORS, cross_origin
import certifi

from Users import Users
from projects import Project
from CheckoutReceipt import CheckoutReceipt
from hardwareSet import HardwareSet

app = Flask(__name__)
CORS(app, supports_credegntials=True)
config = ConfigParser()
# Reference to MongoClient
c = ""
# Available HWSets users can check out from
hardware_sets = []

'''
Returns: 
Static page corresponding to homepage of built frontend
'''
@app.route('/')
def index():
   return app.send_static_file('index.html')

'''
Parameters:
`project_id`: ID corresponding to project to search for hardware sets with no items checked out to `project_id`

Returns:
An array of all hardware sets that a project has yet to check out hardware for
'''
@app.route('/user/not_checked_out_hw/', methods=["POST"])
def not_checked_out_hw():
   req = json.loads(request.data)
   payload = req['data']
   project_id = payload['project_id']

   # Comprehension of all hardware sets that do not contain a receipt of checked out hw under `project_id`
   hw = [set for set in c.Checkout.Hardware.find({'projects': {'$not': {'$elemMatch': {'project_id': project_id}}}})]

   response = []

   for document in hw:
      page_sanitized = json.loads(json_util.dumps(document))
      response.append(page_sanitized)
      
   return jsonify(response)

'''
Parameters:
`user`: ID of user to search for hardware associated with their registered proejcts

Returns: 
Hardware checked out for all projects a user 
has registered themselves as a member of
'''
@app.route('/user/checked_out_hw/', methods=["POST"])
def checked_out_hw():
   req = json.loads(request.data)
   payload = req['data']
   user_id = payload['user']

   hw_collection = c.Checkout.Hardware
   user_collection = c.Checkout.Users
   # Find all projects a user is registered to
   matched = user_collection.find_one({'_id': ObjectId('625068ca4453786c33e5ec70')})
   page_sanitized = json.loads(json_util.dumps(matched))
   projects = page_sanitized['projects']

   response = []

   for p in projects:
      # Comprehension of all hardware sets with hardware loaned to project `p`
      HWSets = [set for set in hw_collection.find({'projects': {'$elemMatch': {'project_id': p}}})]
   
      project_hw = {'project_id': p, 'HWSets': json.loads(json_util.dumps(HWSets))}
      response.append(project_hw)
   
   if response is None:
      return "No data found"
   else:
      return jsonify(response)

#TODO: Rewrite for DB updates
@app.route('/projects/checkin/', methods=["POST"])
def checkin():  
   req = json.loads(request.data)
   payload = req['data']

   project_id = payload['project_id']
   HWSet_id = payload['HWSet_id']
   user = payload['user']
   checkin_qty = payload['checkin_qty']

   collection = c.Checkout.HWSets
   matched = collection.find_one({'_id': ObjectId(HWSet_id)})

   # Check if checkin_qty exceeds the amount checked out
   if (matched.getCheckedoutQty() < checkin_qty):
      return "checkin_qty is larger than the amount checked out"

   matched.check_in(checkin_qty)
   collection.update_one({'_id': ObjectId(HWSet_id)}, matched)

   # Check if all hardwareSets have been returned, and if so, then remove the id from project
   if (matched.getCheckedoutQty() == 0):

      collection = c.Checkout.Projects
      project = collection.find_one({'project_id': project_id})
      project.removeHWSet(HWSet_id)
      collection.update_one({'project_id': project_id}, project)

   return "Successful checkin"

'''
Parameters:
`user`: ObjectID of user checkout action. Should be a member of project with ID `project_id` that hardware is being checked out under
`project_id`: ID of project with which to register the hardware
`HWSet_id`: ObjectId of hardware set to check out items from
`checkout_qty`: Number of items to check out from hardware set associated with `HWSet_id`

Returns:
On success, updated hardware set data to display updated checkout data to the user
'''
@app.route('/projects/checkout/', methods=["POST"])
def checkout():
   # Parse JSON payload
   req = json.loads(request.data)
   payload = req['data']

   project_id = payload['project_id']
   HWSet_id = payload['HWSet_id']
   user_id = payload['user']
   checkout_qty = payload['checkout_qty']

   #
   hwset_collection = c.Checkout.Hardware
   user_collection = c.Checkout.Users

   matched = user_collection.find_one({'_id': ObjectId(user_id)}) # getting a user given user_id
   if matched == None:
      return 'Unsuccessful Checkout - user does not exist'

   hwset = hwset_collection.find_one({'_id': ObjectId(HWSet_id)})

   if checkout_qty > hwset['availability']:
      return 'Unsuccessful Checkout - checkout quantity exceeds HW set availability'
   
   # Modify hwset's availability   
   new_avail = hwset['availability'] - checkout_qty

   # Increment number used in hwset's project arr's proj_id
   proj_dict = hwset['projects']
   incremented = False
   for proj in proj_dict:
      if proj['project_id'] == project_id:
         incremented = True
         proj['checked_out'] += checkout_qty
   
   if not incremented:
      # Add id to proj_dict w initial checkout_qty
      proj_dict.append({"project_id" : project_id, "checked_out" : checkout_qty})

   try:
      hwset_collection.update_one({'_id': ObjectId(HWSet_id)}, {"$set" : {"projects" : proj_dict, "availability" : new_avail}})
   except Exception as e:
      return "Check out failed"
   else:
      # Return updated so front-end can be updated immediately upon completion
      updated_hw_set = hwset_collection.find_one({'_id': ObjectId(HWSet_id)})
      return jsonify(updated_hw_set)

'''
Parameters:
`user_id`: ObjectID of user to enroll in the project corresponding to `projectID`
`projectID`: ID of created project to enroll a user in 

Returns:
Status message detailing success or failure of adding user to project
'''
@app.route('/projects/join/', methods=["POST"])
def join_users_projects():

   # Parse JSON payload
   user_id = request.args.get('user_id')
   req = json.loads(request.data)
   payload = req['data']
   project_id = payload['projectID']

   try:
      collection = c.Checkout.Users
      matched = collection.find_one({'_id': ObjectId(user_id)})

      projects = matched['projects']
      if (project_id in projects):
         return "Already a member"

      projects.append(project_id)
      # Add `project_id` to list of user-enrolled projects
      collection.update_one({'_id': ObjectId(user_id)}, {'$set': {'projects': projects}})

      # Update project by adding `user_id` to `contributors` in relevant project
      collection = c.Checkout.Projects
      matched = collection.find_one({'ID': project_id})
      contribs = matched['Contributors']
      contribs.append(user_id)
      collection.update_one({'ID': project_id}, {'$set': {'Contributors': contribs}})

   except Exception as e:
      print(e)
      return "There was an error with your request"
   else:
      return "Sucessfully joined the group"

'''
Parameters:
`user_id`: ObjectId of user from which to obtain associated projects

Returns:
List of projects that a given user is a part of
'''
@app.route('/projects/user/')
def get_users_projects():

   user_id = request.args.get('user_id')
   collection = c.Checkout.Users
   matched = collection.find_one({'_id': ObjectId('user_id')})

   if (matched is None):
      return "User not found"
   
   page_sanitized = json.loads(json_util.dumps(matched))
   # Query DB given user for all projects in the user's joined project list
   projects = [json.loads(json_util.dumps(c.Checkout.Projects.find_one({"ID": project_id}))) 
               for project_id in page_sanitized['projects']]
   
   return jsonify(projects)

'''
Parameters:
None

Returns:
List of all created projects
'''
@app.route('/projects/all/', methods=["GET"])
def get_projects():
   projects = []
   collection = c.Checkout.Projects
   cursor = collection.find({})

   for document in cursor:
      print(document)
      page_sanitized = json.loads(json_util.dumps(document))
      projects.append(page_sanitized)

   return jsonify(projects)

'''
Parameters:
`name`: Name of project to create
'projectID': Unique four-digit identifier for the project to create
`description`: Description of project to create
`demo`: Optional parameter of video link of project to display

Returns:
Status message associated with success or failure of ability to create object
'''
@app.route('/projects/create/', methods=["POST"])
def create_project():
   req = json.loads(request.data)
   print(req)
   payload = req['data']

   name = payload['name']
   id = payload['projectID']
   description = payload['description']
   demo = payload['demo']

   collection = c.Checkout.Projects
   matched = collection.find_one({'ID': id})
   if (matched is not None):
      return "Project ID is taken"
      
   newProject = Project(name, id, description, demo)
   collection.insert_one(newProject.to_db())
   return "Project sucessfully added!"

'''
Route: signup
Creates new user and registers them within the `Users` database

Returns:
400 - Server received malformed username or password formatting
500 - Internal server failed to register within the `Users` database
200 - Succesful user registration in the database
'''
@app.route('/user/signup/', methods=["POST"])
def signup():
   req = json.loads(request.data)
   payload = req['data']
   
   username = payload['username']                                       #Plaintext username
   password = sha256(payload['password'].encode('UTF-8')).hexdigest()   #Hashed password
   
   user = Users(username, password)                                     #User object

   collection = c.Checkout.Users
   matched = collection.find_one({'user': username})
   print(user.toDatabase(), flush=True)
   if matched != None:
      return 'user already exists', 400

   #TODO: 300 code for existing user, do user validation later
   
   try:
      t_id = c.Checkout.Users.insert_one(user.toDatabase()).inserted_id
   except Exception as e:
      print(e, flush=True)
      return "failed to register user", 500
   else:
      return "successfully registered", 200

'''
Route: login
Searches for first match of provided email (unique identifier) in the database, then
verifies password hashes match with database entry.

Returns:
404 - User email in credentials do not match any existing entry
401 - User password in credentials does not match an existing entry
200 - Successful user login
'''
@app.route('/user/login/', methods=["POST"])
def login():
   req = json.loads(request.data)
   print(req, flush=True)
   
   payload = req['data']

   username = payload['username']                                       #Plaintext username
   password = sha256(payload['password'].encode('UTF-8')).hexdigest()   #Hashed password

   collection = c.Checkout.Users
   matched = collection.find_one({'user': username})

   if matched is None:
      return 'user not found'
   elif (matched['password'] == password):
      return {'message': 'success', 'user_id': json.loads(json_util.dumps(matched))['_id']['$oid']}
   else:
      return 'user credentials do not match'

if __name__ == '__main__':
   # Parse config file and decrypt password using stored key
   config.read("db_config.ini")
   key = Fernet(config.get("Credentials", "Key").encode('UTF-8'))
   password = key.decrypt(config.get("Credentials", "Password").encode('UTF-8')).decode('UTF-8')
   ca = certifi.where()

   # Establish connection to cloud DB
   c = MongoClient(f"mongodb+srv://dbuser:{password}@backend.yqoos.mongodb.net/Checkout?retryWrites=true&w=majority", tlsCAFile=ca)
   
   # Establish Flask instance
   app.run(debug=True)