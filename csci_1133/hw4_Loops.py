import random

#==========================================
# Purpose: Calculates the exponential function 
# Input Parameter(s):
#   x - The number being multiplied by itself
#   y - How many times x is being muliplied by
# Return Value(s):
#   The result of the calculation
#==========================================
def expo(x,y):
    a = 1
    prod = 1
    while a <= y:
        total = 0
        b = 1
        while b <= x:
            total += prod
            b += 1
        prod = total
        a += 1
    return prod

#==========================================
# Purpose: Determines the result of the rock, paper, scissors round
# Input Parameter(s): None
# Return Value(s):
#   1 - Player won the round
#   0 - Player and computer tied
#   -1 - Computer won the round
#==========================================       
def rps_round():
    x = input("Enter R, P, or S: " )
    while x != "R" and x != "P" and x != "S":
        print("Invalid Input")
        x = input("Enter R, P, or S: " )
    comp_move = random.choice('RPS')
    if comp_move == "R" and x == "S":
        print("Computer selects R")
        print("Computer Wins!")
        return -1
    elif comp_move == "R" and x == "P":
        print("Computer selects R")
        print("Player Wins!")
        return 1
    elif comp_move == "R" and x == "R":
        print("Computer selects R")
        print("Tie!")
        return 0
    elif comp_move == "P" and x == "R":
        print("Computer selects P")
        print("Computer Wins!")
        return -1
    elif comp_move == "P" and x == "S":
        print("Computer selects P")
        print("Player Wins!")
        return 1
    elif comp_move == "P" and x == "P":
        print("Computer selects P")
        print("Tie!")
        return 0
    elif comp_move == "S" and x == "P":
        print("Computer selects S")
        print("Computer Wins!")
        return -1
    elif comp_move == "S" and x == "R":
        print("Computer selects S")
        print("Player Wins!")
        return 1
    elif comp_move == "S" and x == "S":
        print("Computer selects S")
        print("Tie!")
        return 0

#==========================================
# Purpose: Series of rock, paper, scissors rounds to create a full game
# Input Parameter(s):
#   num_wins - Number of wins needed to win the game
# Return Value(s):
#   1 - Player won the game
#   -1 - Computer won the game
#==========================================
def rps_game(num_wins):
    player_wins = 0
    comp_wins = 0
    while player_wins < num_wins and comp_wins < num_wins:
        x = rps_round()
        if x == 1:            
            player_wins += 1
            print("")
            print("Player wins:", player_wins)
            print("Computer wins:", comp_wins)
            print("")
        elif x == -1:
            comp_wins += 1
            print("")
            print("Player wins:", player_wins)
            print("Computer wins:", comp_wins)
            print("")
        elif x == 0:
            print("")
    if player_wins == num_wins:
        return 1
    elif comp_wins == num_wins:
        return -1
    
    
        
