def insertionSort(arr):
    for i in range(len(arr)):
        key = arr[i]
        j = i-1
        while j >=0 and key < arr[j]:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key

arr = [51,32,87,45,12,7,4,89,65]
insertionSort(arr)
print(arr)