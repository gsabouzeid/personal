public class MergeSort {
    //Sorting algorithm

    /* Works as follows:
        Array will split until each element in the array is in its own array.
        Then the smaller arrays will merge with the other arrays and will sort as they merge.
    */

    /* Parameters(mergeSort):
        arr : Array that is going to be sorted.
        start : Left furthest index of an array interval.
        end : Right furthest index of an array interval.
    */

    /* Parameters(merge):
        arr : Array that is going to be sorted.
        start : Left furthest index of an array interval.
        mid : Middle index of an array interval.
        end : Right furthest index of an array interval.
    */

    /*
        Worst-Case Performance = O(nlogn)
        Average-Case Performance = O(nlogn)
        Best-Case Performance = O(nlogn)
    */

    public static void mergeSort(int[] arr, int start, int end) {
        if(start < end) {
            int mid = (start + end) / 2;
            mergeSort(arr, start, mid);         //MergeSort left half of array
            mergeSort(arr, mid+1, end);         //MergeSort right half of array
            merge(arr, start, mid, end);        //Merge two arrays
        }
    }

    public static void merge(int[] arr, int start, int mid, int end) {
        int s1 = mid - start + 1;               //Sizes of the 2 subarrays to be merged
        int s2 = end - mid;                     //

        int L[] = new int[s1];                  //Create Temp Arrays
        int R[] = new int[s2];                  //

        for (int i = 0; i < s1; i++)            //Fill temp arrays with data
            L[i] = arr[start+i];                //
        for (int j = 0; j < s2; j++)            //
            R[j] = arr[mid + 1 + j];            //

        int ptr1 = 0, ptr2 = 0;                 //Pointers to keep track of indexes when iterating

        int mergePtr = start;                   //Pointer to keep track of merged array

        while (ptr1 < s1 && ptr2 < s2) {        
            if(L[ptr1] <= R[ptr2]) {            //Executes if Left[ptr1] is <= Right[ptr2]
                arr[mergePtr] = L[ptr1];
                ptr1++;
            } else {                            //Executes if Left[ptr1] is > Right[ptr2]
                arr[mergePtr] = R[ptr2];
                ptr2++;
            }
            mergePtr++;                         //Increase merge posistion tracker
        }

        while(ptr1 < s1) {                      //Add remaining values of Left[]
            arr[mergePtr] = L[ptr1];
            ptr1++;
            mergePtr++;
        }

        while(ptr2 < s2) {                      //Add remaining values of Right[]
            arr[mergePtr] = R[ptr2];
            ptr2++;
            mergePtr++;
        }
    }

    public static void printArr(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = {3, 30, 31, 14, 15, 16, 4, 2, 2, 3, 4, 5, 6, 4, 3, 2 , -2, -5, 100, 101, 17};
        System.out.println("Unsorted Array:");
        printArr(arr);
        mergeSort(arr, 0, arr.length-1);
        System.out.println("Sorted Array:");
        printArr(arr);
    }
}
