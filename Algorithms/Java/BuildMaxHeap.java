import java.lang.Math;
    //
    //Worst-Case Complexity = n
    //
public class BuildMaxHeap extends MaxHeapify{
    
    public static void buildMaxHeap(int[] arr) {
        int length = arr.length-1;
        for (int i = (int)(Math.floor(length/2)); i >= 1; i--) {
            maxHeapify(arr, i);
        }
    }

    public static void main(String[] args) {
        int[] arr = new int[] {-1,1,4,2,3,9,7,8,10,14,16};
        buildMaxHeap(arr);
        printArray(arr);
    }

}
