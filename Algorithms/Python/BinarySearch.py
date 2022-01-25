#Search algorithm

#Works as follows:
    #Finds the middle index of the array. If target element is lower than the middle element,
    #search the lower half of the array. Eliminating the upper half of the array.
    #If the target element is higher than the middle element, seach the upper half of the array.
    #Eliminating the lower half of the array.
    #It then finds the middle element of the next interval and follows the same routine until the element is found.

#Parameters:
    # arr : Array that is going to be searched.
    # left : Left furthest index of the interval.
    # right : Right furthest index of the interval.
    # target : Element that is being searched for.

#Return Value:
    #The index where the target is found at.
    #Returns -1 if not found.

#Worst-Case Performance = O(logn)
#Average-Case Performance = O(logn)
#Best-Case Performance = O(1)
    
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

print("Unsorted Array:", arr)
insertionSort(arr)
print("Sorted Array:", arr)

while True:
    try:
        target = int(input("Enter a number search for: "))
        break
    except ValueError:
        print("Only enter a number: ")
        continue

print("Target =",target)

result = binarySearch(arr, 0, len(arr)-1, target)

if result == -1:
    print("Target not present in array")
else:
    print("Target found at index:", result)
    
