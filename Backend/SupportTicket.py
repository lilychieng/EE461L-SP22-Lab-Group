import datetime

class SupportTicket:

    enumeration =   (
                        'Sent',         # 0.
                        'In-progress',  # 1.
                        'Completed',    # 2.
                    )

    def __init__(self, email, message):
        self.__username = email                     # string
        self.__created_on = datetime.datetime.now() # datetime
        self.__description = message                # string
        self.__status = self.enumeration[0]         # integer
        
    def get_description(self):
        # return description of the ticket
        return self.__description
        
    def get_status(self):
        # return the status of the ticket
        return self.__status

    # prob will delete
    def get_username(self):
        return self.__username

    def get_created_on(self):
        return self.__created_on

    def set_message(self, message):
        self.__description = message

    # have a button that changes with what the status currently is
    def set_status(self, new_stat):
        self.__status = self.enumeration[new_stat]

    def to_db(self):
        # return a dictionary configured for the database
        dict = {
            "username": self.__username,
            "created_on": self.__created_on,
            "description": self.__description,
            "status": self.__status
        }

        return dict