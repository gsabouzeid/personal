## Garrett Abou-Zeid
## abouz009
import math

#==========================================
# Purpose: Takes a 3-D object and rotates it 90 degrees
# Input Parameter(s):
#   fname_in - The original 3-D shape
#   fname_out - The rotated shape
# Return Value(s):
#   0 - This means the file(fname_in) was successfully found
#   -1 - This means the file was not found
#==========================================
def rotate_model(fname_in, fname_out):
    try:
        fp = open(fname_in)
        values = ''
        for line in fp:
            if 'v' in line:
                line_list = line.split(' ')
                x_rotated = str(float(line_list[1]) * math.cos(math.pi/2) + float(line_list[2])
            * math.sin(math.pi/2))
                y_rotated = str(float(line_list[2]) * math.cos(math.pi/2) + float(line_list[1])
            * math.sin(math.pi/2))
                line_list[1] = x_rotated
                line_list[2] = y_rotated
                line = ' '.join(line_list)
                values = values + line
            elif 'f' in line:
                values = values + line
        fp.close()
        fp = open(fname_out, 'w')
        fp.write(values)
        fp.close()
        return 0
    except FileNotFoundError:
        return -1  
    
#B. Part 1: get_data_list
#==========================================
# Purpose:
#   Extract the data from a CSV file as a list of rows
# Input Parameter(s):
#   fname is a string representing the name of a file
# Return Value:
#   Returns a list of every line in that file (a list of strings)
#   OR returns -1 if the file does not exist
#==========================================
def get_data_list(fname):    
    try:
        data_list = []
        fp = open(fname)
        for line in fp:
            data_list.append(line)
        fp.close()
        return data_list   
    except FileNotFoundError:
        return -1

#B. Part 2: get_col_index
#==========================================
# Purpose:
#   Determine which column stores a specific value
# Input Parameter(s):
#   row1_str is a string containing the first row of data 
#   (the column titles) in the CSV file
#	col_title is a string containing the column title
# Return Value:
#   Returns the index of the column specified by col_title
#   OR returns -1 if there is no column found
#==========================================
def get_col_index(row1_str, col_title):
    col_names = row1_str.split(',')
    for title in col_names:
        if title == col_title:
            return col_names.index(col_title)
    return -1

#B. Part 3: convert_dkp
#==========================================
# Purpose:
#   Covert the DKP in your row string to the new system
# Input Parameter(s):
#   row_str is a string containing any row of data from the CSV file
#   idx is an index for the column you want to alter
# Return Value:
#   Returns a string identical to row_str, except with the column
#   at the given index changed to the new DKP (as a string)
#==========================================
def convert_dkp(row_str,idx):
    dkp_values = row_str.split(',')
    dkp_values[idx] = str(float(dkp_values[idx]) * 13.7)
    row_str = ','.join(dkp_values)
    return row_str

#B. Part 4: merge_guild
#==========================================
# Purpose:
#   Alters a DKP CSV file to convert DKP after a guild merger
# Input Parameter(s):
#   fname is the file name of the DKP file
# Return Value:
#   Returns False if the file isn't open
#   Returns False if the file doesn't contain 'DKP' and 'Original Guild' columns
#   Otherwise, returns True
#==========================================
def merge_guild(fname):
    try:
        fp = open(fname)
        stuff = get_data_list(fname)
        if get_col_index(stuff[0],'DKP') == -1:
            return False
        else:
            dkp_idx = get_col_index(stuff[0],'DKP')
        if get_col_index(stuff[0],'Original Guild') == -1:
            return False
        else:
            guild_idx = get_col_index(stuff[0],'Original Guild')
        fp_out = open(fname, 'w')
        for line in stuff:
            str_list = line.split(',')
            if str_list[guild_idx] == 'Lions of Casterly Rock':
                str_list[dkp_idx] = str(float(str_list[dkp_idx]) * 13.7)
                line = ','.join(str_list)
                fp_out.write(line)
            else:
                line = ','.join(str_list)
                fp_out.write(line)
        fp.close()
        fp_out.close()
        return True
    except FileNotFoundError:
        return False
