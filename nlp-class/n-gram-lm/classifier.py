#!/usr/bin/python3

#---------
# Authors : Garrett Abou-Zeid
# CSCI 5541, Homework 4
# How to call the script without -test flag:
#   python3 classifier.py authorlist
# How to call the script with -test flag:
#   python3 classifier.py authorlist -test (yourtestfile)
#---------

# Encoding type:
#   ASCII
# Data cleaning methods:
#   Removed all punctuation
#   Lowercase everything
#   Words and sentences tokenized using nltk
#   If word is not in dictionary (brown corpus) replace with <UNK>
#   Words that aren't seen in training set is replaced with <UNK>
# What information is in language models:
#   Bigram counts
#   Unigram counts
#   Frequency-of-frequencies
#   Brown corpus from nltk
#   Bigram probabilities
#   List of training sets
#   List of Development sets
# Method of smoothing:
#   Good-Turing Discounting Smoothing. Smooths for counts < 6
# Other tweaks to improve:
#   N/A (Attempted implement trigrams, but was seeing worse results than bigrams)
# Results without -test flag:
#   For author austen, predicted correctly 661 / 1207 = 54.76%
#   For author dickens, predicted correctly 556 / 1366 = 40.7%
#   For author tolstoy, predicted correctly 1149 / 2068 = 55.56%
#   For author wilde, predicted correctly 614 / 1337 = 45.92%

import nltk
from nltk.corpus import brown
import re
import sys
import random
import math

#Sentence tokenizer
#Turns all letters to lowercase
#Replaces new lines with spaces
#Replaces dashes with spaces
#Removes characters that is not whitespace not word characters
def sent_tok(fname):
    with open(fname) as fp:
        text = fp.read()
        text = text.lower()
        text = re.sub('\n'," ", text)
        text = re.sub("-", " ", text)
        text = nltk.tokenize.sent_tokenize(text)
        for i in range(0, len(text)):
            text[i] = re.sub(r"[^\w\s]", "", text[i])
        return text

#Word tokenizer
#Replaces dashes with spaces
#Removes characters that is not whitespace not word characters
def word_tok(sent):
    sent = re.sub("-", " ", sent)
    sent = re.sub(r"[^\w\s]", "", sent)
    return nltk.tokenize.word_tokenize(sent)

#Creates a set of Brown corpus for easier accessing
def brown_corpus_set():
    print("Loading corpora...")
    brown_list = []
    for word in brown.words():
        brown_list.append(re.sub(r"[^\w\s]", "", word))
    return set(brown_list)

#Creates the training and development sets
#Incorporates random sampling by shuffling the sentences
#Training set: 80% of text file
#Development set: 20% of test file
def dev_train_sets(sent_arr):
    train_set = []
    dev_set = []

    random.shuffle(sent_arr)

    num_train_sent = round(len(sent_arr) * 0.8)

    for i in range(0, num_train_sent):
        train_set.append(sent_arr[i])
    for j in range(num_train_sent, len(sent_arr)):
        dev_set.append(sent_arr[j])

    return [train_set, dev_set]

#Creates a dictionary of unigrams
#Key: Unique unigram
#Value: How many times that unigram appears
def unigram_count(sent_arr, brown_set):
    count_dict = {"<UNK>": 0}
    for sent in sent_arr:
        word_arr = word_tok(sent)
        for word in word_arr:
            if word not in brown_set:
                count_dict["<UNK>"] += 1
            elif word in count_dict:
                count_dict[word] += 1
            else:
                count_dict[word] = 1
    return count_dict

#Creates a dictionary of bigrams
#Key: Unique bigram
#Value: How many times that bigram appears
def bigram_count(sent_arr, brown_set):
    bigram_dict = {}
    for sent in sent_arr:
        word_arr = nltk.tokenize.word_tokenize(sent)
        for i in range(0,len(word_arr)-1):
            if word_arr[i] not in brown_set:
                word_arr[i] = "<UNK>"
            if word_arr[i+1] not in brown_set:
                word_arr[i+1] = "<UNK>"
            key = word_arr[i] + " " + word_arr[i+1]
            if key not in bigram_dict:
                bigram_dict[key] = 1
            else:
                bigram_dict[key] += 1

    return bigram_dict

