from datetime import date, datetime
from enum import Enum, IntEnum

class UserPermissions(Enum):
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
        self.__projects = []
        self.__classes = []

        self.__status = UserPermissions.STUDENT
        self.__timeCreated =  datetime.now()
    
    def getUsername(self):
        return self.__username
        
    def getPassword(self):
        return self.__password
    
    def getDateCreated(self):
        return self.__timeCreated
        
    def getClasses(self):
        return self.__classes

    def getStatus(self):
        return self.__status

    def setUsername(self, username):
        self.__username = username
    
    def setPassword(self, password):
        self.__password = password

    '''Takes in list of classes to add'''
    def addClasses(self, classes):
        self.__classes.extend(classes)

    def setStatus(self, new_status):
        if not isinstance(new_status, UserPermissions):
            return -1
        else:
            self.__status = new_status
    
    def updateTime(self):
        self.__timeCreated =  datetime.now()

    #TODO: Move verification methods to a module
    def verifyUsername(self):
        #TODO: Add regex verification for '@utexas.edu'
        if (len(self.__username) < 8):
            return False
        return True
    
    def verifyPassword(self):
        if (len(self.__password) < 8):
            return False
        return True

    #Maybe should be removed
    def addProjects(self, project):
        for ids in self.__projects:
            if (ids == project):
                return
        self.__projects.extend(project)

    #Maybe should be removed
    def removeProjects(self, project):
        for ids in self.__projects:
            if (ids == project):
                self.__projects.remove(project)

    def toDatabase(self):
        return {
            "user": self.__username, 
            "created-on": self.__timeCreated, 
            "password": self.__password, 
            "classes": self.__classes, 
            "projects": self.__projects,
            "status": int(self.__status)
        }
