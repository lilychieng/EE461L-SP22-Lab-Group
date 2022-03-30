from datetime import date, datetime

class Users:
    def __init__(self, username, password, classes, status):
        self.__username = username
        self.__password = password
        self.__classes = classes
        self.__status = status
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

    def toDatabase(self):
        return [{"user": self.__username}, {"created-on": self.__timeCreated}, {"password": self.__password}, {"classes": self.__classes}, {"status": self.__status}]