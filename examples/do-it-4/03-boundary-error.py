def calculate_total(session_one, session_two, session_three):
    total = session_one + session_two + session_three
    return total


def calculate_average(total):
    average = total / 3
    return average


def get_target_message(total):
    if total > 6:
        return "Target achieved"
    else:
        return "Keep practising"


def main():
    name = input("Enter learner name: ")
    session_one = float(input("Enter hours for session 1: "))
    session_two = float(input("Enter hours for session 2: "))
    session_three = float(input("Enter hours for session 3: "))

    total = calculate_total(session_one, session_two, session_three)
    average = calculate_average(total)
    target_message = get_target_message(total)

    print()
    print("STUDY SESSION SUMMARY")
    print("Learner:", name)
    print("Total hours:", round(total, 1))
    print("Average hours:", round(average, 1))
    print("Target:", target_message)


main()
