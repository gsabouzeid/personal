#include <stdio.h>

void selectionSort(int *arr, int length) {
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

    printf("Unsorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    selectionSort(arr, length);

    printf("\nSorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
