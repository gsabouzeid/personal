public class BinarySearch {
    //Search algorithm used to find an element in a sorted array/list.
    //
    //Works as follows:
    //Finds the middle index of the array. If target element is lower than the middle element, search the lower half of the array. Eliminating the upper half of the array.
    //If the target element is higher than the middle element, seach the upper half of the array. Eliminating the lower half of the array.
    //It then finds the middle element of the next interval and follows the same routine until the element is found.

    //Parameters:
        // arr : Array the is going to be searched.
        // left: Left furthest index of the interval.
        // right: Right furthest index of the interval.
        // target: Element that is being searched for.

    //Return Value:
        // The index where the element is found at.
        // If element is not found, returns -1;

    public static int binarySearch(int[] arr, int left, int right, int target) {
        while(left <= right) {
            int mid = (left + right) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if(arr[mid] > target) {
                right = mid - 1;
            } else if(arr[mid] < target) {
                left = mid + 1;
            }
        }
        return -1;
    }

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
        insertionSort(arr);
        System.out.println("Sorted Array:");
        printArray(arr);
        System.out.println("Number found at index:");
        System.out.println(binarySearch(arr, 0, arr.length-1, 89));
    }
}
