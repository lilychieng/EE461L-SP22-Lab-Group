from datetime import datetime, timedelta

class CheckoutReceipt:

    def __init__(self, r_id, user, quantity):
        self.receipt_id = r_id
        self.__returned = False
        
        self.__user = user
        self.__quantity = quantity
        self.__checkout = datetime.now()
        
    def extendDueDate(self, num_days:int, num_hrs:int, num_mins:int):
        '''
        Updates the due date for any CheckoutReceipt with an extension

        Parameters:
        num_days - Number of days to extend due date by
        num_hrs - Number of hours to extend due date by
        num_mins - Number of minutes to extend due date by

        Returns:
        Datetime object corresponding to the checkout receipt's new due date
        '''

        self.__checkout = self.__checkout + timedelta(days=num_days, hours=num_hrs, mins=num_mins)
        return self.__checkout

    def getUser(self):
        '''
        Returns:
        Username corresponding to the receipt
        '''
        return self.__user
    
    def getQuantity(self):
        '''
        Returns:
        Quantity of board checked out corresponding to the receipt
        '''
        return self.__quantity
    
    def toDatabase(self):
        db = {
            "ID": self.receipt_id,
            "Returned": self.__returned,
            "User": self.__user,
            "Quantity": self.__quantity,
            "Time": self.__checkout
        }

        return db