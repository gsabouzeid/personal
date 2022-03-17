public class BubbleSort {
    //Sorting algorithm

    /* Works as follows:
        After each iteration, the larget element bubbles to the top of the array.
        Adjacent elements are compared, if left element is larger than right element
        the two elements switch.
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

    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n-1; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
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
        System.out.print("Unsorted Array: ");
        printArray(arr);
        bubbleSort(arr); 
        System.out.print("Sorted Array: ");
        printArray(arr);
    }
}
