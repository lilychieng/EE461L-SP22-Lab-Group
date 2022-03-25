
class project:

    def __init__(self, name, contributors, description, demo):
        self.__name = name
        self.__contributors = list(contributors)
        self.__description = description
        self.__demo = demo

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

    #send to mongodb
    def toDB(self):
        db = {
        "Name": self.__name,
        "Contributors": self.__contributors,
        "Description": self.__description,
        "Demo": self.__demo
        }
        return db


    