#Calculates the probabilites of the bigrams appearing in the training set
def bigram_prob(bigram_count_dict, unigram_count_dict):
    bigram_prob_dict = {}

    for bigram, count in bigram_count_dict.items():
        word_arr = bigram.split()
        bigram_prob_dict[bigram] = count / unigram_count_dict[word_arr[0]]

    return bigram_prob_dict

#Calculates and predicts (using probability) what author wrote each sentence in each development set
#Incorporates Good-Turing Discounting
def sent_prob(dev_set, freq_of_freq_list, bigram_prob_list, bigram_count_list, unigram_count_list, brown_set, i):
    correct = 0
    num_sents = len(dev_set)
    
    for sent in dev_set:
        lm_prob = []
        sent_arr = sent.split()
        for j in range(len(bigram_prob_list)):
            sent_prob = 0
            for k in range(0, len(sent_arr)-1):
                if sent_arr[k] not in brown_set or sent_arr[k] not in unigram_count_list[j]:
                    sent_arr[k] = "<UNK>"
                if sent_arr[k+1] not in brown_set or sent_arr[k+1] not in unigram_count_list[j]:
                    sent_arr[k+1] = "<UNK>"
                bigram = sent_arr[k] + " " + sent_arr[k+1]
                if bigram in bigram_prob_list[j] and bigram_count_list[j][bigram] >= 6:
                    sent_prob += math.log(bigram_prob_list[j][bigram])
                else:
                    count_star = good_turing_smoothing(bigram, bigram_count_list[j], freq_of_freq_list[j])
                    sent_prob += math.log(count_star / unigram_count_list[j][sent_arr[k]])
            lm_prob.append(sent_prob)

        highest_prob = max(lm_prob)
        highest_index = lm_prob.index(highest_prob)
        if(highest_index == i):
            correct += 1

    return [correct, num_sents]

#Function is called when program is run with the -test flag
#Incorporates Good-Turing Discounting
def sent_prob_test(authors, freq_of_freq_list, test_sent_arr, bigram_prob_list, bigram_count_list, unigram_count_list, brown_set):
    predictions = {}
    for author in authors:
        predictions[author] = 0

    for sent in test_sent_arr:
        lm_prob = []
        sent_arr = sent.split()
        for i in range(len(bigram_prob_list)):
            sent_prob = 0
            for j in range(0, len(sent_arr)-1):
                if sent_arr[j] not in brown_set or sent_arr[j] not in unigram_count_list[i]:
                    sent_arr[j] = "<UNK>"
                if sent_arr[j+1] not in brown_set or sent_arr[j+1] not in unigram_count_list[i]:
                    sent_arr[j+1] = "<UNK>"
                bigram = sent_arr[j] + " " + sent_arr[j+1]
                if bigram in bigram_prob_list[i] and bigram_count_list[i][bigram] >= 6:
                    sent_prob += math.log(bigram_prob_list[i][bigram])
                else:
                    count_star = good_turing_smoothing(bigram, bigram_count_list[i], freq_of_freq_list[i])
                    sent_prob += math.log(count_star / unigram_count_list[i][sent_arr[j]])
            lm_prob.append(sent_prob)

        highest_prob = max(lm_prob)
        highest_index = lm_prob.index(highest_prob)
        predicted_author = authors[highest_index]
        print(predicted_author)
        predictions[predicted_author] += 1

    return predictions



#Good-Turing Discounting Smoothing
#Runs for bigrams of counts < 6
def good_turing_smoothing(bigram, bigram_count_dict, freq_of_freq_dict):
    if bigram not in bigram_count_dict:
        count = 0
    else:
        count = bigram_count_dict[bigram]
    return (count+1) * (freq_of_freq_dict[count+1] / freq_of_freq_dict[count])
    
