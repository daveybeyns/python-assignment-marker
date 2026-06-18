name = input("Enter learner name: ")
session_one = float(input("Enter hours for session 1: "))
session_two = float(input("Enter hours for session 2: "))
session_three = float(input("Enter hours for session 3: "))

total = session_one + session_two + session_three
average = total / 3
message = "Target achieved" if total >= 6 else "Keep practising"

print("STUDY SESSION SUMMARY")
print("Learner:", name)
print("Total hours:", round(total, 1))
print("Average hours:", round(average, 1))
print("Target:", message)
