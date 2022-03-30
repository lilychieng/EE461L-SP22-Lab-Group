from flask import Flask, redirect, url_for, request
from pymongo import MongoClient
from cryptography.fernet import Fernet
from configparser import ConfigParser
from hashlib import sha256
from flask_cors import CORS
from Users import Users

app = Flask(__name__)
CORS(app)
config = ConfigParser()
c = ""

#Static route example
@app.route('/home/')
def index():
   return 'Hello world'

'''

'''
@app.route('/user/signup/', methods=["GET"])
def signup():
   print(f"Routing works", flush=True)
   payload = request.args.to_dict()

   username = payload['username']                                       #Plaintext username
   password = sha256(payload['password'].encode('UTF-8')).hexdigest()   #Hashed password

   user = Users(username, password)                                     #User object

   #TODO: 300 code for existing user, do user validation later

   try:
      t_id = c.Checkout.Users.insert_one(user.to_database()).inserted_id
   except:
      return "failed to register user", 500
   else:
      print(f"User registered, transaction id is {t_id}", flush=True)
      return "successfully registered", 200


'''

'''
@app.route('/user/login/', methods=["GET"])
def login():
   payload = request.args.to_dict()

   username = payload['username']                                       #Plaintext username
   password = sha256(payload['password'].encode('UTF-8')).hexdigest()   #Hashed password
   
   print(f"Entered user credentials: {username}, {password}", flush=True)

   collection = c.Checkout.Users
   matched = collection.find_one({'user': username})
   
   if (matched['password'] == password):
      return 'success', 200
   else:
      return 'user not found', 404


if __name__ == '__main__':
   #Parse config file and decrypt password using stored key
   config.read("db_config.ini")
   key = Fernet(config.get("Credentials", "Key").encode('UTF-8'))
   password = key.decrypt(config.get("Credentials", "Password").encode('UTF-8')).decode('UTF-8')

   #Establish connection to cloud DB
   c = MongoClient(f"mongodb+srv://dbuser:{password}@backend.yqoos.mongodb.net/Checkout?retryWrites=true&w=majority")

   #Establish Flask instance
   app.run(debug=True)