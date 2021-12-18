public class QuickSort {
    //Divide-and-Conquer
    //
    //Worst-Case Complexity = n^2
    //
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
        printArray(arr);
        quickSort(arr, 0, arr.length-1); 
        printArray(arr);
    }
    
}
