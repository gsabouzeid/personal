//Written by abouz009
import java.util.Scanner;
import java.io.*;

public class HashTable<T> {

    private NGen<T>[] hashTable;

    public HashTable(int length){
        hashTable = new NGen[length];
    }

    public void add(T item) {
        if(hashTable[hash4(item)] == null) {    //When an index is empty
            hashTable[hash4(item)] = new NGen<T>(item, null);
        } else {    //When an index is not empty (collision)
            NGen<T> ptr = hashTable[hash4(item)];
            if(ptr.getData().equals(item))
                return;
            while(ptr.getNext() != null) {
                if(ptr.getData().equals(item))
                    return;
                ptr = ptr.getNext();
            }
            ptr.setNext(new NGen<>(item, null));
        }
    }

    public void display() {
        int longest = 0;    //Represents the longest chain
        int active = 0;     //Represents the total number of non-empty indices
        int unique = 0;     //Represents the total number of unique tokens
        for(int i = 0; i < hashTable.length; i++) {
            System.out.print(i + ": " );
            int index = 0;
            NGen<T> ptr = hashTable[i];
            if(ptr != null)
                active++;
            while(ptr != null) {
                ptr = ptr.getNext();
                index++;
                unique++;
            }
            if(index > longest)
                longest = index;
            System.out.println(index);
        }
        System.out.println("Average Collision Length: " + unique/active);
        System.out.println("Longest Chain: " + longest);
        System.out.println("Total Unique Tokens: " + unique);
    }

    private int hash1(T key) {  //mods the addition of the first and second characters
        if(key.toString().length() == 1)
            return key.toString().charAt(0) % hashTable.length;
        return (key.toString().charAt(0) + key.toString().charAt(1)) % hashTable.length;
    }
    //Statistics:
    //Canterbury.txt --- Hash Length: 60 --- Ave. Collision: 4 --- Longest Chain: 22
    //gettysburg.txt --- Hash Length: 55 --- Ave. Collision: 4 --- Longest Chain: 17
    //keywords.txt --- Hash Length: 26 --- Ave. Collision: 2 --- Longest Chain: 5
    //proverbs.txt --- Hash Length: 70 --- Ave. Collision: 4 --- Longest Chain: 25
    //that_bad.txt --- Hash Length: 150 --- Ave. Collision: 3 --- Longest Chain: 30


    private int hash2(T key) {  //mods the addition of the last two characters
        if(key.toString().length() == 1)
            return key.toString().charAt(0) % hashTable.length;
        return (key.toString().charAt(key.toString().length()-1) + key.toString().charAt(key.toString().length()-2)) % hashTable.length;
    }
    //Statistics:
    //Canterbury.txt --- Hash Length: 100 --- Ave. Collision: 3 --- Longest Chain: 18
    //gettysburg.txt --- Hash Length: 88 --- Ave. Collision: 3 --- Longest Chain: 17
    //keywords.txt --- Hash Length: 35 --- Ave. Collision: 2 --- Longest Chain: 6
    //proverbs.txt --- Hash Length: 80 --- Ave. Collision: 4 --- Longest Chain: 16
    //that_bad.txt --- Hash Length: 80 --- Ave. Collision: 4 --- Longest Chain: 22

    private int hash3(T key) {  //mods the addition of the first and last characters
        if(key.toString().length() == 1)
            return key.toString().charAt(0) % hashTable.length;
        return (key.toString().charAt(0) + key.toString().charAt(key.toString().length()-1)) % hashTable.length;
    }
    //Statistics:
    //Canterbury.txt --- Hash Length: 135 --- Ave. Collision: 2 --- Longest Chain: 14
    //gettysburg.txt --- Hash Length: 86 --- Ave. Collision: 2 --- Longest Chain: 8
    //keywords.txt --- Hash Length: 40 --- Ave. Collision: 1 --- Longest Chain: 5
    //proverbs.txt --- Hash Length: 90 --- Ave. Collision: 3 --- Longest Chain: 12
    //that_bad.txt --- Hash Length: 100 --- Ave. Collision: 3 --- Longest Chain: 9

    private int hash4(T key) { //mods of the addition of all the of characters (best function)
        int total = 0;
        for(int i = 0; i < key.toString().length(); i++)
            total += key.toString().charAt(i);
        return total % hashTable.length;
    }
    //Statistics:
    //Canterbury.txt --- Hash Length: 142 --- Ave. Collision: 1 --- Longest Chain: 5
    //gettysburg.txt --- Hash Length: 125 --- Ave. Collision: 1 --- Longest Chain: 5
    //keywords.txt --- Hash Length: 36 --- Ave. Collision: 1 --- Longest Chain: 3
    //proverbs.txt --- Hash Length: 150 --- Ave. Collision: 2 --- Longest Chain: 6
    //that_bad.txt --- Hash Length: 146 --- Ave. Collision: 2 --- Longest Chain: 6

    private int hash5(T key) { //mods the addition of every other character
        int total = 0;
        for(int i = 0; i < key.toString().length(); i += 2)
            total += key.toString().charAt(i);
        return total % hashTable.length;
    }
    //Statistics:
    //Canterbury.txt --- Hash Length: 90 --- Ave. Collision: 2 --- Longest Chain: 8
    //gettysburg.txt --- Hash Length: 130 --- Ave. Collision: 2 --- Longest Chain: 8
    //keywords.txt --- Hash Length: 40 --- Ave. Collision: 1 --- Longest Chain: 3
    //proverbs.txt --- Hash Length: 110 --- Ave. Collision: 3 --- Longest Chain: 11
    //that_bad.txt --- Hash Length: 100 --- Ave. Collision: 3 --- Longest Chain: 9


    public static void main(String[] args) { //Algorithm taken and modified from TextScan.java
        HashTable<String> hash = new HashTable<>(125);  //General Case (gettysburg.txt)
        HashTable<String> hash1 = new HashTable<>(136);  //Specific Case (keywords.txt)

        Scanner readFile = null;
        String s;
        int count = 0;

        System.out.println();
        System.out.println("Attempting to read from file: " + "gettysburg.txt");
        try {
            readFile = new Scanner(new File("gettysburg.txt"));
        }
        catch (FileNotFoundException e) {
            System.out.println("File: " + "gettysburg.txt" + " not found");
            System.exit(1);
        }

        System.out.println("Connection to file: " + "gettysburg.txt" + " successful");
        System.out.println();
        while (readFile.hasNext()) {
            s = readFile.next();
            count++;
            hash.add(s);
        }

        hash.display();
        System.out.println("Total tokens: " + count);


        readFile = null;
        count = 0;

        System.out.println();
        System.out.println("Attempting to read from file: " + "keywords.txt");
        try {
            readFile = new Scanner(new File("keywords.txt"));
        }
        catch (FileNotFoundException e) {
            System.out.println("File: " + "keywords.txt" + " not found");
            System.exit(1);
        }

        System.out.println("Connection to file: " + "keywords.txt" + " successful");
        System.out.println();
        while (readFile.hasNext()) {
            s = readFile.next();
            count++;
            hash1.add(s);
        }

        hash1.display();
        System.out.println("Total tokens: " + count);
    }
}