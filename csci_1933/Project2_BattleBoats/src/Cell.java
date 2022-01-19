//Written By: abouz009
public class Cell {
    private int row;
    private int col;
    private char status;
    private int shipNum;               //Used in the print() method to show boat locations
    private char displayStatus;        //Used in the display() method to hide boat locations

    public Cell(int row, int col, char status) {
        this.row = row;
        this.col = col;
        this.status = status;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int newRow) {
        row = newRow;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int newCol) {
        col = newCol;
    }

    public char getStatus() {
        return status;
    }

    public void setStatus(char c) {
        status = c;
    }

    public int getShipNum() {
        return shipNum;
    }

    public void setShipNum(int newShipNum) {
        shipNum = newShipNum;
    }

    public char getDisplayStatus() {
        return displayStatus;
    }

    public void setDisplayStatus(char newDisplayStatus) {
        displayStatus = newDisplayStatus;
    }

    public String toString() {
        String cellList = "";
        cellList += "(" + row + "," + col + ")";
        return cellList;
    }
}
