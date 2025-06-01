
# Automated end-to-end test of a ToDo app using Playwright (JavaScript)

Demo app used for the Test
    https://demo.playwright.dev/todomvc



Setup Instructions

Step 1- Clone the project
    git clone https://github.com/milantondutta/Assignment

Step 2- Navitage to the project directory
    cd Assignment

Step 3- Install all project dependencies
    npm install



Instructions to execute Test

    To execute test in headless mode  ->     npx playwright test
    To execute test in headed mode    ->     npx playwright test --headed
    To execute test in UI mode        ->     npx playwright test --ui
    To get test report                ->     npx playwright show-report



Test Scenarios

    Add a Todo
    Mark a Todo as Completed
    Delete a Todo
    Edit a Todo
    Filter Todos(All, Active, Completed)
    Negative Test(Empty todo)
    Screenshot on failure



Test Design Decisions Notes

Independent Tests: 
    All tests are isolated and can be executed individually which improves reliability.

Assertions and Error Handling: 
    All tests includes validation using Playwright’s built-in assertion library 'expect' to improve test 
    robustness and provide easier debugging.

Page Object Model (POM): 
    Tests are structured using POM for better readability and maintainability.

Comments for Clarity: 
    Key steps in the test scripts are clearly commented to improve readability and understanding.