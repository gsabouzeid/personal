public class MaxHeapify {
    //
    //Worst-Case Complexity = lgn
    //
    public static void maxHeapify(int[] arr, int i) {
        int left = 2*i;
        int right = (2*i)+1;
        int largest = i;
        if (left <= arr.length-1 && arr[left] > arr[i]){
            largest = left;
        }
        if (right <= arr.length-1 && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            maxHeapify(arr, largest);
        }
    }

    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = new int[] {-1,16,4,10,14,7,9,3,2,8,1};
        maxHeapify(arr, 2);
        printArray(arr);
    }
}