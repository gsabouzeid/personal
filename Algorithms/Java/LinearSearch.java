public class LinearSearch {
    //Search algorithm

    /* Works as follows:
        Goes through each element of the array one by one and searches for the target element, starting at the first index.
    */

    /* Parameters:
        arr: Array that is going to be searched.
        target : Element that is being searched for.
    */

    /* Return Value:
        The index where the target is found at.
        Returns -1 if not found;
    */

    /*
        Worst-Case Performance = O(n)
        Average-Case Performance = O(n)
        Best-Case Performance = O(1)
    */

    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target)
                return i;
        }
        return -1;
    }

    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = new int[] {61,32,87,45,12,7,4,89,65};
        int target = 4;
        int result = linearSearch(arr, target);

        System.out.print("Array: ");
        printArray(arr);
        System.out.println("Target = " + target);

        if (result == -1) {
            System.out.println("Target not present in array");
        } else {
            System.out.println("Target found at index: " + result);
        }
    }

}