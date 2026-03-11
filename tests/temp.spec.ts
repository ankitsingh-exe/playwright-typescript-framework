import {expect, test} from "@playwright/test"

test("demo", async ({page}) => {
    await page.goto("https://demo.opencart.com/");
    await page.getByRole('link', { name: 'Tablets' }).click();
    await expect(page).toHaveURL("https://demo.opencart.com/en-gb/catalog/tablet");
});

test.only('test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Home (current)' }).click();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginpassword').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByLabel('Log in').getByText('Close').click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.locator('div').filter({ hasText: 'Password:' }).nth(4).click();
  await page.locator('div').filter({ hasText: 'Username: Password:' }).nth(3).click();
  await page.getByLabel('Sign up').getByText('Close').click();
  await page.getByRole('link', { name: 'Phones' }).click();
  await page.getByRole('link', { name: 'Laptops' }).click();
  await page.getByRole('link', { name: 'Monitors' }).click();
});

