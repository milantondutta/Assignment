export class CreateTodo {
 
    page
  
  constructor(page) {
    this.page = page
  }

  async todo() {
    await this.page.locator('//input[@class="new-todo"]').click()
    await this.page.locator('//input[@class="new-todo"]').fill("Buy fruits")
    await this.page.locator('[class="new-todo"]').press("Enter")
  }
}

