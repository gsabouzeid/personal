#!/usr/bin/python3

# Garrett Abou-Zeid
# x500: abouz009
# March 18, 2022
# CSCI 5541

import pickle
import sys


# Calculates the word to POS tag association sentence sequence by adding the
# log probability of each word to POS tag association in the sentence sequence
def word_tag_seq_func(tag_sent_arr, tag_word_prob_dict):
    prob = 0
    for tup in tag_sent_arr:
        if tup in tag_word_prob_dict:
            prob += tag_word_prob_dict[tup]

    return prob


# Calculates the tag sequence by adding the log probability of each tag bigram
# in the sentence sequence
def tag_seq_func(tag_sent_arr, tag_bigram_prob_dict):
    prob = 0
    for i in range(-1, len(tag_sent_arr)):
        if i == -1:
            prob += tag_bigram_prob_dict["<S> " + tag_sent_arr[i + 1][1]]
        elif i == len(tag_sent_arr) - 1:
            prob += tag_bigram_prob_dict[tag_sent_arr[i][1] + " </S>"]
        else:
            prob += tag_bigram_prob_dict[
                tag_sent_arr[i][1] + " " + tag_sent_arr[i + 1][1]
            ]

    return prob


def main():
    if len(sys.argv) != 3:
        print("Invalid arguments")
        print("Enter: python3 hmm_sequence.py model.dat <tagged sentence file>")
        return

    fp = open(sys.argv[1], "rb")
    matrices = pickle.load(fp)
    tag_bigram_prob_dict = matrices[0]
    tag_word_prob_dict = matrices[1]

    fp = open(sys.argv[2], "r")
    tagged_sent = fp.read()

    tag_sent_arr = tagged_sent.split()
    for i in range(0, len(tag_sent_arr)):
        word_tag_arr = tag_sent_arr[i].split("/")
        tag_sent_arr[i] = (word_tag_arr[0], word_tag_arr[1])

    word_tag_seq_prob = word_tag_seq_func(tag_sent_arr, tag_word_prob_dict)
    tag_seq_prob = tag_seq_func(tag_sent_arr, tag_bigram_prob_dict)

    print("Tagged Sentence: " + tagged_sent)
    print("Sequence Probablity: " + str(word_tag_seq_prob + tag_seq_prob))


if __name__ == "__main__":
    main()
