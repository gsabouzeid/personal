//Written By: abouz009
import java.util.Scanner;

public class BattleBoatsGame {

    public static void main(String[] args) {     //RUN THIS MAIN METHOD TO RUN THE PROGRAM
        Scanner s = new Scanner(System.in);
        System.out.println("Hello welcome to BattleBoats! Please enter 1 to play in standard mode or 2 to play in expert");
        String output = s.nextLine();
        while(!(output.equals("1") || output.equals("2"))) {
            System.out.println("Invalid input.  Please enter 1 to play in standard mode or 2 to play in expert");
            output = s.nextLine();
        }
        if(output.equals("1")) {    //Standard Difficulty
            System.out.println("There are 5 boats on the board");
            System.out.println("Type 'controls' for the controls");
            BattleBoatsBoard battleBoats = new BattleBoatsBoard(8);
            int powers = 1;
            battleBoats.placeBoats();
            System.out.println(battleBoats.display());
            while(s.hasNext()) {
                output = s.nextLine();
                switch (output) {
                    case "controls":
                        System.out.println("To fire a shot, type in the row you want to fire first, then type the column you want to fire");
                        System.out.println("'print' : Prints out the locations of the boats (debugging purposes only)");
                        System.out.println("'missile' : Launches a missile that will fire in a 3x3 area (Limited uses)");
                        System.out.println("'drone' : Scans  and detects a row or column for boats");
                        break;
                    case "print":                     //If user types "print"
                        System.out.println(battleBoats.print());
                        break;
                    case "missile":            //If user types "missile"
                        if (powers == 0) {
                            System.out.println("Missile has been used the max amount of times");
                        } else {
                            System.out.println("Where would you like to launch your missile?");
                            output = s.nextLine();
                            String output2 = s.nextLine();
                            int x = Integer.parseInt(output);
                            int y = Integer.parseInt(output2);
                            while (x < 0 || x >= battleBoats.getSize() || y < 0 || y >= battleBoats.getSize()) {
                                System.out.println("Invalid Location. Please type in a coordinate that is inside the game boundaries");
                                output = s.nextLine();
                                output2 = s.nextLine();
                                x = Integer.parseInt(output);
                                y = Integer.parseInt(output2);
                            }
                            battleBoats.missile(x, y);
                            System.out.println(battleBoats.display());
                            powers--;
                        }
                        break;
                    case "drone":              //If user types "drone"
                        if (powers == 0) {
                            System.out.println("Drone has been used the max amount of times");
                        } else {
                            System.out.println("Would you like to scan a row or column?  Type in r for row or c for column.");
                            output = s.nextLine();
                            while (!(output.equals("r")) && !(output.equals("c"))) {
                                System.out.println("Invalid input.  Please type in r for row or c for column");
                                output = s.nextLine();
                            }
                            int dir = 2;    //Determines direction of drone
                            if (output.equals("r")) {
                                dir = 0;
                            } else if (output.equals("c")) {
                                dir = 1;
                            }
                            System.out.println("Which row or column would you like to scan?");
                            output = s.nextLine();
                            int line = Integer.parseInt(output);
                            while (line < 0 || line >= battleBoats.getSize()) {
                                System.out.println("Invalid Input.  Please type in a number within the boundaries of the board.");
                                line = s.nextInt();
                            }
                            battleBoats.drone(dir, line);
                            System.out.println(battleBoats.display());
                            powers--;
                        }
                        break;
                    default:
                        try {                                       //Try-Catch statement used to type in a coordinate for the player to shoot
                            int x = Integer.parseInt(output);       //Player fires a cannon by typing in a row number and pressing enter,
                            String output2 = s.nextLine();          //then types a column number and pressing enter. Then will call the fire(x,y) method.
                            int y = Integer.parseInt(output2);
                            battleBoats.fire(x, y);
                            System.out.println(battleBoats.display());
                        } catch (Exception e) {
                            System.out.println("Invalid input");        //Prints when any input is invalid
                        } //catch

                        break;
                }
                if(battleBoats.getShipsRemain() == 0)
                    return;
            } //while
        } else if(output.equals("2")) {     //Expert Difficulty
            System.out.println("There are 10 boats on the board");
            System.out.println("Type 'controls' for the controls");
            BattleBoatsBoard battleBoats = new BattleBoatsBoard(12);
            int powers = 2;
            battleBoats.placeBoats();
            System.out.println(battleBoats.display());
            while(s.hasNext()) {
                output = s.nextLine();
                switch (output) {
                    case "controls":
                        System.out.println("To fire a shot, type in the row you want to fire first, then type the column you want to fire");
                        System.out.println("'print' : Prints out the locations of the boats (debugging purposes only)");
                        System.out.println("'missile' : Launches a missile that will fire in a 3x3 area (Limited uses)");
                        System.out.println("'drone' : Scans  and detects a row or column for boats");
                        break;
                    case "print":
                        System.out.println(battleBoats.print());
                        break;
                    case "missile":
                        if (powers == 0) {
                            System.out.println("Missile has been used the max amount of times");
                        } else {
                            System.out.println("Where would you like to launch your missile?");
                            output = s.nextLine();
                            String output2 = s.nextLine();
                            int x = Integer.parseInt(output);
                            int y = Integer.parseInt(output2);
                            while (x < 0 || x >= battleBoats.getSize() || y < 0 || y >= battleBoats.getSize()) {
                                System.out.println("Invalid Location. Please type in a coordinate that is inside the game boundaries");
                                output = s.nextLine();
                                output2 = s.nextLine();
                                x = Integer.parseInt(output);
                                y = Integer.parseInt(output2);
                            }
                            battleBoats.missile(x, y);
                            System.out.println(battleBoats.display());
                            powers--;
                        }
                        break;
                    case "drone":
                        if (powers == 0) {
                            System.out.println("Drone has been used the max amount of times");
                        } else {
                            System.out.println("Would you like to scan a row or column?  Type in r for row or c for column.");
                            output = s.nextLine();
                            while (!(output.equals("r")) && !(output.equals("c"))) {
                                System.out.println("Invalid input.  Please type in r for row or c for column");
                                output = s.nextLine();
                            }
                            int dir = 2;    //Determines direction of drone
                            if (output.equals("r")) {
                                dir = 0;
                            } else if (output.equals("c")) {
                                dir = 1;
                            }
                            System.out.println("Which row or column would you like to scan?");
                            output = s.nextLine();
                            int line = Integer.parseInt(output);
                            while (line < 0 || line >= battleBoats.getSize()) {
                                System.out.println("Invalid Input.  Please type in a number within the boundaries of the board.");
                                line = s.nextInt();
                            }
                            battleBoats.drone(dir, line);
                            System.out.println(battleBoats.display());
                            powers--;
                        }
                        break;
                    default:
                        try {
                            int x = Integer.parseInt(output);
                            String output2 = s.nextLine();
                            int y = Integer.parseInt(output2);
                            battleBoats.fire(x, y);
                            System.out.println(battleBoats.display());
                        } catch (Exception e) {
                            System.out.println("Invalid input");
                        } //catch

                        break;
                }
                if(battleBoats.getShipsRemain() == 0)
                    return;
            } //while
        } //else-if
    } //main
} //class
