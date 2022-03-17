#include <stdio.h>

int linearSearch(int *arr, int length, int target) {
    for (int i = 0; i < length; i++) {
        if(arr[i] == target) {
            return i;
        }
    }
    return -1;
}

int main(int argc, char const *argv[]) {
    int arr[] = {61,32,87,45,12,7,4,89,65};
    int length = sizeof(arr) / sizeof(arr[0]);

    
    printf("Array: ");
    for (int i = 0; i < length; i++) {
        printf("%d ", arr[i]);
    }

    int target;
    printf("\nEnter an integerto search for: ");
    if (!scanf("%d", &target)) {
        printf("Invalid Input");
        return 1;
    }

    printf("Target = %d\n", target);

    int result = linearSearch(arr, length, target);

    if (result == -1) {
        printf("Target not present in array");
    } else {
        printf("Target found at index: %d", result);
    }
    return 0;
}
