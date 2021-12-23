def mergeSort(arr, start, end):
    if(start < end):
        mid = (start+end) // 2
        mergeSort(arr, start, mid)
        mergeSort(arr, mid+1, end)
        merge(arr, start, mid, end)

def merge(arr, start, mid, end):
    s1 = mid - start + 1
    s2 = end - mid

    L = [0] * s1
    R = [0] * s2

    for i in range(0, s1):
        L[i] = arr[start+i]
    for i in range(0, s2):
        R[i] = arr[mid+i+1]

    ptr1 = 0
    ptr2 = 0

    mergePtr = start

    while ptr1 < s1 and ptr2 < s2:
        if L[ptr1] < R[ptr2]:
            arr[mergePtr] = L[ptr1]
            ptr1 += 1
        else:
            arr[mergePtr] = R[ptr2]
            ptr2 += 1
        mergePtr +=1

    while ptr1 < s1:
        arr[mergePtr] = L[ptr1]
        ptr1 += 1
        mergePtr += 1

    while ptr2 < s2:
        arr[mergePtr] = R[ptr2]
        ptr2 += 1
        mergePtr += 1

arr = [3, 30, 31, 14, 15, 16, 4, 2, 2, 3, 4, 5, 6, 4, 3, 2 , -2, -5, 100, 101, 17]
mergeSort(arr, 0, len(arr)-1)
print(arr)