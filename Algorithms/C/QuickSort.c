#include <stdio.h>

void swap(int *arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

int partition(int *arr, int start, int end) {
    int pivot = arr[end];

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

void quickSort(int *arr, int start, int end) {
    if (start < end) {
        int mid = partition(arr, start, end);
        quickSort(arr, start, mid-1);
        quickSort(arr, mid+1, end);
    }
}

int main(int argc, char const *argv[]) {
    int arr[] = {61,32,87,45,12,7,4,89,65};
    int length = sizeof(arr) / sizeof(arr[0]);

    printf("Unsorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    quickSort(arr, 0, length-1);

    printf("\nSorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}