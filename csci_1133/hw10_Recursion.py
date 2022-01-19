#==========================================
# Purpose: Returns the score of a word.
# Input Parameter(s):
#   word - The word that will be used to calculate the score.
# Return Value(s):
#   Function can return a 0 for an empty string or the total score of the word.
#==========================================
def scrabble_score(word):
    scores = {'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 
'f': 4, 'g': 2, 'h': 4, 'i': 1, 'j': 8, 'k': 5, 'l': 1, 
'm': 3, 'n': 1, 'o': 1, 'p': 3, 'q': 10, 'r': 1, 's': 1, 
't': 1, 'u': 1, 'v': 4, 'w': 4, 'x': 8, 'y': 4, 'z': 10}
    if word == '':
        return 0
    else:
        return scores[word[0]] + scrabble_score(word[1:])
    
#==========================================
# Purpose: Finds out if the greatest common divider between two numbers is 1 or not.
# Input Parameter(s):
#   x - One of the numbers
#   y - One of the numbers
# Return Value(s):
#   True - When the GCD of x and y is 1
#   False - When the GCD of x and y is not 1
#==========================================
def relatively_prime(x,y):
    if gcd(x,x,y) == 1:
        return True
    else:
        return False
    
#==========================================
# Purpose: Finds the greatest common divder between two numbers.
# Input Parameter(s):
#   d - The number dividing the numbers
#   x - One of the numbers being divided
#   y - One of the numbers being divided
# Return Value(s):
#   Returns the greatest common divider between two numbers.
#==========================================
def gcd(d,x,y):
    if x % d == 0 and y % d == 0:
        return d
    else:
        return gcd(d-1,x,y)
    
#==========================================
# Purpose: Returns the filepath for a specific file.
# Input Parameter(s):
#   directory - The directory on the computer where the file is being searched
#   filename - The file that is being searched
# Return Value(s):
#   Returns the file path to the file or False if the file cannot be found in the directory.
#==========================================
def find_filepath(directory,filename):
    if filename not in flatten_list(directory,[]):
        return False
    else:
        for i in range(0,len(directory)):
            if type(directory[i]) == str:
                if directory[i] == filename:
                    return directory[0] + '/' + filename
            if type(directory[i]) == list:
                if filename in str(directory[i]):
                    return directory[0] + '/' + find_filepath(directory[i],filename)
                
#==========================================
# Purpose: Turns a nested list into a normal list.
# Input Parameter(s):
#   directory - The nested list that is going to be flattened
#   flat_list - An empty list that is going to be appended with file names
# Return Value(s):
#   Returns a flatten list of the original nested list 
#==========================================
def flatten_list(directory,flat_list):
    for file in directory:
        if type(file) == list:
            flatten_list(file,flat_list)
        else:
            flat_list.append(file)
    return flat_list
