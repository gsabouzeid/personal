//Written by: abouz009
public class LinkedList<T extends Comparable<T>> implements List<T> {

    private boolean isSorted;
    private Node<T> start;      //Start of the Linked List
    private Node<T> end;        //End of the Linked list

    public LinkedList() {
        isSorted = true;
    }

    public boolean add(T element) {
        Node<T> node = new Node<>(element);
        if(element == null) {
            return false;
        } else {
            if(start == null) {     //Special case when the Linked List is empty
                start = node;
                end = start;
            } else {                //The end node points to the new node and sets the new node to the end
                end.setNext(node);
                end = node;
            }
        }
        isSorted = false;
        return true;
    }

    public boolean add(int index, T element) {
        Node<T> node = new Node<>(element);
        if(element == null || index < 0 || index >= size()) {
            return false;
        } else if(index == 0){      //Special case when adding to the start of linked list
            node.setNext(start);
            start = node;
        } else {
            Node<T> ptr = start;
            int nodeIndex = 0;
            while(nodeIndex != index-1) {       //index increments as the ptr moves up
                ptr = ptr.getNext();
                nodeIndex++;
            }
            node.setNext(ptr.getNext());
            ptr.setNext(node);
        }
        isSorted = false;
        return true;
    }

    public void clear() { start = null; }

    public T get(int index) {
        if(index < 0 || index >= size())
            return null;
        int currIndex = 0;
        Node<T> ptr = start;
        while(currIndex != index) {         //index increments as the ptr moves up
            ptr = ptr.getNext();
            currIndex++;
        }
        return ptr.getData();
    }

    public int indexOf(T element) {
        int i = 0;
        if (element == null)
            return -1;
        Node<T> ptr = start;
        while (!(element.equals(ptr.getData()))) {
            if (ptr.getNext() == null) {         //Executes when element is not found in the linked list
                return -1;
            }
            ptr = ptr.getNext();
            i++;
        }
        return i;
    }

    public boolean isEmpty() { return start == null; }

    public int size() {
        int count = 0;
        for(Node<T> n = start; n != null; n = n.getNext())
            count++;
        return count;
    }

    public Node<T> getNode(int index) {         //Same as T get(int index), but it returns the node instead
        if(index < 0 || index >= size())        //Helper Method
            return null;
        int currIndex = 0;
        Node<T> ptr = start;
        while(currIndex != index) {
            ptr = ptr.getNext();
            currIndex++;
        }
        return ptr;
    }

    public void sort() {    //Insertion sort
        Node<T> node1, node2;    //node1 is the node being shifted, node2 changes as long as it's less than node1
        int i1 = 1;
        int i2;
        T data;

        for (node1 = getNode(i1); node1 != null; node1 = getNode(i1++ + 1)) {
            i2 = i1 - 1;    //sets i2 to the index before i1
            data = node1.getData();     //stores the shifting node to a variable
            for (node2 = getNode(i2); getNode(i2) != null && data.compareTo(node2.getData()) < 0; node2 = getNode(i2-- - 1))
                node2.getNext().setData(node2.getData());
            getNode(i2 + 1).setData(data);
        }
        isSorted = true;
    }

    public T remove(int index) {
        T removedElement;
        Node<T> ptr = start;
        if(index < 0 || index >= size())
            return null;
        else {
            if(index == 0) {                //Special case when removing the first element in the linked list
                start = start.getNext();
                removedElement = ptr.getData();
            } else {
                int i = 0;
                while (i != index-1) {
                    ptr = ptr.getNext();
                    i++;
                }
                removedElement = ptr.getNext().getData();
                ptr.setNext(ptr.getNext().getNext());       //Links the 2 nodes between the removed node together
            }
        }
        return removedElement;
    }

    public void greaterThan(T element) {
        if(isSorted) {
            Node<T> ptr = start;
            while(ptr.getData().compareTo(element) <= 0) {              //Keeps shifting start until it reaches a node that is greater than element
                start = start.getNext();
                ptr = ptr.getNext();
            }
        } else {
            for (int i = 0; i < size(); i++) {
                if (get(i).compareTo(element) <= 0) {
                    remove(i);
                    i--;        //Decrement the index to avoid skipping nodes
                }
            }
        }
    }

    public void lessThan(T element) {
        int i;
        if(isSorted) {
            if(start.getData().compareTo(element) >= 0) {       //Special case when all elements in list are greater than element
                start = null;
            } else {
                Node<T> ptr = start;
                while (ptr.getNext().getData().compareTo(element) < 0) {            //Starts at the front of the list and iterates until is finds the node that is greater than
                    ptr = ptr.getNext();                                            //or equal to element and sets that node to null
                }
                ptr.setNext(null);
            }
        } else{
            for (i = 0; i < size(); i++) {
                if (get(i).compareTo(element) >= 0) {
                    remove(i);
                    i--;        //Decrement the index to avoid skipping nodes
                }
            }
        }
    }

    public void equalTo(T element) {
        int i = 0;
        if(isSorted) {
            while(size() > 0 && get(i).compareTo(element) != 0)                 //Removes nodes before the nodes that equal element
                remove(i);
            while(size() > 0 && get(size()-1).compareTo(element) != 0)          //Removes nodes after the nodes that equal element
                remove(size()-1);
        } else {
            for(i = 0; i < size(); i++) {
                if(get(i).compareTo(element) != 0) {
                    remove(i);
                    i--;        //Decrement the index to avoid skipping nodes
                }
            }
        }
    }

    public String toString() {
        String result = "";
        Node<T> ptr = start;

        while (ptr != null) {
            result += ptr.getData() + "\n";
            ptr = ptr.getNext();
        }
        return result;
    }

    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();

        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        list.add(6);
        list.add(7);
        list.add(8);
        list.add(9);
        list.add(10);

        System.out.println(list);

    }
}