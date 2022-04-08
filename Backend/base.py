from flask import Flask, redirect, url_for, request, jsonify, abort, Response
from bson import json_util, ObjectId
import json
from pymongo import MongoClient
from cryptography.fernet import Fernet
from configparser import ConfigParser
from hashlib import sha256
from flask_cors import CORS, cross_origin
from Users import Users
from projects import Project
import certifi

app = Flask(__name__)
CORS(app, supports_credegntials=True)
config = ConfigParser()
c = ""

#Static route example
@app.route('/')
def index():
   return app.send_static_file('index.html')

@app.route('/projects/join/', methods=["POST"])
def join_users_projects():
   user_id = request.args.get('user_id')
   req = json.loads(request.data)
   payload = req['data']
   project_id = payload['projectID']

   try:
      # Update project to the User
      collection = c.Checkout.Users
      matched = collection.find_one({'_id': ObjectId(user_id)})
      print(matched)
      projects = matched['projects']
      if(project_id in projects):
         return "Already a member"
      projects.append(project_id)
      collection.update_one({'_id': ObjectId(user_id)}, {'$set': {'projects': projects}})

      # Update project by adding the User
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

# Returns all projects that a single user is a part of
@app.route('/projects/user/')
def get_users_projects():
   user_id = request.args.get('user_id')
   collection = c.Checkout.Users
   matched = collection.find_one({'_id': ObjectId(user_id)})

   if(matched is None):
      return "User not found"
   else:
      page_sanitized = json.loads(json_util.dumps(matched))
      return jsonify(page_sanitized['projects'])

# Get all projects on the database
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

@app.route('/projects/create/', methods=["POST"])
def create_project():
   req = json.loads(request.data)
   print(req)
   payload = req['data']

   name = payload['name']
   id = payload['projectID']
   description = payload['description']
   demo = payload['demo']

   newProject = Project(name, id, description, demo)
   collection = c.Checkout.Projects
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
# @cross_origin(supports_credentials=True)
def signup():
   req = json.loads(request.data)
   payload = req['data']
   
   username = payload['username']                                       #Plaintext username
   password = sha256(payload['password'].encode('UTF-8')).hexdigest()   #Hashed password
   
   user = Users(username, password)                                     #User object

   collection = c.Checkout.Users
   matched = collection.find_one({'user': username})
   print(user.to_database(), flush=True)
   if matched != None:
      return 'user already exists', 400

   #TODO: 300 code for existing user, do user validation later
   
   try:
      t_id = c.Checkout.Users.insert_one(user.to_database()).inserted_id
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
# @cross_origin(supports_credentials=True)
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
   #Parse config file and decrypt password using stored key
   config.read("db_config.ini")
   key = Fernet(config.get("Credentials", "Key").encode('UTF-8'))
   password = key.decrypt(config.get("Credentials", "Password").encode('UTF-8')).decode('UTF-8')
   ca = certifi.where()

   #Establish connection to cloud DB
   c = MongoClient(f"mongodb+srv://dbuser:{password}@backend.yqoos.mongodb.net/Checkout?retryWrites=true&w=majority", tlsCAFile=ca)

   #Establish Flask instance
   app.run(debug=True)