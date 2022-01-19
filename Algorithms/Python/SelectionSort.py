#Search algorithm

#Works as follows:
    #After each iteration, it will find the index with the smallest element and
    #place it at the beginning. Algorithm maintains two subarrays (Sorted and unsorted).

#Parameters:
    # arr : Array that is going to be searched.

#Return Value:
    #N/A (Sorts in place)

#Worst-Case Performance = O(n^2)
#Average-Case Performance = O(n^2)
#Best-Case Performance = O(n^2)

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
print("Unsorted Array:", arr)
selectionSort(arr)
print("Sorted Array:", arr)
