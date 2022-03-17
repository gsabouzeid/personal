//Written by: abouz009
public class ArrayList<T extends Comparable<T>> implements List<T> {

    private boolean isSorted;
    private T[] a;

    public ArrayList() {
        isSorted = true;
        a = (T[]) new Comparable[2];
    }

    public boolean add(T element) {
        if(element == null) {
            return false;
        } else {
            a[size()] = element;         //Adds element at the end of the list
            if(size() == a.length) {     //Increases the size of the array if the array is full
                a = grow(a);
            }
        }
        isSorted = false;
        return true;
    }

    public boolean add(int index, T element) {
        if(element == null || index < 0 || index >= size()) {
            return false;
        } else if(size() < a.length){
            T temp = a[index];                          //Sets original index that is being replaced by element to a temporary variable
            a[index] = element;                         //Sets the desired index to the desired element variable
            int size = size() + 1;                      //Set size() to a variable due to size() changing after each iteration in for-loop
            for(int i = index+1; i < size; i++) {       //Shifts all indexes after the desired index up one
                T temp2 = a[i];
                a[i] = temp;
                temp = temp2;
            }
        }
        if(size() == a.length) {                        //Increases size of array if array is full
            a = grow(a);
        }
        isSorted = false;
        return true;
    }

    public void clear() {
        a = (T[]) new Comparable[2];
    }

    public T get(int index) {
        if(index < 0 || index >= a.length)
            return null;
        return a[index];
    }

    public int indexOf(T element) {
        if(element == null) {
            return -1;
        } else {
            for(int i = 0; i < size(); i++) {
                if (a[i].equals(element))
                    return i;                       //returns first instance of the element
            }
        }
        return -1;
    }

    public boolean isEmpty() {
        return a[0] == null;                        //returns true if the first element is empty
    }

    public int size() {
        int size = 0;
        for(int i = 0; i < a.length; i++) {
            if(a[i] != null)
                size++;                             //size only increments if it doesn't equal null
        }
        return size;
    }

    public void sort() {    //Insertion Sort
        int i, j;
        T n;
        for(i = 1; i < size(); i++) {
            n = a[i];
            for(j = i-1; j >= 0 && n.compareTo(a[j]) < 0; j--)
                a[j+1] = a[j];
            a[j+1] = n;
        }
        isSorted = true;
    }

    public T remove(int index) {
        if(index < 0 || index > size()) {
            return null;
        } else {
            T removed = a[index];
            int i;
            for (i = index + 1; i < size(); i++) {      //Shifts all of the indexes after the removed index down 1 index
                a[i-1] = a[i];
            }
            a[i-1] = null;
            return removed;
        }
    }

    public void greaterThan(T element) {
        if(isSorted) {
            while(a[0].compareTo(element) <= 0)     //Stops when the first index becomes a value greater than element
                remove(0);
        } else {
            for (int i = 0; i < size(); i++) {
                if (a[i].compareTo(element) <= 0) {
                    remove(i);
                    i--;        //Implemented to avoid skipping elements in list
                }
            }
    }
    }

    public void lessThan(T element) {
        if(isSorted) {
            while(a[size()-1].compareTo(element) >= 0)      //Stops when the last index becomes a value less than element
                remove(size()-1);
        } else {
            for (int i = 0; i < size(); i++) {
                if (a[i].compareTo(element) >= 0) {
                    remove(i);
                    i--;       //Implemented to avoid skipping elements in list
                }
            }
        }
    }

    public void equalTo(T element) {
        int i = 0;
        if(isSorted) {
            while(a[i].compareTo(element) != 0)             //Removes first element in list until it equals element
                remove(i);
            while(a[size()-1].compareTo(element) != 0)      //Removes the last element in list until it equals element
                remove(size()-1);
        } else {
            for(i = 0; i < size(); i++) {
                if (!(a[i].compareTo(element) == 0)) {
                    remove(i);
                    i--;        //Implemented to avoid skipping elements in list
                }
            }
        }
    }

    public String toString() {
        String result = "";
        for(int i = 0; i < size(); i++) {
            result += a[i] + "\n";
        }
        return result;
    }

    private T[] grow(T[] array) {   //Helper method for when the array is full
        T[] newArray = (T[]) new Comparable[array.length * 2];
        for(int i = 0; i < array.length; i++) {
            newArray[i] = array[i];
        }
        return newArray;
    }
}
