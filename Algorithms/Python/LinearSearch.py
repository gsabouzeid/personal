#Search algorithm

#Works as follows:
    #Goes through each element of the array one by one and searches for the target element, starting at the first index.

#Parameters:
    # arr : Array that is going to be searched.
    # target : Element that is being searched for.

#Return Value:
    #The index where the target is found at.
    #Returns -1 if not found.

#Worst-Case Performance = O(n)
#Average-Case Performance = O(n)
#Best-Case Performance = O(1)
    
def linearSearch(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

arr = [51,32,87,45,12,7,4,89,65]
target = 4
result = linearSearch(arr,target)

print("Array:", arr)
print("Target =", target)

if result == -1:
    print("Target not present in array")
else:
    print("Target found at index:", result)
