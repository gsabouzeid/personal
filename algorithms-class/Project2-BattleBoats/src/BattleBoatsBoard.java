//Wriiten by: abouz009
public class BattleBoatsBoard {

    private Cell[][] cells;
    private BattleBoat[] boat;
    private int totalShots;
    private int turns;
    private int shipsRemain;
    private int size;         //Size of the Board

    public BattleBoatsBoard(int boardSize) {            //Constructor
        size = boardSize;
        cells = new Cell[boardSize][boardSize];
        for(int i = 0; i < cells.length; i++) {
            for(int j = 0; j < cells[0].length; j++) {
                cells[i][j] = new Cell(i,j,'-');
            }
        }

        if(boardSize == 8) {                   //Declaring and initializing ships (Standard)
            shipsRemain = 5;
            boat = new BattleBoat[5];
            boat[0] = new BattleBoat(5);
            boat[1] = new BattleBoat(4);
            boat[2] = new BattleBoat(3);
            boat[3] = new BattleBoat(3);
            boat[4] = new BattleBoat(2);
        }

        if(boardSize == 12) {                  //Declaring and initializing boats (Expert)
            shipsRemain = 10;
            boat = new BattleBoat[10];
            boat[0] = new BattleBoat(5);
            boat[1] = new BattleBoat(5);
            boat[2] = new BattleBoat(4);
            boat[3] = new BattleBoat(4);
            boat[4] = new BattleBoat(3);
            boat[5] = new BattleBoat(3);
            boat[6] = new BattleBoat(3);
            boat[7] = new BattleBoat(3);
            boat[8] = new BattleBoat(2);
            boat[9] = new BattleBoat(2);
        }


        for(int i = 0; i < boat.length; i++) {   //Randomizing orientation of boats
            int num = (int)(Math.random() * 2);
            if(num == 0) {
                boat[i].setHorizontal(true);
            } else if(num == 1) {
                boat[i].setHorizontal(false);
            }

            Cell[] boatLoc = new Cell[boat[i].getSize()];          //Randomizing Location of boats
            int x = (int)(Math.random() * boardSize);              //With potential intersections
            int y = (int)(Math.random() * boardSize);

            for(int j = 0; j < boatLoc.length; j++) {
                if(boat[i].getHorizontal()) {
                    while(x + boat[i].getSize() >= boardSize)
                        x = (int)(Math.random() * boardSize);
                    boatLoc[j] = new Cell(x+j,y,'B');
                } else {
                    while(y + boat[i].getSize() >= boardSize)
                        y = (int)(Math.random() * boardSize);
                    boatLoc[j] = new Cell(x,y+j,'B');
                }
            }
            boat[i].setBoatLoc(boatLoc);
        }

        for(int i = 0; i < boat.length; i++) {                              //Creates a new set of Cell[] for a boat if
            for(int j = 0; j < boat.length; j++) {                          //a boat intersects with another boat
                while(boat[i].intersect(boat[j]) && i != j) {
                    Cell[] boatLoc = new Cell[boat[i].getSize()];
                    int x = (int)(Math.random() * boardSize);
                    int y = (int)(Math.random() * boardSize);
                    for(int k = 0; k < boat[i].getSize(); k++) {
                        if(boat[i].getHorizontal()) {
                            while(x + boat[i].getSize() >= boardSize)
                                x = (int)(Math.random() * boardSize);
                            boatLoc[k] = new Cell(x+k,y,'B');
                        } else {
                            while(y + boat[i].getSize() >= boardSize)
                                y = (int)(Math.random() * boardSize);
                            boatLoc[k] = new Cell(x,y+k,'B');
                        } //else
                    }//for loop
                    boat[i].setBoatLoc(boatLoc);
                    i = 0;
                    j = 0;
                }//while loop
            } //for(j)
        } //for(i)
    } //constructor

    public int getSize() {
        return size;
    }               //Getter for the size variable

    public int getShipsRemain() {return shipsRemain; }  //Getter for the shipsRemain variable

    public void placeBoats() {                          //Places boats on the board
        for(int i = 0; i < boat.length; i++) {
            Cell[] boatLoc = boat[i].getBoatLoc();
            for(int j = 0; j < boatLoc.length; j++) {
                int row = boatLoc[j].getRow();
                int col = boatLoc[j].getCol();
                cells[row][col].setStatus('B');
                cells[row][col].setShipNum(i);
            } //for(j)
        } //for(i)
    } //placeBoats()

