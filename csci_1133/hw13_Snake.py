import tkinter as tk
import random

#==========================================
# Purpose: Represents the graphic user interface of the snake game
# Instance variables:
#   win - The window of the GUI
#   canvas - The canvas shown in the window
#   board - The boundaries where the snakes can move around
#   snake - The snake the player controls
#   enemysnake = The computer controlled snake
#   fx - x coordinate of the food pellet
#   fy - y coordinate of the food pellet
#   food - The canvas drawn food pellet
# Methods:
#   __init__ - Constructor of the class
#   gameloop - After a set number of milliseconds, the canvas updates to create an animation
#   restart - Deletes everything from the canvas and creates a brand new canvas for a new game, essentially restarting the game
#==========================================
class SnakeGUI:
    def __init__(self):
        self.win = tk.Tk()
        self.canvas = tk.Canvas(self.win, width = 660, height = 660)
        self.canvas.pack()
        self.board = self.canvas.create_rectangle(30, 30, 630, 630)
        self.snake = Snake(330,330,'green',self.canvas)
        self.enemysnake = Snake(120,120,'purple',self.canvas)
        self.win.bind('<Down>',self.snake.go_down)
        self.win.bind('<Up>',self.snake.go_up)
        self.win.bind('<Right>',self.snake.go_right)
        self.win.bind('<Left>',self.snake.go_left)
        self.fx = random.randrange(30,600,30)
        self.fy = random.randrange(30,600,30)
        self.food = self.canvas.create_oval(self.fx,self.fy,self.fx+30,self.fy+30,fill='red')
        self.gameloop()
    def gameloop(self):
        if self.snake.gameover() == True:
            self.canvas.create_text(330,330, text='Final Score: ' + str(len(self.snake.segments)))
            self.win.bind('r',self.restart)
            return False
        if self.snake.move(self.fx,self.fy) == True or self.enemysnake.enemy_move(self.fx,self.fy) == True:
            self.canvas.delete(self.food)
            self.fx = random.randrange(30,600,30)
            self.fy = random.randrange(30,600,30)
            self.food = self.canvas.create_oval(self.fx,self.fy,self.fx+30,self.fy+30,fill='red')
        for i in range(0,len(self.enemysnake.segments)):
            if self.snake.x == self.canvas.coords(self.enemysnake.segments[i])[0] and self.snake.y == self.canvas.coords(self.enemysnake.segments[i])[1]:
                self.canvas.create_text(330,330, text='Final Score: ' + str(len(self.snake.segments)))
                self.win.bind('r',self.restart)
                return False
        for i in range(0,len(self.snake.segments)):
            if self.enemysnake.x == self.canvas.coords(self.snake.segments[i])[0] and self.enemysnake.y == self.canvas.coords(self.snake.segments[i])[1]:
                self.canvas.create_text(330,330, text='Final Score: ' + str(len(self.snake.segments)))
                self.win.bind('r',self.restart)
                return False
        self.canvas.after(100, self.gameloop)
    def restart(self,event):
        self.canvas.delete(tk.ALL)
        self.board = self.canvas.create_rectangle(30, 30, 630, 630)
        self.snake = Snake(330,330,'green',self.canvas)
        self.enemysnake = Snake(120,120,'purple',self.canvas)
        self.win.bind('<Down>',self.snake.go_down)
        self.win.bind('<Up>',self.snake.go_up)
        self.win.bind('<Right>',self.snake.go_right)
        self.win.bind('<Left>',self.snake.go_left)
        self.win.unbind('r')
        self.fx = random.randrange(30,600,30)
        self.fy = random.randrange(30,600,30)
        self.food = self.canvas.create_oval(self.fx,self.fy,self.fx+30,self.fy+30,fill='red')
        self.gameloop()
        
#==========================================
# Purpose: Represents the snake object
# Instance variables:
#   x - x coordinate of the snake
#   y - y coordinate of the snake
#   color - Color of the snake
#   canvas - The canvas the snake will be drawn on
#   snake - The snake being drawn on the canvas
#   segments - A list of the snake's segments
#   vx - The speed of the snake in the x direction
#   vy - The speed of the snake in the y direction
# Methods:
#   __init__- The contructor of the class
#   move - How the player-controlled snake moves and how it interacts with food pellets
#   enem_move - How the computer-controlled snake moves and how it interacts with food pellets
#   gameover - What happens when the player causes the game to stop
#   go_down - How the player-controlled snake goes down
#   go_up - How the player-controlled snake goes up
#   go_right - How the player-controlled snake goes right
#   go_left - How the player-controlled snake goes left
#==========================================       
class Snake:
    def __init__(self,x,y,color,canvas):
        self.x = x
        self.y = y
        self.color = color
        self.canvas = canvas
        self.snake = self.canvas.create_rectangle(x,y,x+30,y+30,fill=color)
        self.segments = [self.snake]
        self.vx = 30
        self.vy = 0
    def move(self,fx,fy):
        self.x += self.vx
        self.y += self.vy
        if self.x == fx and self.y == fy:
            self.segments.insert(0,self.canvas.create_rectangle(self.x,self.y,self.x+30,self.y+30,fill=self.color))
            return True
        self.segments.insert(0,self.canvas.create_rectangle(self.x,self.y,self.x+30,self.y+30,fill=self.color))
        last_seg = self.segments.pop()
        self.canvas.delete(last_seg)
    def enemy_move(self,fx,fy):
        if self.x < fx:
            self.vx = 30
            self.vy = 0
        if self.x > fx:
            self.vx = -30
            self.vy = 0
        if self.y < fy:
            self.vx = 0
            self.vy = 30
        if self.y > fy:
            self.vx = 0
            self.vy = -30
        self.x += self.vx
        self.y += self.vy
        if self.x == fx and self.y == fy:
            self.segments.insert(0,self.canvas.create_rectangle(self.x,self.y,self.x+30,self.y+30,fill=self.color))
            return True
        self.segments.insert(0,self.canvas.create_rectangle(self.x,self.y,self.x+30,self.y+30,fill=self.color))
        last_seg = self.segments.pop()
        self.canvas.delete(last_seg)
    def gameover(self):
        if self.x < 30 or self.x > 600 or self.y < 30 or self.y > 600:
            return True
        if len(self.segments) > 1:
            for i in range(1,len(self.segments)):
                if self.x == self.canvas.coords(self.segments[i])[0] and self.y == self.canvas.coords(self.segments[i])[1]:
                     return True        
    def go_down(self,event):
        self.vx = 0
        self.vy = 30
    def go_up(self,event):
        self.vx = 0
        self.vy = -30
    def go_right(self,event):
        self.vx = 30
        self.vy = 0
    def go_left(self,event):
        self.vx = -30
        self.vy = 0
          
SnakeGUI()
tk.mainloop()
