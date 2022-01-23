#include <stdio.h>

void merge(int *arr, int start, int mid, int end) {
    int s1 = mid - start + 1;
    int s2 = end - mid;

    int L[s1];
    int R[s2];

    for (int i = 0; i < s1; i++) {
        L[i] = arr[start+i];
    }
    for (int i = 0; i < s2; i++) {
        R[i] = arr[mid + 1 + i];
    }

    int ptr1 = 0;
    int ptr2 = 0;

    int mergePtr = start;

    while (ptr1 < s1 && ptr2 < s2) {
        if(L[ptr1] < R[ptr2]) {
            arr[mergePtr] = L[ptr1];
            ptr1++;
        } else {
            arr[mergePtr] = R[ptr2];
            ptr2++;
        }
        mergePtr++;
    }

    while (ptr1 < s1) {
        arr[mergePtr] = L[ptr1];
        ptr1++;
        mergePtr++;
    }

    while (ptr2 < s2) {
        arr[mergePtr] = R[ptr2];
        ptr2++;
        mergePtr++;
    }
    
}

void mergeSort(int *arr, int start, int end) {
    if (start < end) {
        int mid = (start + end) / 2;
        mergeSort(arr, start, mid);
        mergeSort(arr, mid+1, end);
        merge(arr, start, mid, end);
    }
}


int main(int argc, char const *argv[]) {
    int arr[] = {61,32,87,45,12,7,4,89,65};
    int length = sizeof(arr) / sizeof(arr[0]);

    printf("Unsorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    mergeSort(arr, 0, length-1);

    printf("\nSorted Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}