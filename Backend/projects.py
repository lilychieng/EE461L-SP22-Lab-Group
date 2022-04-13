
from sqlite3 import dbapi2


class Project:

    def __init__(self, name, project_id, description, demo):
        self.__name = name
        self.__project_id = project_id
        self.__description = description
        self.__demo = demo

        #Only hold contributor usernames
        self.__contributors = []
        #References to receipt objects
        self.__receipts = []

    #returns project name string
    def getName(self):
        return self.__name

    #sets name
    def setName(self, newName):
        self._name = newName
        return

    #returns contributors array
    def getContributors(self):
        return self.__contributors

    #sets whole contributors array
    def setContributors(self, contributors):
        self.__contributors = list(contributors)
        return

    #returns description string
    def getDescription(self):
        return self.__description

    #sets description string
    def setDescription(self, description):
        self.__name = description
        return

    #returns demo string
    def getDemo(self):
        return self.__demo

    #sets demo string
    def setDemo(self, demo):
        self.__demo = demo
        return

    #adds id to array of contributors
    def addContributor(self, id):
        self.__contributors.append(id)
        return

    #deletes id from array of contributors
    def delContributor(self, id):
        self.__contributors.remove(id)
        return

    def addReceipt(self, receipt):
        self.__receipts.append(receipt)
        
    '''
    Returns -1 if no receipt with ID matching `remove_id` was found.
    Returns 0 upon successful removal of receipt with ID `remove_id`
    '''
    def removeReceipt(self, remove_id):
        for receipt in self.__receipts:
            if receipt.id == remove_id:
                self.__receipts.remove(receipt)
                return 0
        return -1

    def getReceipts(self):
        '''Return DB variant
        db = [receipt.toDatabase() for receipt in self.__receipts]
        return db
        '''
        #Returns references of receipts related to the project
        return self.__receipts

    #send to mongodb
    def toDatabase(self):
        db = {
            "Name": self.__name,
            "Contributors": self.__contributors,
            "ID": self.__project_id,
            "Description": self.__description,
            "Demo": self.__demo
        }
        return db