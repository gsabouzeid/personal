public class InsertionSort {
    //Sorting algorithm

    /* Works as follows:
        Starts at arr[1]. Compares itself to elements at lower indexes.
        if element is smaller, it will swap positions and will keep swapping
        until the element is greater than the element at the next index.
    */

    /* Parameters:
        arr : Array that is going to be sorted.
    */

    /* Return Value:
        The sorted array.
    */

    /*
        Worst-Case Performance = O(n^2)
        Average-Case Performance = O(n^2)
        Best-Case Performance = O(n)
    */
    public static int[] insertionSort(int[] arr) {
        int len = arr.length;
        for (int i = 1; i < len; i++) {
            int key = arr[i];
            int j = i-1;
            while(j >= 0 && key < arr[j]) {
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = key;
        }
        return arr;
    }

    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = new int[] {61,32,87,45,12,7,4,89,65};
        System.out.println("Unsorted Array:");
        printArray(arr);
        insertionSort(arr);
        System.out.println("Sorted Array:"); 
        printArray(arr);
    }
}