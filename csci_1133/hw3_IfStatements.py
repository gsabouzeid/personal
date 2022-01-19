#print_121
#==========================================
# Purpose: Calls the function, print_121_1(), 5 times
#          and prints the string, "Who needs loops?", 1 time
# Input Parameter(s): None
# Return Value(s): None
#==========================================
def print_121():
    print_121_1()
    print_121_1()
    print_121_1()
    print_121_1()
    print_121_1()
    print("Who needs loops?")

#print_121_1
#==========================================
# Purpose: Calls the function, print_121_2(), 6 times
# Input Parameter(s): None
# Return Value(s): None
#========================================== 
def print_121_1():
    print_121_2()
    print_121_2()
    print_121_2()
    print_121_2()
    print_121_2()
    print_121_2()
    
#print_121_2
#==========================================
# Purpose: Prints the string, "Who needs loops?", 4 times
# Input Parameter(s): None
# Return Value(s): None
#========================================== 
def print_121_2():
    print("Who needs loops?")
    print("Who needs loops?")
    print("Who needs loops?")
    print("Who needs loops?")

#choice
#==========================================
# Purpose: Player chooses 1 of the 3 choices given

# Input Parameter(s):
#   text- The prompt the user is given
#   optionA - The first choice the player is given
#   optionB - The second choice the player is given
#   optionC - The third choice the player is given
# Return Value(s):
#   "A" - corresponds to optionA
#   "B" - corresponds to optionB
#   "C" - corresponds to optionC
#==========================================
def choice(text,optionA,optionB,optionC):
    print(text)
    print()
    print("A: "+optionA)
    print("B: "+optionB)
    print("C: "+optionC)
    player_choice = input("Choose A, B, or C: ")
    if player_choice == "A":
        return "A"
    elif player_choice == "B":
        return "B"
    elif player_choice == "C":
        return "C"
    else:
        print("Invalid option, defaulting to A")
        return "A"
    
#adventure
#==========================================
# Purpose: A story with several endings that the player will experience in by making
#          choices throughout the story
# Input Parameter(s): None
# Return Value(s): A boolean. "True" meaning you won the game.
#                  "False" meaning you lost the game
#==========================================
def adventure():
    x = choice("You are imbounding the ball, Your team is down 1, you have 24 seconds to score a basket. What do you do?",
           "Pass to the player closest to you",
           "Pass the ball full court",
           "Pass to the player at mid-court")
    if x == "A":
        y = choice("You played it safe and gave the player the ball with no risk",
               "Shoot the ball full-court",
               "dribble the ball to the 3-point line",
               "Pass the ball mid-court to the other teammate")
        if y == "A":
            print("Your luck drilled a full-court shot to win the game!")
            return True
        if y == "B":
            z = choice("You are now at the 3-point line, the pressure is on",
                   "Shoot the ball",
                   "Dribble to the basket",
                   "Pass again to the teammate in the corner")
            if z == "A":
                print("You made the 3-point shot to win the game!")
                return True
            if z == "B":
                print("You blow by your defender and made the layup to win the game!")
                return True
            if z == "C":
                print("You pass the ball and a defender comes out of nowhere to steal the ball. You lost the game")
                return False
        if y == "C":
            a = choice("You are now halfway up the court",
                   "Dribble up the court",
                   "Pass to the player on the 3-point line",
                   "Shoot the ball mid-court")
            if a == "A":
                print("The defender stole the ball from you and you lost the game")
                return False
            if a == "B":
                b =choice("You are now at the 3-point line, the pressure is on",
                          "Shoot the ball",
                          "Dribble to the basket",
                          "Pass again to the teammate in the corner")
                if b == "A":
                    print("You made the 3-point shot to win the game!")
                    return True
                if b == "B":
                    print("You blow by your defender and made the layup to win the game!")
                    return True
                if b == "C":
                    print("You pass the ball and a defender comes out of nowhere to steal the ball. You lost the game")
                    return False
            if a == "C":
                print("Your luck drilled a half-court shot. You won the game!")
                return True
            
                
    if x == "B":
        print("You threw the ball out of bounds and lost the game")
        return False
    if x == "C":
        c = choice("You are now halfway up the court",
               "Dribble up the court",
               "Pass to the player on the 3-point line",
               "Shoot the ball mid-court")
        if c == "A":
            print("The defender stole the ball from you and you lost the game")
            return False
        if c == "B":
            d =choice("You are now at the 3-point line, the pressure is on",
                   "Shoot the ball",
                   "Dribble to the basket",
                   "Pass again to the teammate in the corner")
            if d == "A":
                print("You made the 3-point shot to win the game!")
                return True
            if d == "B":
                print("You blow by your defender and made the layup to win the game!")
                return True
            if d == "C":
                print("You pass the ball and a defender comes out of nowhere to steal the ball. You lost the game")
                return False
        if c == "C":
            print("Your luck drilled a half-court shot. You won the game!")
            return True
        
        
    




    

    
