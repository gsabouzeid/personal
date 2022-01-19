import turtle, platform, math

#TODO: Fill out the Purpose, Input Parameter(s), and Return Value
# for each of the two functions below in comments, and then write
# additional functions for parts B and C, and fill out the same information
# for those functions as well.

#Remember, you must place a # before any comment, or it will be
# interpreted as Python code, and will probably cause errors.

# cents
#==========================================
# Purpose:
#   Computes the total number of cents given different coin values   
# Input Parameter(s):
#   quarters - A coin worth 25 cents
#   dimes - A coin worth 10 cents
#   nickels - A coin worth 5 cents
#   pennies - A coin worth 1 cent   
# Return Value:
#   The total number of cents  
#==========================================

def cents(quarters, dimes, nickels, pennies):
    total = 0
    total += quarters*25
    total += dimes*10
    total += nickels*5
    total += pennies
    return total

# draw_M
#==========================================
# Purpose:
#   Draws the University of Minnesota Logo
# Input Parameter(s):
#   None   
# Return Value:
#   None
#==========================================

def draw_M():
    turtle.delay(0)
    turtle.bgcolor("gold")
    turtle.hideturtle()
    turtle.color("maroon")
    turtle.penup()
    turtle.setpos(-200,-100)
    turtle.pendown()
    turtle.begin_fill()
    turtle.forward(120)
    turtle.left(90)
    turtle.forward(64)
    turtle.left(90)
    turtle.forward(20)
    turtle.right(120)
    turtle.forward(80)
    turtle.right(120)
    turtle.forward(28)
    turtle.right(120)
    turtle.forward(14)
    turtle.left(90)
    turtle.forward(64)
    turtle.left(90)
    turtle.forward(128)
    turtle.left(90)
    turtle.forward(64)
    turtle.left(90)
    turtle.forward(14)
    turtle.right(120)
    turtle.forward(28)
    turtle.right(120)
    turtle.forward(80)
    turtle.right(120)
    turtle.forward(20)
    turtle.left(90)
    turtle.forward(64)
    turtle.left(90)
    turtle.forward(120)
    turtle.left(90)
    turtle.forward(64)
    turtle.left(90)
    turtle.forward(28)
    turtle.right(60)
    turtle.forward(140)
    turtle.right(120)
    turtle.forward(20)
    turtle.left(90)
    turtle.forward(64)
    turtle.left(90)
    turtle.forward(120)
    turtle.left(90)
    turtle.forward(64)
    turtle.left(90)
    turtle.forward(20)
    turtle.right(120)
    turtle.forward(52)
    turtle.right(120)
    turtle.forward(52)
    turtle.right(120)
    turtle.forward(20)
    turtle.left(90)
    turtle.forward(64)
    turtle.left(90)
    turtle.forward(120)
    turtle.left(90)
    turtle.forward(64)
    turtle.left(90)
    turtle.forward(20)
    turtle.right(120)
    turtle.forward(140)
    turtle.right(60)
    turtle.forward(28)
    turtle.left(90)
    turtle.forward(64)
    turtle.end_fill()

# Part B: star8
#==========================================
# Purpose:
#   Draws an 8-pointed star   
# Input Parameter(s):
#   None   
# Return Value:
#   None   
#==========================================

def star8():
    turtle.forward(200)
    turtle.left(135)
    turtle.forward(200)
    turtle.left(135)
    turtle.forward(200)
    turtle.left(135)
    turtle.forward(200)
    turtle.left(135)
    turtle.forward(200)
    turtle.left(135)
    turtle.forward(200)
    turtle.left(135)
    turtle.forward(200)
    turtle.left(135)
    turtle.forward(200)

# Part C: trajectory
#==========================================
# Purpose:
#   Computes the distance from where the ball is thrown to when it hits the ground
# Input Parameter(s):
#   height - initial height at which the ball is thrown, in meters
#   speed - initial speed at which the ball is thrown, in meters/second
#   angle - angle at which the ball is thrown relative to the horizontal
#           ground plane, in degrees
# Return Value:
#   Distance the ball flew before hitting the ground, in meters
#==========================================

def trajectory(height, speed, angle):
    distance = 0
    v_horizontal = speed * math.cos((math.pi / 180) * angle)
    v_vertical = speed * math.sin((math.pi / 180) * angle)
    ball_time = (v_vertical + math.sqrt(v_vertical**2 + 19.6 * height)) / 9.8
    print("Horizontal Speed:",round(v_horizontal, 3),"m/s")
    print("Vertical Speed:",round(v_vertical, 3),"m/s")
    print("Flight Time:",round(ball_time, 3),"s")
    distance = v_horizontal * ball_time
    return round(distance,3)
