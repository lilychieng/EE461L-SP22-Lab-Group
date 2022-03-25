from flask import Flask, redirect, url_for, request
from pymongo import MongoClient
from cryptography.fernet import Fernet
from configparser import ConfigParser

app = Flask(__name__)
config = ConfigParser()

#Static route example
@app.route('/')
def index():
   return 'Hello world'

#Add additional routes here

if __name__ == '__main__':
   #Parse config file and decrypt password using stored key
   config.read("db_config.ini")
   key = Fernet(config.get("Credentials", "Key").encode('UTF-8'))
   password = key.decrypt(config.get("Credentials", "Password").encode('UTF-8')).decode('UTF-8')

   #Establish connection to cloud DB
   c = MongoClient(f"mongodb+srv://dbuser:{password}@backend.yqoos.mongodb.net/Checkout?retryWrites=true&w=majority")
   #Establish Flask instance
   app.run(debug=True)