#Calculates the frequency of frequencies of bigrams
#Used for Good-Turing Discounting
def freq_of_freq(bigram_count_dict, unigram_count_dict):
    freq_of_freq_dict = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    for key in bigram_count_dict:
        if bigram_count_dict[key] in freq_of_freq_dict:
            freq_of_freq_dict[bigram_count_dict[key]] += 1
    
    freq_of_freq_dict[0] = (len(unigram_count_dict) * len(unigram_count_dict)) - freq_of_freq_dict[1] - freq_of_freq_dict[2] - freq_of_freq_dict[3] - freq_of_freq_dict[4] - freq_of_freq_dict[5]

    return freq_of_freq_dict

def main():
    #Extract a development set from the author data,
    #then train on the remaining data,
    #then run the task on the development data
    #and print the results
    if len(sys.argv) == 2:
        authorlist = sys.argv[1]
        files = []
        with open(authorlist) as fp:
            for line in fp:
                line = re.sub("\n", "", line)
                files.append(line)
        brown_set = brown_corpus_set()

        train_list = []
        dev_list = []

        for file in files:
            sent_arr = sent_tok(file)
            train_dev_list = dev_train_sets(sent_arr)
            train_list.append(train_dev_list[0])
            dev_list.append(train_dev_list[1])
            print("Loaded " + file)

        bigram_count_list = []
        unigram_count_list = []

        print("Calculating bigrams...")
        for list in train_list:
            bigram_count_list.append(bigram_count(list, brown_set))
            unigram_count_list.append(unigram_count(list, brown_set))


        bigram_prob_list = []
        for i in range(0, len(bigram_count_list)):
            bigram_prob_list.append(bigram_prob(bigram_count_list[i], unigram_count_list[i]))

        print("Calculating Frequencies of Frequencies...")
        freq_of_freq_list = []
        for i in range(0,len(bigram_count_list)):
            freq_of_freq_list.append(freq_of_freq(bigram_count_list[i], unigram_count_list[i]))

        authors = []
        for file in files:
            arr = file.split(".")
            authors.append(arr[0])

        print("Running dev sets:")
        for i in range(0, len(dev_list)):
            results = sent_prob(dev_list[i], freq_of_freq_list, bigram_prob_list, bigram_count_list, unigram_count_list, brown_set, i)
            print("For author " + authors[i] + ", predicted correctly", results[0], "/", results[1], "=", str(round((results[0] / results[1] * 100), 2)) + "%")

    #Use entirety of data in each author file to train a language model,
    #then output classification results for each line in the given 'testfile'.
    #You may assume that each line of 'testfile' is an enitre sentence
    elif len(sys.argv) == 4:
        authorlist = sys.argv[1]
        testfile = sys.argv[3]
        files = []
        with open(authorlist) as fp:
            for line in fp:
                line = re.sub("\n", "", line)
                files.append(line)
        brown_set = brown_corpus_set()

        test_sent_arr = sent_tok(testfile)

        train_list = []

        for file in files:
            train_list.append(sent_tok(file))
            print("Loaded " + file)

        bigram_count_list = []
        unigram_count_list = []

        print("Calculating bigrams...")
        for list in train_list:
            bigram_count_list.append(bigram_count(list, brown_set))
            unigram_count_list.append(unigram_count(list, brown_set))

        bigram_prob_list = []
        for i in range(0, len(bigram_count_list)):
            bigram_prob_list.append(bigram_prob(bigram_count_list[i], unigram_count_list[i]))

        print("Calculating Frequencies of Frequencies...")
        freq_of_freq_list = []
        for i in range(0,len(bigram_count_list)):
            freq_of_freq_list.append(freq_of_freq(bigram_count_list[i], unigram_count_list[i]))

        authors = []
        for file in files:
            arr = file.split(".")
            authors.append(arr[0])
        
        results = sent_prob_test(authors, freq_of_freq_list, test_sent_arr, bigram_prob_list, bigram_count_list, unigram_count_list, brown_set)
        # for key in results:
        #     print(key + ":", results[key], "(" + str(round(results[key] / len(test_sent_arr) * 100, 2)) + "%)")

    else:
        print("Invalid arguments")
        print("Option 1: python3 classifier.py authorlist")
        print("Option 2: python3 classifier.py authorlist -test testfile")

if __name__ == '__main__':
    main()