#==========================================
# Purpose: Models a complex number
# Instance variables:
#   real - Represents the real component of the complex number
#   imag - Represents the imaginary component of the complex number
# Methods:
#   __init__ - The constructor of the class
#   get_real - Gets the value of the real number
#   get_imag - Gets the value of the imaginary number
#   set_real - Sets the value of the real number
#   set_imag - Sets the value of the imaginary number
#   __str__ - String representation of the object
#   __add__ - Adds the corresponding attributes of the objects and returns a new object
#   __mul__ - Multiplies the corresponding attributes of the objects and returns a new object
#   __eq__ - Returns a boolean comparing two of the same class objects
#=========================================
class Complex:
    def __init__(self, real, imag):
        self.real = real
        self.imag = imag
    def get_real(self):
        return self.real
    def get_imag(self):
        return self.imag
    def set_real(self, new_real):
        self.real = new_real
    def set_imag(self, new_imag):
        self.imag = new_imag
    def __str__(self):
        return str(self.real) + ' + ' + str(self.imag) + 'i'
    def __add__(self,other):
        new_real = self.real + other.get_real()
        new_imag = self.imag + other.get_imag()
        return Complex(new_real, new_imag)
    def __mul__(self,other):
        new_real = (self.real * other.get_real()) - (self.imag * other.get_imag())
        new_imag = (self.real * other.get_imag()) + (self.imag * other.get_real())
        return Complex(new_real, new_imag)
    def __eq__(self,other):
        return self.real == other.get_real() and self.imag == other.get_imag()
    
#==========================================
# Purpose: Gives a description on a clothing item
# Instance variables:
#   name - Name of the clothing
#   price - The price of the clothing
#   category - What kind of clothing it is
#   store - What store is selling the piece of clothing
# Methods:
#   __init__ - The constructor of the class
#   get_name - Gets the name of the clothing
#   set_name - Sets the name of the clothing
#   get_price - Gets the price of the clothing
#   set_price - Sets the price of the clothing
#   get_category - Gets the category of the clothing
#   set_category - Sets the category of the clothing
#   get_store - Gets the store where the piece of clothing is being sold at
#   set_store - Sets the store where the piece of clothing is being sold at
#   __str__ - String representaion of the object
#   __lt__ - Compares to different Item objects if one is less than the other
#==========================================
class Item:
    def __init__(self, name, price, category, store):
        self.name = name
        self.price = price
        self.category = category
        self.store = store
    def get_name(self):
        return self.name
    def set_name(self, new_name):
        self.name = new_name
    def get_price(self):
        return self.price
    def set_price(self, new_price):
        self.price = new_price
    def get_category(self):
        return self.category
    def set_category(self, new_category):
        self.category = new_category
    def get_store(self):
        return self.store
    def set_store(self, new_store):
        self.store = new_store
    def __str__(self):
        return self.name + ', ' + self.category + ', ' + self.store + ': $' + str(self.price)
    def __lt__(self,other):
        return self.price < other.get_price()
    
#==========================================
# Purpose: Shows all of the clothing being sold at the store
# Instance variables:
#   name - The name of the store
#   items - List of Item objects, representing every item in the store
# Methods:
#   __init__ - The constructor of the class
#   __str__ - String representation of the object
#==========================================
class Store:
    def __init__(self, name, filename):
        self.name = name
        self.items = []
        fp = open(filename)
        fp.readline()
        for line in fp:
            clothing = line.split(',')
            clothing[2] = clothing[2].replace('\n','')
            self.items.append(Item(clothing[0],float(clothing[1]),clothing[2],name))
    def __str__(self):
        full_str = ''
        for item in self.items:
            list_str = str(Item(item.name,item.price,item.category,item.store))
            full_str = full_str + list_str + '\n'
        return self.name + '\n' + full_str

def cheap_outfit(store_list):
    cheap_head = ''
    cheap_torso = ''
    cheap_legs = ''
    cheap_feet = ''
    for store in store_list:
        for item in store.items:
            if item.category == 'Head' and cheap_head == '' or item.category == 'Head' and item.price < cheap_head.price:
                cheap_head = item
            if item.category == 'Torso' and cheap_torso == '' or item.category == 'Torso' and item.price < cheap_torso.price:
                cheap_torso = item
            if item.category == 'Legs' and cheap_legs == '' or item.category == 'Legs' and item.price < cheap_legs.price:
                cheap_legs = item
            if item.category == 'Feet' and cheap_feet == '' or item.category == 'Feet' and item.price < cheap_feet.price:
                cheap_feet = item
    outfit = {'Head': cheap_head, 'Torso': cheap_torso, 'Legs': cheap_legs, 'Feet': cheap_feet}
    return outfit



        
