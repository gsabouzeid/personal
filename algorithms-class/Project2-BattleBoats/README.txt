Project 2
Created by: Garrett Abou-Zeid (abouz009)
Created in: IntelliJ

Additional/Special Features:
-Added "size" integer variable as well as a getter method for it in BattleBoatsBoard.java 
 to access the size of the board within the class.
-Added a missileSink(int x, int y) method in BattleBoatsBoard.java to check if a boat has
 sunk specifically when hit by a missile.
-Added "displayStatus" char variable as well as the getter and setter methods for it in Cell.java
 to hide the ships displaying the game board, as opposed to showing the boat locations when calling
 the print() method.
-Added "shipNum" int variable as well as the getter and setter methods for it in Cell.java to display 
 the boat locations when the print() method is called.
-Added a toString() method in Cell.java to print the cell coordinates for debugging purposes
-Added a isSunk() method in BattleBoat.java to check to see if a boat has sunk when it has been shot
-Added a toString() method in BattleBoat.java to print the coordinates of the boat for debugging 
 purposes
-Added a intersect() method in BattleBoat.java to check if 2 boats are interecting

-Note on how to fire a cannon:
	1.Type in the row number
	2.Press enter
	3.Type in the column number
	4.Press enter 

How to compile and run program:
-Run the main() method in BattleBoatsGame.java to compile and run the program

Known bugs/defects:
N/A
