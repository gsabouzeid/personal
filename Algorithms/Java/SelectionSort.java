public class SelectionSort {
    //After each iteration, it will find the index with the smallest element and
    //place it at the beginning. Algorithm maintains two subarrays (Sorted and unsorted).
    //
    //Worst-Case Complexity = n^2
    //
    public static int[] selectionSort(int[] arr) {
        int len = arr.length;
        for (int i = 0; i < len-1; i++) {
            int min_index = i;
            for (int j = i+1; j < len; j++) {
                if(arr[j] < arr[min_index]) {
                    min_index = j;
                }
            }
            int temp = arr[i];
            arr[i] = arr[min_index];
            arr[min_index] = temp;
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
        int[] arr = new int[] {51,32,87,45,12,7,4,89,65};
        printArray(arr);
        selectionSort(arr); 
        printArray(arr);
    }
}