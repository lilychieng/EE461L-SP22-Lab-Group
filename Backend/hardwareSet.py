class HardwareSet:
    
    def __init__(self, qty, class_name):
        self.__capacity = qty
        self.__availability = qty
        self.__class_name = class_name

    def get_availability(self):
        # return the number of unused units
        return self.__availability
        
    def get_capacity(self):
        # return the total capacity of units
        return self.__capacity
        
    def get_checkedout_qty(self):
        # return total number of checkout quanities
        return self.__capacity - self.__availability
        
    #TODO augment to create receipts when checking out
    def check_out(self, user, qty):
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
    def check_in(self, user, qty):
        # update the number of units 
        self.__availability += qty
    
    def add_receipt(self, receipt):
        self.__receipts.append(receipt)

    #TODO 
    