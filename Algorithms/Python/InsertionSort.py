#Sorting algorithm

#Works as follows:
    #Starts at arr[1]. Compares itself to elements at lower indexes.
    #if element is smaller, it will swap positions and will keep swapping
    #until the element is greater than the element at the next index.

#Parameters:
    # arr : Array that is going to be sorted.

#Return Value:
    #N/A (Sorts in place)

#Worst-Case Performance = O(n^2)
#Average-Case Performance = O(n^2)
#Best-Case Performance = O(n)

def insertionSort(arr):
    for i in range(len(arr)):
        key = arr[i]
        j = i-1
        while j >=0 and key < arr[j]:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key

arr = [51,32,87,45,12,7,4,89,65]
print("Unsorted Array:", arr)
insertionSort(arr)
print("Sorted Array:", arr)
