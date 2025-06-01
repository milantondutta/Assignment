import {test, expect} from '@playwright/test'

import {CreateTodo} from '../pageObjects/CreateTodo'



// Navigating to the application
test.beforeEach(async({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc')
})



// Adding a new ToDo
test('Add a Todo', async ({page}) => {

    // Adding a New ToDo
    const newTodo = new CreateTodo(page)
    await newTodo.todo()

    // Verifying if the added ToDo appears on the list
    await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Buy fruits')
    await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(1)
})
       


// Marking a Todo as Completed
test('Mark a ToDo as completed', async ({page}) => {

    // Adding a New ToDo
    const newTodo = new CreateTodo(page)
    await newTodo.todo()

    // Navigating to toggle button and applying a check on it
    await page.locator('[class="toggle"]').click()

    // Verifying if the checked ToDo is marked as completed
    await expect(page.locator('[data-testid="todo-item"]')).toHaveClass(/completed/)
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1)
})

   

// Deleting a ToDo
test('Delete a ToDo', async ({page}) => {

    // Adding a New ToDo
    const newTodo = new CreateTodo(page)
    await newTodo.todo()

    // Hovering over the active ToDo and making a click on the delete button 
    await page.locator('[data-testid="todo-title"]').hover()
    await page.locator('[aria-label="Delete"]').click()

    // Verifying if the deleted ToDo is gone
    await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(0)
})



// Editing a ToDo
test('Double Click to edit a ToDo', async ({page}) => {
    
    // Adding a New ToDo
    const newTodo = new CreateTodo(page)
    await newTodo.todo()

    // Double clicking on the active ToDo which is to be edited
    await page.locator('[data-testid ="todo-title"]').dblclick()
    
    // Editing the ToDo
    await page.locator('[class="edit"]').fill('Go for a jog')
    await page.locator('[class="edit"]').press('Enter')

    // Verifying if the new ToDo is updated 
    await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Go for a jog')
})



// Filtering a Todo
test('Filter - All', async ({page}) => {

    // Adding a New ToDo
    const newTodo = new CreateTodo(page)
    await newTodo.todo()

    // Making a click on the filter "All" icon
    await page.locator(':text-is("All")').click()

    // Verifying if the filter "All" icon is selected and the Todo appears on the list
    await expect(page.locator(':text-is("All")')).toHaveClass(/selected/)
    await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Buy fruits')
})



test('Filter - Active', async ({page}) => {

    // Adding a New ToDo
    const newTodo = new CreateTodo(page)
    await newTodo.todo()

    // Making a click on the filter "Active" icon
    await page.locator(':text-is("Active")').click()

    // Verifying if the filter "Active" icon is clicked and the active Todo appears on the list
    await expect(page.locator(':text-is("Active")')).toHaveClass(/selected/)
    await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Buy fruits')
})



test('Filter - Completed', async ({page}) => {

    // Adding a New ToDo
    const newTodo = new CreateTodo(page)
    await newTodo.todo()

    // Navigating to toggle button and making a check on it
    await page.locator('[class="toggle"]').check()

    // Making a click on the filter "Completed" icon
    await page.locator(':text-is("Completed")').click()

    // Verifying if the filter "Completed" icon is clicked and the completed Todo appears on the list
    await expect(page.locator(':text-is("Completed")')).toHaveClass(/selected/)
    await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(1)
})



// Negative test
test('Adding an empty task', async({page}) => {

    // Adding a New ToDo
    await page.locator('//input[@class="new-todo"]').click()
    await page.locator('//input[@class="new-todo"]').fill('')
    await page.locator('//input[@class="new-todo"]').press('Enter')
        
    // Verifying no todo is added
    await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(0)
})



// Screenshot on failure
test('Screenshot of a failed test', async ({page}) => {

try{
    // Add a ToDo item
    await page.locator('//input[@class="new-todo"]').click();
    await page.locator('//input[@class="new-todo"]').fill('Clean the room');
    await page.locator('//input[@class="new-todo"]').press('Enter');

    // Intentionally failing the assertion
    await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Water the plants')
}   
catch{
    // Screenshot of the page
    await page.screenshot({ path: 'screenshots/full-page.png', fullPage: true })
}    
})

