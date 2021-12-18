def linearSearch(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

arr = [51,32,87,45,12,7,4,89,65]
target = 4
print(linearSearch(arr,target))