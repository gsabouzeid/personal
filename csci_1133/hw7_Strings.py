#==========================================
# Purpose: Takes a message and encrypts it with a specific cipher inputed by the user
# Input Parameter(s):
#   message - The message to be encrypted
#   encoding - The cipher made by the user
# Return Value(s):
#   message - The message after it has been encrypted by the cipher
#==========================================
def encrypt(message, encoding):
    message = message.lower()
    message = message.replace(" ","")
    punc = ",.!'"
    num = "0123456789"
    alphabet = []
    if message.isalpha() == False:
        for ch in punc:
            message = message.replace(ch,"")
        for char in num:
            message = message.replace(char,"")
    for i in range(0,130,5):
        alphabet.append(encoding[i:i+5])
    for letter in message:
        message = message.replace(letter,alphabet[ord(letter) - ord('a')])
    return message

#==========================================
# Purpose: Takes an encrypted message and decrypts it with a specific cipher inputed by the user
# Input Parameter(s):
#   message - The message to be decrypted
#   encoding - The cipher made by the user
# Return Value(s):
#   message - The message after it has been decrypted by the cipher
#==========================================
def decrypt(message, encoding):
    message_list = []
    encode_list = []
    new_message = ""
    for i in range(0,len(message),5):
        message_list.append(message[i:i+5])
    for j in range(0,130,5):
        encode_list.append(encoding[j:j+5])
    for mes in range(0,len(message_list)):
        for enc in range(0,len(encode_list)):
            if message_list[mes] == encode_list[enc]:
                message_list[mes] = chr(ord('a') + enc)
    for ind in message_list:
        new_message = new_message + ind
    message = new_message
    return new_message

#==========================================
# Purpose: Returns the longest continuous sequence of letters compared by the 2 DNA sequences
# Input Parameter(s):
#   first - The first DNA sequence
#   second - The second DNA sequence
# Return Value(s):
#   longest_dna - The longest continuous sequence of letters compared by the 2 DNA sequences
#==========================================
def longest_common(first,second):
    longest_dna = ""
    for start in range(0,len(first)):
        for end in range(start+1,len(first)):
            if first[start:end] in second and len(first[start:end]) > len(longest_dna):
                longest_dna = first[start:end]
    return longest_dna

#==========================================
# Purpose: Translates the phrase into Pig Latin
# Input Parameter(s):
#   phrase - The phrase that will be translated
# Return Value(s):
#   phrase - The phrase after it has been translated
#==========================================
def igpay(phrase):
    new_phrase = ""
    phrase = phrase.split()
    for i in range(0,len(phrase)-1):
        phrase[i] = trans_punc(phrase[i])
        new_phrase = new_phrase + phrase[i] + " "
    phrase[-1] = trans_punc(phrase[-1])
    new_phrase = new_phrase + phrase[-1]
    phrase = new_phrase
    return phrase

#==========================================
# Purpose: Find the index where the first vowel occurs in the word
# Input Parameter(s):
#   word - The word that will be used to find the first vowel
# Return Value(s):
#   i - the index where the first vowel occurs
#==========================================   
def find_index(word):
    vowels = "aeiou"
    for i in range(0,len(word)):
        if word[i] in vowels:
            return i
        
#==========================================
# Purpose: Translates the word into Pig Latin (without punctuation and capitalization)
# Input Parameter(s):
#   word - The word that will be translated
# Return Value(s):
#   word - The word after it has been translated
#==========================================
def trans(word):
    if find_index(word) == 0:
        word = word + "way"
    elif find_index(word) == None:
        word = word + "ay"
    else:
        word = word[find_index(word):len(word)] + word[0:find_index(word)] + "ay"
    return word

#==========================================
# Purpose: Translates the substring into Pig Latin (with punctuation and capitalization)
# Input Parameter(s):
#   substr - The substring that will be translated
# Return Value(s):
#   substr - The substring after it has been translated
#==========================================
def trans_punc(substr):
    punc = ",.?!"
    for char in punc:
        if char in substr and substr[0].isupper() == True:
            substr = substr.replace(char,"")
            substr = substr.lower()
            substr = trans(substr)
            substr = substr[0].upper() + substr[1:len(substr)] + char
            return substr
        if char in substr and substr[0].isupper() == False:
            substr = substr.replace(char,"")
            substr = trans(substr)
            substr = substr + char
            return substr
    if substr[0].isupper() == True:
        substr = substr.lower()
        substr = trans(substr)
        substr = substr[0].upper() + substr[1:len(substr)]
        return substr
    if substr[0].isupper() == False:
        substr = trans(substr)
        return substr
