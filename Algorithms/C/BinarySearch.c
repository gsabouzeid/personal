#include <stdio.h>

int binarySearch(int *arr, int start, int end, int target) {
    while (start <= end) {
        int mid = (start + end) / 2;
        if(target == arr[mid]) {
            return mid;
        } else if (target < arr[mid]) {
            end = mid - 1;
        } else if (target > arr[mid]) {
            start = mid + 1;
        }
    }
    return -1;
}

void selectionSort(int arr[], int length) {
    for (int i = 0; i < length-1; i++) {
        int min_index = i;
        for (int j = i+1; j < length; j++) {
            if (arr[j] < arr[min_index]) {
                min_index = j;
            }
        }
        int temp = arr[min_index];
        arr[min_index] = arr[i];
        arr[i] = temp;
    }
}

int main(int argc, char const *argv[]) {
    int arr[] = {61,32,87,45,12,7,4,89,65};
    int length = sizeof(arr) / sizeof(arr[0]);
    int start = 0;
    int end = length - 1;

    printf("Unsorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    selectionSort(arr, length);

    printf("\nSorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    int target;
    printf("\nEnter an integer to search for: ");
    if (!scanf("%d", &target)) {
        printf("Invalid Input");
        return 1;
    }

    printf("Target = %d\n", target);

    int result = binarySearch(arr, start, end, target);
    
    if (result == -1) {
        printf("Target not present in array");
    } else {
        printf("Target found at index: %d", result);
    }

    return 0;
}