

class HardwareSet:
    
    def __init__(self, qty, class_name):
        self.__capacity = qty
        self.__availability = qty
        self.__class_name = class_name
        self.__projects = []

    def getAvailability(self):
        # return the number of unused units
        return self.__availability
        
    def getCapacity(self):
        # return the total capacity of units
        return self.__capacity
        
    def getCheckedoutQty(self):
        # return total number of checkout quanities
        return self.__capacity - self.__availability
        
    #TODO augment to create receipts when checking out
    def checkOut(self, project_id, qty):
        # checks out qty numbers of units
        # update availability to availability - qty
        
        if (qty > self.__availability):
            # in this situation where amount of units wanted is greater than available
            # checkout the rest that are available
            # return -1
            
            self.__availability = 0
            return -1  # error
        
        self.__availability -= qty
        return 0  # success
    
    #TODO augment to remove receipts when checking in 
    def checkIn(self, user, qty):
        # update the number of units 
        self.__availability += qty
    

    