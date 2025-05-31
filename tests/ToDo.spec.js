import {test, expect} from '@playwright/test'

import {CreateTodo} from '../pageObjects/CreateTodo'



// Navigating to the application


test.beforeEach(async({page}) => {
    try{
    await page.goto('https://demo.playwright.dev/todomvc')
    }
    catch(error){
        console.error(error)
        throw new Error("Something went wrong!")
    }
})



// Adding a new ToDo
test('Add a Todo', async ({page}) => {

    try{
        // Adding a New ToDo
        const newTodo = new CreateTodo(page)
        await newTodo.todo()

        // This is to be printed if the task is successful
        console.log('Success')
    }
        // This is to be printed if the task fails
        catch (error) {
            console.log('Something went wrong')
    }
        // Verifying if the added ToDo appears on the list
        await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Buy fruits')
        await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(1)
})



// Marking a Todo as Completed
test('Mark a ToDo as completed', async ({page}) => {

    try{
        // Adding a New ToDo
        const newTodo = new CreateTodo(page)
        await newTodo.todo()

        // Navigating to toggle button and applying a check on it
        await page.locator('[class="toggle"]').check()

        // This is to be printed if the task is successful
            console.log('Success')
    }
        // This is to be printed if the task fails
        catch (error) {
            console.log('Something went wrong')
    }
        // Verifying if the checked ToDo is marked as completed
        await expect(page.locator('[data-testid="todo-item"]')).toHaveClass(/completed/)
        await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1)
})



// Deleting a ToDo
test('Delete a ToDo', async ({page}) => {

    try{
        // Adding a New ToDo
        const newTodo = new CreateTodo(page)
        await newTodo.todo()

        // Hovering over the active ToDo and making a click on the delete button 
        await page.locator('[data-testid="todo-title"]').hover()
        await page.locator('[aria-label="Delete"]').click()

        // This is to be printed if the task is successful
        console.log('Success!')
    }
        // This is to be printed if the task fails
        catch (error) {
            console.log('Something went wrong')
    }
        // Verifying if the deleted ToDo is gone
        await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(0)
})



// Editing a ToDo
test('Double Click to edit a ToDo', async ({page}) => {
    
    try{
        // Adding a New ToDo
        const newTodo = new CreateTodo(page)
        await newTodo.todo()

        // Double clicking on the active ToDo which is to be edited
        await page.locator('[data-testid ="todo-title"]').dblclick()
    
        // Editing the ToDo
        await page.locator('[class="edit"]').fill('Water the plants')
        await page.locator('[class="edit"]').press('Enter')

        // This is to be printed if the task is successful
        console.log('Success!')
    }
        // This is to be printed if the task fails
        catch(error){
            console.log('Something went wrong!')
    }
        // Verifying if the new ToDo is updated 
        await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Water the plants')
})



// Filtering a Todo
test('Filter - All', async ({page}) => {

    try{
        // Adding a New ToDo
        const newTodo = new CreateTodo(page)
        await newTodo.todo()

        // Making a click on the filter "All" icon
        await page.locator(':text-is("All")').click()

        // This is to be printed if the task is successful
        console.log('Success!')
    }
        // This is to be printed if the task fails
        catch(error){
            console.log('Something went wrong!')
    }
        // Verifying if the filter "All" icon is selected and the Todo appears on the list
        await expect(page.locator(':text-is("All")')).toHaveClass(/selected/)
        await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Buy fruits')
})



test('Filter - Active', async ({page}) => {

    try{
        // Adding a New ToDo
        const newTodo = new CreateTodo(page)
        await newTodo.todo()

        // Making a click on the filter "Active" icon
        await page.locator(':text-is("Active")').click()

        // This is to be printed if the task is successful
        console.log('Success!')
    }
        // This is to be printed if the task fails
        catch(error){
            console.log('Something went wrong!')
    }
        // Verifying if the filter "Active" icon is clicked and the active Todo appears on the list
        await expect(page.locator(':text-is("Active")')).toHaveClass(/selected/)
        await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Buy fruits')
})



test('Filter - Completed', async ({page}) => {

    try{
        // Adding a New ToDo
        const newTodo = new CreateTodo(page)
        await newTodo.todo()

        // Navigating to toggle button and making a check on it
        await page.locator('[class="toggle"]').check()

        // Making a click on the filter "Completed" icon
        await page.locator(':text-is("Completed")').click()

        // This is to be printed if the task is successful
        console.log('Success!')
    }   
        // This is to be printed if the task fails
        catch(error){
            console.log('Something went wrong!')
    }   
        // Verifying if the filter "Completed" icon is clicked and the completed Todo appears on the list
        await expect(page.locator(':text-is("Completed")')).toHaveClass(/selected/)
        await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(1)
})



// Negative test
test('Adding an empty task', async({page}) => {

    try{
        // Adding a New ToDo
        await page.locator('//input[@class="new-todo"]').click()
        await page.locator('//input[@class="new-todo"]').fill('')
        await page.locator('//input[@class="new-todo"]').press('Enter')
        
        // This is to be printed if the task is successful
        console.log('Success!')
    }
        // This is to be printed if the task fails
        catch(error){
            console.log('Something went wrong!')
    }
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

        // This is to be printed if the task is successful
        console.log('Success')
        
        // Intentionally failing the assertion
        await expect(page.locator('[data-testid="todo-title"]')).toHaveText('Buy fruits')
    }
        // This is to be printed if the task fails
        catch (error) {
            console.log('Something went wrong')
    
        // Screenshot of the page
        await page.screenshot({ path: 'screenshots/full-page.png', fullPage: true })
    }
})

