#==========================================
# Purpose: Steps each note a certain number steps along the musical scale
# Input Parameter(s):
#   notes - The list of notes inputed by the user.
#   up - The number of steps the scale will be shifted
# Return Value(s):
#   new_notes - New list of notes after they have been shifted
#==========================================
def convert(notes, up):
    scale = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    new_notes = []
    for i in range(0,len(scale)):
        for j in range(0,len(notes)):
            if notes[j] == scale[i]:
                notes[j] = scale.index(scale[i])
                notes[j] = (notes[j] + up) % 12
    for k in range(0,len(notes)):
        new_notes.append(scale[notes[k]])
    return new_notes

#==========================================
# Purpose: Determines the number of times that three integers add up to the target number
# Input Parameter(s):
#   num_lst - List of integers
#   target - An integer that three integers within num_lst have to add up to
# Return Value(s):
#   num_triples - The number of triples within the number list
#==========================================
def triple_sum(num_lst, target):
    num_triples = 0
    used_numbers = []
    for i in range(0,len(num_lst)-2):               
        for j in range(i+1,len(num_lst)-1):     
            for k in range(len(num_lst)-1,j,-1):    
                if num_lst[i] + num_lst[j] + num_lst[k] == target:                 
                    if [num_lst[i],num_lst[j],num_lst[k]] not in used_numbers and [num_lst[j],num_lst[i],num_lst[k]] not in used_numbers and [num_lst[j],num_lst[k],num_lst[i]] not in used_numbers and [num_lst[k],num_lst[j],num_lst[i]] not in used_numbers and [num_lst[k],num_lst[i],num_lst[j]] not in used_numbers and [num_lst[i],num_lst[k],num_lst[j]] not in used_numbers:
                        print(num_lst[i], "+", num_lst[j], "+", num_lst[k], "=", target)
                        used_numbers.append([num_lst[i],num_lst[j],num_lst[k]])        
                        num_triples += 1                       
    return num_triples
               
#==========================================
# Purpose: Puts all strings with S,s,Z, and z in the even positions
# Input Parameter(s):
#   names_list - List of names of students
# Return Value(s):
#   new_list - List of names that have S,s,Z, and z in even positions of the list
#==========================================
def no_front_teeth(names_list):
    no_sz_list = []
    sz_list = []
    new_list = []
    for i in range(0,len(names_list)):
        if "S" in names_list[i] or "s" in names_list[i] or "Z" in names_list[i] or "z" in names_list[i]:
            sz_list.append(names_list[i])
        else:
            no_sz_list.append(names_list[i])
    if len(sz_list) <= len(no_sz_list):
        for j in range(0,len(names_list)):
            if j % 2 == 0:
                if no_sz_list == []:
                    for remain_sz in range(len(sz_list)):
                        new_list.append(sz_list[remain_list])
                    return new_list
                else:
                    new_list.append(no_sz_list[0])
                    no_sz_list.remove(no_sz_list[0])
            else:
                if sz_list == []:
                    for remain_no_sz in range(len(no_sz_list)):
                        new_list.append(no_sz_list[remain_no_sz])
                    return new_list
                else:
                    new_list.append(sz_list[0])
                    sz_list.remove(sz_list[0])
        return new_list
    else:
        print("Mission impossible: too many unpronounceable names")
        return new_list