    public void fire(int x, int y) {                            //Fires a cannon at user given coordinate
        if(x < 0 || x >= size || y < 0 || y >= size) {
            System.out.println("penalty");
            turns++;
            totalShots++;
        } else if(cells[x][y].getStatus() == '-') {
            cells[x][y].setStatus('M');
            System.out.println("miss");
            turns++;
            totalShots++;
        } else if(cells[x][y].getStatus() == 'B') {
            cells[x][y].setStatus('H');
            System.out.println("hit");
            for(int i = 0; i < boat.length; i++) {                      //Checks to see if the boat fired at has sunk
                for(int j = 0; j < boat[i].getBoatLoc().length; j++) {
                    if(cells[x][y].getRow() == boat[i].getBoatLoc()[j].getRow() && cells[x][y].getCol() == boat[i].getBoatLoc()[j].getCol()) {
                        boat[i].getBoatLoc()[j].setStatus('H');
                        if(boat[i].isSunk()) {
                            System.out.println("sunk");
                            shipsRemain--;
                            System.out.println("" + shipsRemain + " ships remaining");
                        } //if
                    } //if
                } //for(j)
            } // for(i)
            turns++;
            totalShots++;
        } else if(cells[x][y].getStatus() == 'H' || cells[x][y].getStatus() == 'M') {
            System.out.println("penalty");
            turns++;
            totalShots++;
        }
        if(shipsRemain == 0) {   //Runs if all ships have been destroyed and ends the program
            System.out.println("Game finished in " +turns+ " turns, with a total of " +totalShots+ " shots fired");
        }
    }

    public String display() {                                   //Displays the board after each turn
        String board = "";
        for(int i = 0; i < cells.length; i++) {
            for (int j = 0; j < cells[0].length; j++) {
                cells[i][j].setDisplayStatus('-');
                if(cells[i][j].getStatus() == 'M') {
                    cells[i][j].setDisplayStatus('O');
                } else if(cells[i][j].getStatus() == 'H') {
                    cells[i][j].setDisplayStatus('X');
                }
                board += cells[i][j].getDisplayStatus() + " ";
            }
            board += "\n";
        }
        return board;
    }

    public String print() {                                     //Displays the board with boat locations when called (For debugging purposes)
        String board = "";
        for(int i = 0; i < cells.length; i++) {
            for(int j = 0; j < cells[0].length; j++) {
                if (cells[i][j].getStatus() == 'B') {
                    board += cells[i][j].getShipNum() + " ";
                } else {
                    board += cells[i][j].getDisplayStatus() + " ";
                }
            }
            board += "\n";
        }
        return board;
    }

    public void missile(int x, int y) {         //Fires a missile on the board when called
        int hits = 0;
        int[][] area = new int[9][2];           //Array of ints that determine the 3x3 area that the missile hit
        area[0][0] = x;
        area[0][1] = y;
        area[1][0] = x-1;
        area[1][1] = y-1;
        area[2][0] = x;
        area[2][1] = y-1;
        area[3][0] = x+1;
        area[3][1] = y-1;
        area[4][0] = x+1;
        area[4][1] = y;
        area[5][0] = x+1;
        area[5][1] = y+1;
        area[6][0] = x;
        area[6][1] = y+1;
        area[7][0] = x-1;
        area[7][1] = y+1;
        area[8][0] = x-1;
        area[8][1] = y;

        for(int i = 0; i < area.length; i++) {
            for(int j = 0; j < area[0].length; j+=2) {
                if(area[i][j] >= 0 && area[i][j+1] >= 0 && area[i][j] < size && area[i][j+1] < size) {    //Disregards cells that are out of bounds
                    if(cells[area[i][j]][area[i][j+1]].getStatus() == 'B') {
                        cells[area[i][j]][area[i][j+1]].setStatus('H');
                        missileSink(area[i][j],area[i][j+1]);        //Used to check if a missile has sank a boat
                        hits++;
                    }else if(cells[area[i][j]][area[i][j+1]].getStatus() == '-') {
                        cells[area[i][j]][area[i][j+1]].setStatus('M');
                    }
                }
            }
        }
        System.out.println("" +hits+ " successful hits");               //Prints the number of cells that contain a boat that the missile hit
        turns++;
        if(shipsRemain == 0) {
            System.out.println("Game finished in " +turns+ " turns");
        }
    }

    public void missileSink(int x, int y) {         //Used to check if a boat has sunk using a missile
        for(int i = 0; i < boat.length; i++) {
            for(int j = 0; j < boat[i].getBoatLoc().length; j++) {
                if(cells[x][y].getRow() == boat[i].getBoatLoc()[j].getRow() && cells[x][y].getCol() == boat[i].getBoatLoc()[j].getCol()) {
                    boat[i].getBoatLoc()[j].setStatus('H');
                    if(boat[i].isSunk()) {
                        System.out.println("sunk");
                        shipsRemain--;
                        System.out.println("" + shipsRemain + " ships remaining");
                    } //if
                } //if
            } //for(j)
        } // for(i)
    } //missileSink

    public void drone(int direction, int index) {       //Determines how many cells contain a boat in a specific row or column
        int count = 0;
        if(direction == 0) {
            for(int i = 0; i < cells[index].length; i++) {
                if (!(cells[index][i].getStatus() == '-'))
                    count++;
            }
        } else if(direction == 1) {
            for(int i = 0; i < cells[index].length; i++) {
                if(!(cells[i][index].getStatus() == '-'))
                    count++;
            }
        }
        System.out.println("Drone has scanned " + count + " targets in the specified area");
        turns++;
    }
} //class
