#!/usr/bin/python3

# Garrett Abou-Zeid
# x500: abouz009
# March 18, 2022
# CSCI 5541

import math
import pickle
import sys


# Initiation Step of the Viterbi Algorithm
# Determines the most probable POS tag that is followed after the starting tag <S>
def initiation(states, tag_bigram_prob_dict, tag_word_prob_dict, untagged_sent):
    token_sent = untagged_sent.split()
    vit = {}
    back = {}

    for t in range(0, len(token_sent) + 1):
        vit[(t, "<S>")] = -math.inf
        for s in states:
            tup = (t, s)
            vit[tup] = -math.inf
        vit[(t, "</S>")] = -math.inf

    for s in states:
        key = (0, s)
        transition_key = "<S> " + s
        emission_key = (token_sent[0], s)
        if (
            transition_key in tag_bigram_prob_dict
            and emission_key in tag_word_prob_dict
        ):
            vit[key] = (
                tag_bigram_prob_dict[transition_key] + tag_word_prob_dict[emission_key]
            )
            back[(0, s)] = "<S>"

    return [vit, back]


# Recursive step of the Viterbi Algorithm
# Determines the most probable POS tag that is followed by the previous most likely POS tag
def recursive(
    states, tag_bigram_prob_dict, tag_word_prob_dict, untagged_sent, vit, back
):
    token_sent = untagged_sent.split()

    for t in range(1, len(token_sent)):
        for s in states:
            vit[(t, s)] = -math.inf
            for sprev in states:
                transition_key = sprev + " " + s
                emission_key = (token_sent[t], s)
                if (
                    transition_key in tag_bigram_prob_dict
                    and emission_key in tag_word_prob_dict
                ):
                    temp = (
                        vit[(t - 1, sprev)]
                        + tag_bigram_prob_dict[transition_key]
                        + tag_word_prob_dict[emission_key]
                    )
                    if temp > vit[(t, s)]:
                        vit[(t, s)] = temp
                        back[(t, s)] = sprev

    return [vit, back]


# Termination step of Viterbi Algorithm
# Determines the most probable POS tag that is followed before the ending tag </S>
def termination(states, tag_bigram_prob_dict, untagged_sent, vit, back):
    token_sent = untagged_sent.split()
    last = len(token_sent)

    vit[(last, "</S>")] = -math.inf
    for s in states:
        transition_key = s + " </S>"
        if transition_key in tag_bigram_prob_dict:
            temp = vit[(last - 1, s)] + tag_bigram_prob_dict[transition_key]
            if temp > vit[(last, "</S>")]:
                vit[(last, "</S>")] = temp
                back[(last, "</S>")] = s

    return back


# Viterbi Algorithm
# Used to calculate the most likely POS tag sequence of a given sentence
def viterbi(tag_bigram_prob_dict, tag_word_prob_dict, untagged_sent):
    states = []
    for key in tag_word_prob_dict:
        if key[1] not in states:
            states.append(key[1])

    result = initiation(states, tag_bigram_prob_dict, tag_word_prob_dict, untagged_sent)
    vit = result[0]
    back = result[1]

    result = recursive(
        states, tag_bigram_prob_dict, tag_word_prob_dict, untagged_sent, vit, back
    )
    vit = result[0]
    back = result[1]

    back = termination(states, tag_bigram_prob_dict, untagged_sent, vit, back)

    tag_seq = []
    token_sent = untagged_sent.split()
    last = len(token_sent)

    value = back[(last, "</S>")]
    tag_seq.insert(0, value)
    for t in range(last - 1, 0, -1):
        key = value
        value = back[(t, key)]
        tag_seq.insert(0, value)

    word_tag_seq = ""
    for i in range(0, len(token_sent)):
        word_tag_seq += token_sent[i] + "/" + tag_seq[i] + " "

    return word_tag_seq


def main():
    if len(sys.argv) != 3:
        print("Invalid arguments")
        print("Enter: python3 hmm_viterbi.py model.dat <untagged sentence file>")
        return

    fp = open(sys.argv[1], "rb")
    matrices = pickle.load(fp)
    tag_bigram_prob_dict = matrices[0]
    tag_word_prob_dict = matrices[1]

    fp = open(sys.argv[2], "r")
    untagged_sent = fp.read()

    word_tag_seq = viterbi(tag_bigram_prob_dict, tag_word_prob_dict, untagged_sent)

    print(word_tag_seq)


if __name__ == "__main__":
    main()
