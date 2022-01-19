// Names: Garrett Abou-Zeid
// x500s: abouz009

import java.util.Random;

public class MyMaze{
    Cell[][] maze;

    public MyMaze(int rows, int cols) {
        maze = new Cell[rows][cols];
        for(int i = 0; i < maze.length; i++) {
            for(int j = 0; j < maze[0].length; j++)
                maze[i][j] = new Cell();
        }
    }

    /* TODO: Create a new maze using the algorithm found in the writeup. */
    public static MyMaze makeMaze(int rows, int cols) {
        MyMaze newMaze = new MyMaze(rows,cols);
        Stack1Gen<int[]> s = new Stack1Gen<>();
        int[] start = new int[2];
        s.push(start);
        newMaze.maze[s.top()[0]][s.top()[1]].setVisited(true);

        while(!s.isEmpty()) {
            int x = s.top()[0];
            int y = s.top()[1];
            int[][] neighbor = new int[4][2];
            int i = 0;  //Keeps track of neighbor index
            if(y-1 >= 0 && !newMaze.maze[x][y-1].getVisited()) {      //Checks if left neighbor is a valid location
                neighbor[i][0] = x;
                neighbor[i][1] = y-1;
                i++;
            }
            if(y+1 < cols && !newMaze.maze[x][y+1].getVisited()) {      //Checks if right neighbor is a valid location
                neighbor[i][0] = x;
                neighbor[i][1] = y+1;
                i++;
            }
            if(x-1 >= 0 && !newMaze.maze[x-1][y].getVisited()) {      //Checks if top neighbor is a valid location
                neighbor[i][0] = x-1;
                neighbor[i][1] = y;
                i++;
            }
            if(x+1 < rows && !newMaze.maze[x+1][y].getVisited()) {      //Checks if bottom neighbor is a valid location
                neighbor[i][0] = x+1;
                neighbor[i][1] = y;
                i++;
            }
            if(i == 0) {    //If all neighbors have been visited
                s.pop();
            } else {
                Random rand = new Random();
                int num = rand.nextInt(i);
                s.push(neighbor[num]);
                newMaze.maze[s.top()[0]][s.top()[1]].setVisited(true);
                if(x < s.top()[0]) {          //if current cell is on top of the neighbor cell
                    newMaze.maze[x][y].setBottom(false);
                } else if(x > s.top()[0]) {   //if the current cell is below the neighbor cell
                    newMaze.maze[s.top()[0]][s.top()[1]].setBottom(false);
                } else if(y < s.top()[1]) {   //if the current cell is to the left of the neighbor cell
                    newMaze.maze[x][y].setRight(false);
                } else if(y > s.top()[1]) {   //if the current cell is to the right the neighbor cell
                    newMaze.maze[s.top()[0]][s.top()[1]].setRight(false);
                }
            }
        }//while
        for(int i = 0; i < newMaze.maze.length; i++) {  //Sets all cells to not visited
            for(int j = 0; j < newMaze.maze[0].length; j++) {
                newMaze.maze[i][j].setVisited(false);
            }
        }
        return newMaze;
    }//makeMaze()

    /* TODO: Print a representation of the maze to the terminal */
    public void printMaze() {
        for(int i = 0; i < maze[0].length; i++)   // Draws top border
             System.out.print("|---");            //
        System.out.println("|");                  //

        for(int i = 0; i < maze.length; i++) {                                  //Draws the Vertical borders
            if(i != 0)                                                          //Creates Entrance
                System.out.print("|");                                          //
            else                                                                //
                System.out.print(" ");                                          //
            for(int j = 0; j < maze[0].length; j++) {                           //
                if(!maze[i][j].getRight() && maze[i][j].getVisited()) {         //Case where there is no boundary and visited
                    System.out.print(" *  ");                                   //
                } else if(maze[i][j].getRight() && maze[i][j].getVisited()) {   //Case where there is boundary and visited
                    System.out.print(" * |");                                   //
                } else if(!maze[i][j].getRight()) {                             //Case where there is no boundary and not visited
                    System.out.print("    ");                                   //
                } else{                                                         //Creates Exit
                    if(i == maze.length-1 && j == maze[0].length-1)             //
                        System.out.print(" *");                                 //
                    else                                                        //
                        System.out.print("   |");                               //Draws boundary if getRight() is true and getVisited() is false
                }                                                               //
            }                                                                   //
            System.out.print("\n");                                             //

            System.out.print("|");
            for(int j = 0; j < maze[0].length; j++) {       //Draws the Horizontal borders
                if(!maze[i][j].getBottom()) {               //Doesn't draw boundary if !getBottom()
                    System.out.print("   |");               //
                } else {                                    //Draws boundary if getBottom()
                    System.out.print("---|");               //
                }                                           //
            }//for                                          //
            System.out.print("\n");                         //
        }//for
    }//printMaze()

    /* TODO: Solve the maze using the algorithm found in the writeup. */
    public void solveMaze() {
        Q1Gen<int[]> q = new Q1Gen<>();
        int[] start = new int[2];
        q.add(start);
        while(!q.isEmpty()) {
            int[] front = q.remove();
            int x = front[0];
            int y = front[1];
            if(x == maze.length-1 && y == maze[0].length-1) {   //If reached end of the maze
                break;
            } else {
                maze[x][y].setVisited(true);
                if(y-1 >= 0 && !maze[x][y-1].getRight() && !maze[x][y-1].getVisited()) {//Checks if left neighbor is a valid location to enqueue
                    int[] neighbor = new int[]{x,y-1};
                    q.add(neighbor);
                }
                if(y+1 < maze[0].length && !maze[x][y].getRight() && !maze[x][y+1].getVisited()) {      //Checks if right neighbor is a valid location enqueue
                    int[] neighbor = new int[]{x,y+1};
                    q.add(neighbor);
                }
                if(x-1 >= 0 && !maze[x-1][y].getBottom() && !maze[x-1][y].getVisited()) {      //Checks if top neighbor is a valid location to enqueue
                    int[] neighbor = new int[]{x-1,y};
                    q.add(neighbor);
                }
                if(x+1 < maze.length && !maze[x][y].getBottom() && !maze[x+1][y].getVisited()) {      //Checks if bottom neighbor is a valid location to enqueue
                    int[] neighbor = new int[]{x+1,y};
                    q.add(neighbor);
                }
            }//else
        }//while
    }//solveMaze()

    public static void main(String[] args){
        MyMaze maze = makeMaze(5,20);
        maze.solveMaze();
        maze.printMaze();
    }
}
