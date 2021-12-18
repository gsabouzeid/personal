def selectionSort(arr):
    for i in range(0,len(arr)-1):
        min_index = i
        for j in range(i+1,len(arr)):
            if arr[j] < arr[min_index]:
                min_index = j
        temp = arr[i]
        arr[i] = arr[min_index]
        arr[min_index] = temp

arr = [51,32,87,45,12,7,4,89,65]
selectionSort(arr)
print(arr)