def binarySearch(arr, left, right, target):
    if left > right:
        return -1
    mid = (left+right) // 2
    if arr[mid] < target:
        return binarySearch(arr, mid+1, right, target)
    elif arr[mid] > target:
        return binarySearch(arr, left, mid-1, target)
    else:
        return mid

def insertionSort(arr):
    for i in range(len(arr)):
        key = arr[i]
        j = i-1
        while j >=0 and key < arr[j]:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key

arr = [51,32,87,45,12,7,4,89,65]
target = 89
insertionSort(arr)
print(binarySearch(arr, 0, len(arr)-1, target))