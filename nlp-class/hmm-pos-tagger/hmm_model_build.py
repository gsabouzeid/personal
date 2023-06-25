#!/usr/bin/python3

# Garrett Abou-Zeid
# x500: abouz009
# March 18, 2022
# CSCI 5541

import math
import pickle

from nltk.corpus import brown


# Counts and stores the frequency of POS tags in a dictionary
def tag_unigram_counts(sents):
    tag_unigram_count_dict = {}

    tag_unigram_count_dict["<S>"] = 0
    tag_unigram_count_dict["</S>"] = 0

    for sent in sents:
        tag_unigram_count_dict["<S>"] += 1
        for tup in sent:
            if tup[1] not in tag_unigram_count_dict:
                tag_unigram_count_dict[tup[1]] = 1
            else:
                tag_unigram_count_dict[tup[1]] += 1
        tag_unigram_count_dict["</S>"] += 1

    return tag_unigram_count_dict


# Counts and stores the frequency of POS tag bigrams in a dictionary
def tag_bigram_counts(sents):
    tag_bigram_count_dict = {}

    for sent in sents:
        for i in range(-1, len(sent)):
            if i == -1:
                key = "<S>" + " " + sent[i + 1][1]
            elif i == len(sent) - 1:
                key = sent[i][1] + " " + "</S>"
            else:
                key = sent[i][1] + " " + sent[i + 1][1]

            if key not in tag_bigram_count_dict:
                tag_bigram_count_dict[key] = 1
            else:
                tag_bigram_count_dict[key] += 1

    return tag_bigram_count_dict


# Counts and stores the frequency of word to POS tag associations in a dictionary
def tag_word_counts(sents):
    tag_word_count_dict = {}

    for sent in sents:
        for tup in sent:
            if tup not in tag_word_count_dict:
                tag_word_count_dict[tup] = 1
            else:
                tag_word_count_dict[tup] += 1

    return tag_word_count_dict


# Calculates and stores the log probability of each tag bigram in a dictionary
def tag_bigram_prob(tag_bigram_count_dict, tag_unigram_count_dict):
    tag_bigram_prob_dict = {}

    for bigram, count in tag_bigram_count_dict.items():
        tag_arr = bigram.split()
        tag_bigram_prob_dict[bigram] = math.log(
            count / tag_unigram_count_dict[tag_arr[0]]
        )

    return tag_bigram_prob_dict


# Calculates and stores the log probablity of each word to POS tag association in a dictionary
def word_tag_prob(tag_word_count_dict, tag_unigram_count_dict):
    tag_word_prob_dict = {}

    for seq, count in tag_word_count_dict.items():
        tag_word_prob_dict[seq] = math.log(count / tag_unigram_count_dict[seq[1]])

    return tag_word_prob_dict


def main():
    sents = brown.tagged_sents()

    print("Calculating tag unigram counts...")
    tag_unigram_count_dict = tag_unigram_counts(sents)
    print("Calculating tag bigram counts...")
    tag_bigram_count_dict = tag_bigram_counts(sents)
    print("Calculating word-tag counts...")
    tag_word_count_dict = tag_word_counts(sents)

    print("Calculating tag bigram probabilites...")
    tag_bigram_prob_dict = tag_bigram_prob(
        tag_bigram_count_dict, tag_unigram_count_dict
    )
    print("Calculating word-tag probabilites...")
    tag_word_prob_dict = word_tag_prob(tag_word_count_dict, tag_unigram_count_dict)

    matrices = [tag_bigram_prob_dict, tag_word_prob_dict]

    print("Writing to model.dat...")
    fp = open("model.dat", "wb")
    pickle.dump(matrices, fp)


if __name__ == "__main__":
    main()
