
#Automated end-to-end test of a ToDo app using Playwright (JavaScript)


Setup Instruction



Instructions to execute test

-To execute test in headless mode -> npx playwright test
-To execute test in headed mode -> npx playwright test --headed
-To execute test in UI mode -> npx playwright test --ui
-To get test report -> npx playwright show-report




Test Scenarios

-Add a Todo
-Mark a Todo as Completed
-Delete a Todo
-Edit a Todo
-Filter Todos(All, Active, Completed)
-Negative Test(Empty todo)
-Screenshot on failure




Test Design Decisions Notes

-All tests are independent and can be run separately
-All tests includes basic error handling and assertions (Playwright expect)
-Implemented Page Object Model for maintainability
-