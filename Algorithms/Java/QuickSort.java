public class QuickSort {
    //Sorting algorithm
    
    /* Works as follows:
        It picks an element as pivot and partitions the given array around the picked pivot.
    */

    /* Parameters(quicksort and partition):
        arr : Array that is going to be sorted.
        start : Left furthest index of an array interval.
        end : Right furthest index of an array interval.
    */
    
    /* Return Value:
        The sorted array.
    */

    /*
        Worst-Case Performance = O(n^2)
        Average-Case Performance = O(nlogn)
        Best-Case Performance = O(nlogn)
    */

    public static void quickSort(int[] arr, int start, int end) {
        if (start < end) {
            int mid = partition(arr, start, end);
            quickSort(arr, start, mid-1);
            quickSort(arr, mid+1, end);
        }
        
    }

    public static int partition(int[] arr, int start, int end) {
        //Last element is the pivot
        int pivot = arr[end];

        // Index of smaller element and
        // indicates the right position
        // of pivot found so far
        int i = start - 1;

        for (int j = start; j <= end-1; j++) {
            if(arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i+1, end);
        return i+1;
    }

    public static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
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
        quickSort(arr, 0, arr.length-1);
        System.out.println("Sorted Array:");
        printArray(arr);
    }
    
}
