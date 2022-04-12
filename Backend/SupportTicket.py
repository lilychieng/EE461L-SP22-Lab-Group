import datetime
from enum import Enum, IntEnum

class TicketStatus(Enum):
    SUBMITTED = 0
    IN_PROGRESS = 1
    COMPLETED = 2

    def __int__(self):
        return self.value

class SupportTicket:

    def __init__(self, email, message):
        self.__username = email                     # string
        self.__created_on = datetime.datetime.now() # datetime
        self.__description = message                # string
        self.__status = self.enumeration[0]         # integer
        
    def getDescription(self):
        # return description of the ticket
        return self.__description
        
    def getStatus(self):
        # return the status of the ticket
        return self.__status

    # prob will delete
    def getUsername(self):
        return self.__username

    def getDateCreated(self):
        return self.__created_on

    def setMessage(self, message):
        self.__description = message

    # have a button that changes with what the status currently is
    def setStatus(self, new_status):
        if not isinstance(new_status, TicketStatus):
            return -1
        else:
            self.__status = new_status

    def toDatabase(self):
        # return a dictionary configured for the database
        dict = {
            "username": self.__username,
            "created_on": self.__created_on,
            "description": self.__description,
            "status": int(self.__status)
        }

        return dict