import random

#==========================================
# Purpose: Takes two dictionaries and combines them into one dictionary
# Input Parameter(s):
#   d1 - One of the dictionaries
#   d2 - One of the dictionaries
# Return Value(s):
#   dSum - The combined dictionary that has elements of both d1 and d2
#==========================================
def combine(d1, d2):
    dSum = {}
    for key in d1:
        if key not in dSum:
            if key in d2:
                total = d1.get(key) + d2.get(key)
                dSum[key] = total
            else:
                dSum[key] = d1.get(key)
    for key in d2:
        if key not in dSum:
            if key in d1:
                total = d2.get(key) + d1.get(key)
                dSum[key] = total
            else:
                dSum[key] = d2.get(key)
    return dSum

#==========================================
# Purpose: Finds the first word in each sentence and puts it into a dictionary with
#          a value of how many times the word is the first word.
# Input Parameter(s):
#   fname - The name of the file with the text
# Return Value(s):
#   first_dict - A dictionary containing the first words in each sentence and how many times
#                those words are the first words.
#==========================================
def first_words(fname):
    fp = open(fname)
    first_list = []
    first_dict = {}
    for line in fp:
        sentence = line.split(' ')
        first_list.append(sentence[0])
    for word in first_list:
        count = first_list.count(word)
        first_dict[word] = count
    fp.close()
    return first_dict

#==========================================
# Purpose: Keeps track of what words come after each word and how many times they do so
# Input Parameter(s):
#   fname - The name of the file with the text
# Return Value(s):
#   main_dict - A dictionary containing dictionaries that keep track of what words come
#   after each word and how many times they do so
#==========================================
def next_words(fname):
    fp = open(fname)
    main_dict = {}
    word_list = []
    for line in fp:
        line = line.strip('\n')
        line_list = line.split(' ')
        for word in line_list:
            word_list.append(word)
    for i in range(0,len(word_list) - 1):
        if word_list[i] != '.':
            main_dict[word_list[i]] = {}
    for i in range(0,len(word_list) - 1):
        if word_list[i] != '.':
            two_word_list = [word_list[i],word_list[i+1]]
            count = two_word_list.count(two_word_list[1])
            temp_dict = {}
            temp_dict[word_list[i+1]] = count
            for key in temp_dict.keys():
                if key in main_dict[word_list[i]]:
                    total = main_dict[word_list[i]][word_list[i+1]] + temp_dict[word_list[i+1]]
                    main_dict[word_list[i]][word_list[i+1]] = total
                else:
                    main_dict[word_list[i]].update(temp_dict)
    fp.close()
    return main_dict

#==========================================
# Purpose: Creates a random 10 sentence fanficton
# Input Parameter(s):
#   fname - The name of the file with the text
# Return Value(s):
#   N/A
#==========================================
def fanfic(fname):
    fp = open(fname)
    first_list = []
    first_dic = first_words(fname)
    main_dic = next_words(fname)
    for key in first_dic.keys():
        first_list.append(key)
    sent = 0
    while sent != 10:
        new_line = ''
        new_line = new_line + random.choice(first_list)
        next_word = random.choice(list(main_dic[new_line]))
        new_line = new_line + ' ' + next_word
        while next_word != '.':
            next_word = random.choice(list(main_dic[next_word]))
            new_line = new_line + ' ' + next_word
        print(new_line)
        sent += 1
    fp.close()
