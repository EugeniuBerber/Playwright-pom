import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  console.log("Console log from test: " + process.env.PASSWORD);
  console.log("Console log from test, Printing the $SMTH values: " + process.env.SMTH);

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  console.log("Get Started Link - Test")
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.beforeAll('Executes before all tests', async ({})=>{
  console.log('% This will execute before all tests will start %');
})
test.afterAll('Executes after all tests', async ({})=>{
  console.log('% FINISH %');
})