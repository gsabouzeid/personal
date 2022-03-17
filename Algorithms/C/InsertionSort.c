#include <stdio.h>

void insertionSort(int *arr, int length) {
    for (int i = 1; i < length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && key <= arr[j]) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}

int main(int argc, char const *argv[]) {
    int arr[] = {61,32,87,45,12,7,4,89,65};
    int length = sizeof(arr) / sizeof(arr[0]);

    printf("Unsorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    insertionSort(arr, length);

    printf("\nSorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
