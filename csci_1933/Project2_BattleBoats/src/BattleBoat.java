//Written By: abouz009
public class BattleBoat {

    private int size;
    private boolean horizontal;
    private Cell[] boatLoc;

    public BattleBoat(int size) {
        this.size = size;
    }

    public BattleBoat(int size, boolean horizontal, Cell[] boatLoc) {
        this.size = size;
        this.horizontal = horizontal;
        this.boatLoc = boatLoc;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int newSize) {
        size = newSize;
    }

    public boolean getHorizontal() {
        return horizontal;
    }

    public void setHorizontal(boolean newHorizontal) {
        horizontal = newHorizontal;
    }

    public Cell[] getBoatLoc() {
        return boatLoc;
    }

    public void setBoatLoc(Cell[] newBoatLoc) {
        boatLoc = newBoatLoc;
    }

    public boolean isSunk() {                               //Called to check if the boat that has been has sunk
        for(int i = 0; i < boatLoc.length; i++) {
            if(boatLoc[i].getStatus() == 'B') {
                return false;
            }
        }
        return true;
    }

    public String toString() {
        String boatCoordinates = "";
        for(int i = 0; i < boatLoc.length; i++) {
            boatCoordinates += "(" + boatLoc[i].getRow() + "," + boatLoc[i].getCol() + ")";
        }
        return boatCoordinates;
    }

    public boolean intersect(BattleBoat other) {                //Used to check if 2 boats intersect
        Cell[] thisLoc = this.getBoatLoc();
        Cell[] otherLoc = other.getBoatLoc();
        for(int i = 0; i < thisLoc.length; i++) {
            for(int j = 0; j < otherLoc.length; j++) {
                if(thisLoc[i].getRow() == otherLoc[j].getRow() && thisLoc[i].getCol() == otherLoc[j].getCol())
                    return true;
            }
        }
        return false;
    }
}
