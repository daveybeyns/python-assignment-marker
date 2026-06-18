def calculate_total(session_one, session_two, session_three):
    print(session_one + session_two + session_three)


def calculate_average(total):
    print(total / 3)


def get_target_message(total):
    if total >= 6:
        print("Target achieved")
    else:
        print("Keep practising")


def main():
    name = input("Enter learner name: ")
    session_one = float(input("Enter hours for session 1: "))
    session_two = float(input("Enter hours for session 2: "))
    session_three = float(input("Enter hours for session 3: "))

    total = session_one + session_two + session_three
    print("STUDY SESSION SUMMARY")
    print("Learner:", name)
    print("Total hours:", round(total, 1))
    print("Average hours:", round(total / 3, 1))
    print("Target:", "Target achieved" if total >= 6 else "Keep practising")


main()
