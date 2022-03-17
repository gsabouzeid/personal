public class HeapSort extends BuildMaxHeap{
    //Work In Progress
    public static void heapSort(int[] arr) {
        buildMaxHeap(arr);
        for (int i = arr.length-1; i <= 2; i--) {
            int temp = arr[1];
            arr[1] = arr[i];
            arr[i] = temp;
            maxHeapify(arr, 1);
        }
    }

    public static void main(String[] args) {
        int[] arr = new int[] {-1,16,4,10,14,7,9,3,2,8,1};
        heapSort(arr);
        printArray(arr);
    }

}
