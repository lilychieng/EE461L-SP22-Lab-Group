from datetime import date, datetime
from enum import Enum, IntEnum

class Status(Enum):
    STUDENT = 0
    EMPLOYEE = 1
    ADMIN = 2
    OWNER = 3

    def __int__(self):
        return self.value
        
class Users:
    def __init__(self, username, password):
        self.__username = username
        self.__password = password
        self.__receipts = []
        self.__projects = []
        self.__classes = []

        self.__status = Status.STUDENT
        self.__timeCreated =  datetime.now()
    
    def get_username(self):
        return self.__username
        
    def get_password(self):
        return self.__password
    
    def get_timeCreated(self):
        return self.__timeCreated
        
    def get_classes(self):
        return self.__classes

    def get_status(self):
        return self.__status

    def set_username(self, username):
        self.__username = username
    
    def set_password(self, password):
        self.__password = password

    def set_classes(self, classes):
        self.__classes = classes

    def set_status(self, status):
        self.__status = status
    
    def updateTime(self):
        self.__timeCreated =  datetime.now()

    def verifyUsername(self):
        if (len(self.__username) < 8):
            return False
        return True
    
    def verifyPassword(self):
        if (len(self.__password) < 8):
            return False
        return True

    def add_receipt(self, receipt):
        self.__receipts.append(receipt)
        
    '''
    Returns -1 if no receipt with ID matching `remove_id` was found.
    Returns 0 upon successful removal of receipt with ID `remove_id`
    '''
    def remove_receipt(self, remove_id):
        for receipt in self.__receipts:
            if receipt.id == remove_id:
                self.__receipts.remove(receipt)
                return 0
        return -1

    def to_database(self):
        return {
            "user": self.__username, 
            "created-on": self.__timeCreated, 
            "password": self.__password, 
            "classes": self.__classes, 
            "status": int(self.__status)
        }
