from pymongo import MongoClient

from pymongo import MongoClient

client = MongoClient('mongodb+srv://nehathakor:minorproject@cluster0.xvvcmlj.mongodb.net/signdata?retryWrites=true&w=majority&appName=Cluster0')  # MongoDB connection URI
db = client['signdata']  # Use the same name you specified in settings.py

class User:
    def __init__(self, fullname, username, email, password):
        self.fullname = fullname
        self.username = username
        self.email = email
        self.password = password

user_collection = db['users']  # Collection name for users

def create_user(fullname, username, email, password):
    user_data = {
        'fullname': fullname,
        'username': username,
        'email': email,
        'password': password
    }
    user_collection.insert_one(user_data)

def get_user_by_username(username):
    return user_collection.find_one({'username': username})
