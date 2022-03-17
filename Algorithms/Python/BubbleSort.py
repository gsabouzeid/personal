#Sorting algorithm

#Works as follows:
    #After each iteration, the larget element bubbles to the top of the array.
    #Adjacent elements are compared, if left element is larger than right element
    #the two elements switch.

#Parameters:
    # arr : Array that is going to be sorted.

#Return Value:
    #N/A (Sorts in place)

#Worst-Case Performance = O(n^2)
#Average-Case Performance = O(n^2)
#Best-Case Performance = O(n)

def bubbleSort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp

arr = [51,32,87,45,12,7,4,89,65]
print("Unsorted Array:", arr)
bubbleSort(arr)
print("Sorted Array:", arr)
