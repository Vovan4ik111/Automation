Test Scenarios for Sign-Up Page
1. Functional Test Scenarios
Test Scenario 1: Successful Sign-Up
Description: Verify that a user can successfully sign up with valid information.
Steps:
Navigate to the sign-up page. (Should check URL?)
Fill in all required fields with valid data. (Name amd email) (check if they are visible)
Click the "Sign Up" button.
Redirect to a sign-up page (Verify URL)
Fill all fields (need all fields?) (check if they are visible)
Click Create Account
Expected Result: User is redirected to a confirmation page.
Click "Continue" button
Verify User Name on the header.
Test Scenario 2: Email Already Registered
Description: Verify that the system prevents sign-up with an already registered email.
Steps:
Navigate to the sign-up page.
Enter an email that is already registered.
Fill in the other required fields with valid data.
Click the "Sign Up" button.
Expected Result: Error message is displayed indicating that the email is already exist.
Test Scenario 3: Empty Required Fields Submission
Description: Verify that the system prompts the user when trying to sign up with empty required fields.
Steps:
Navigate to the sign-up page.
Leave required fields empty.
Click the "Sign Up" button.
Expected Result: Error messages are displayed for each empty required field. (Should do for each field?)

2. Usability Test Scenarios 
Test Scenario 6: UI Elements Visibility (Check in the 1 TC)
Description: Verify that all UI elements (fields, buttons, labels) are visible on the sign-up page.
Expected Result: All elements should be clearly visible, properly labeled, and aligned.

3. Security Test Scenarios
Test Scenario 8: SQL Injection Attempt
Description: Test the sign-up form against SQL injection attacks.
Steps:
Enter SQL injection code in the email and password fields.
Click the "Sign Up" button.
Expected Result: System should not allow sign-up and should handle the input securely.
Test Scenario 9: Password Masking
Description: Verify that the password fields mask user input.
Expected Result: Password characters should be hidden (displayed as dots or asterisks).

4. Edge Case Test Scenarios
Test Scenario 10: Long Input Fields
Description: Verify system behavior with excessively long input in fields.
Steps:
Enter very long strings in the required fields.
Click the "Sign Up" button.
Expected Result: System should handle the input gracefully without crashing.
Test Scenario 11: Special Characters in Input
Description: Verify that the sign-up page can handle special characters in the name, email, and password fields.
Steps:
Enter valid name, email, and password containing special characters. (!@#$%^&*()_+=-) (Do I need to use french special character?)
Click the "Sign Up" button.
Expected Result: User should be able to sign up if all validations are met.
