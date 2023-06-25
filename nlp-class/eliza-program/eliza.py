import re


def main():
    eliza = input("Hello. Please tell me about your problems.\n")
    while True:
        eliza = eliza.lower()
        original_string = eliza

        if re.fullmatch("yes", eliza):
            eliza = "I see."
        elif re.fullmatch("no", eliza):
            eliza = "Why not?"
        elif re.fullmatch("goodbye", eliza):
            print("Goodbye!")
            return
        elif re.fullmatch(".* you", eliza):
            eliza = "let's not talk about me."

        eliza = re.sub("what is ", "Why do you ask about ", eliza)
        if re.search("i am .*", eliza):
            eliza = re.sub("i am ", "Do you enjoy being ", eliza)
            eliza = eliza + "?"
        eliza = re.sub("why is ", "Why do you think ", eliza)
        eliza = re.sub("my ", "Your ", eliza)

        # 4 more matching cases
        if re.search("i love .*", eliza):
            eliza = re.sub("i love ", "Why do you love ", eliza)
            eliza = eliza + "?"
        if re.search("i can't .*", eliza):
            eliza = re.sub("i can't ", "Why can't you ", eliza)
            eliza = eliza + "?"
        if re.search("i had .*", eliza):
            eliza = re.sub("i had ", "When did you have ", eliza)
            eliza = eliza + "?"
        if re.search("i think(.*)because(.*)", eliza):
            eliza = re.sub("i think", "So you believe", eliza)
            eliza = re.sub("because", "since", eliza)
            eliza = eliza + "?"

        if eliza == original_string:
            eliza = input("Please go on.\n")
        else:
            eliza = input(eliza + "\n")


if __name__ == "__main__":
    main()
