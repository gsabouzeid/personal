#==========================================
# Purpose: Represents an adventurer character
# Instance variables:
#   name - Name of the character
#   level - Level of the character
#   strength - Strength of the character
#   speed - Speed of the character
#   power - Power of the character
#   HP - Hit points of the character
#   hidden - Boolean representing whether the character is hidden or not
# Methods:
#   __repr__ - Official string representation of the object
#   attack - How the character is able to attack
#==========================================
class Adventurer:
    def __init__(self, name, level, strength, speed, power):
        self.name = name
        self.level = level
        self.strength = strength
        self.speed = speed
        self.power = power
        self.HP = level * 6
        self.hidden = False
    def __repr__(self):
        return self.name + ' - HP: ' + str(self.HP)
    def attack(self, target):
        if target.hidden == True:
            print(self.name + " can't see " + target.name)
        else:
            print(self.name + ' attacks ' + target.name + ' for ' + str(self.strength + 4) + ' damage')
            target.HP -= self.strength + 4
    def __lt__(self,other):
        return self.HP < other.HP
            
#==========================================
# Purpose: Represents a thief character
# Instance variables:
#   Name - See class Adventurer
#   level - See class Adventurer
#   strength - See class Adventurer
#   speed - See class Adventurer
#   power - See class Adventurer
#   HP - See class Adventurer
#   hidden - See class Adventurer
# Methods:
#   attack - See class Adventurer
#==========================================  
class Thief(Adventurer):
    def __init__(self, name, level, strength, speed, power):
        Adventurer.__init__(self, name, level, strength, speed, power)
        self.HP = level * 8
        self.hidden = True
    def attack(self, target):
        if self.hidden == True:
            self.hidden = False
            target.hidden = False
            target.HP -= (self.speed + self.level) * 5
            print(self.name + ' sneak attacks ' + target.name + ' for ' + str((self.speed + self.level) * 5) + ' damage ')
        else:
            Adventurer.attack(self, target)
            
#==========================================
# Purpose: Represents a Ninja character
# Instance variables: **Inherited from Thief Class, see class Thief**
# Methods:
#   attack - See class Adventurer
#==========================================    
class Ninja(Thief):
    def attack(self,target):
        Thief.attack(self, target)
        self.hidden = True
        self.HP += self.level
        
#==========================================
# Purpose: Represents a Mage character
# Instance variables:
#   Name - See class Adventurer
#   level - See class Adventurer
#   strength - See class Adventurer
#   speed - See class Adventurer
#   power - See class Adventurer
#   fireballs_left - Number of fireballs left that the Mage has
# Methods:
#   attack - See class Adventurer
#========================================== 
class Mage(Adventurer):
    def __init__(self, name, level, strength, speed, power):
        Adventurer.__init__(self, name, level, strength, speed, power)
        self.fireballs_left = power
    def attack(self, target):
        if self.fireballs_left == 0:
            Adventurer.attack(self, target)
        else:
            print(self.name + ' casts fireball on ' + target.name + ' for ' + str(self.level * 3) + ' damage')
            target.HP -= self.level * 3
            target.hidden = False
            self.fireballs_left -= 1
            
#==========================================
# Purpose: Represents a Wizard character
# Instance variables:
#   Name - See class Adventurer
#   level - See class Adventurer
#   strength - See class Adventurer
#   speed - See class Adventurer
#   power - See class Adventurer
#   HP - See class Adventurer
#   fireballs_left - See class Mage
# Methods:
#   **Inherited from Mage Class, see class Mage**
#========================================== 
class Wizard(Mage):
    def __init__(self, name, level, strength, speed, power):
        Mage.__init__(self, name, level, strength, speed, power)
        self.HP = level * 4
        self.fireballs_left = power * 2

def battle(player_list,enemy_list):
    print('----------Player Turn----------')
    print('Your team:')
    for char in player_list:
        print(char)
    print()
    for char in player_list:
        for enemy in range(0,len(enemy_list)):
            print('Enemy ' + str(enemy + 1) + ' : ' + str(enemy_list[enemy]))
        num = int(input('Choose a target for ' + char.name + ': '))
        char.attack(enemy_list[num-1])
        if enemy_list[num-1].HP <= 0:
            print(str(enemy_list[num-1].name) + ' was defeated!')
            enemy_list.remove(enemy_list[num-1])
        if len(enemy_list) == 0:
            print('You win!')
            return player_list
        print()
    print('----------Enemy Turn----------')
    for enemy in enemy_list:
        enemy.attack(min(player_list))
        if min(player_list).HP <= 0:
            print(min(player_list).name + ' was defeated!')
            player_list.remove(min(player_list))
        if len(player_list) == 0:
            print('You lose!')
            return enemy_list
    print()
    return battle(player_list,enemy_list)
    





















    



