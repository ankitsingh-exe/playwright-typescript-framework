import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.spec";
import { TestConfig } from "../test.config";

let loginPage: LoginPage;

test.beforeEach("Launch URL before each test", async ({page}) => {
    await page.goto(new TestConfig().appUrl);
    loginPage = new LoginPage(page);
});

test("login with valid credentials @master @sanity @regression", async () => {
    await loginPage.performLogin(new TestConfig().email, new TestConfig().password);
    expect(loginPage.isLoginSuccessful()).toBeTruthy();
});

test("login with in-valid credentials @master @sanity", async ({page}) => {
    await Promise.all([
        page.waitForEvent('dialog').then(dialog => {
            expect(dialog.message()).toBe('User does not exist.');
            dialog.accept();
        }),
        await loginPage.performLogin(new TestConfig().invalidEmail, new TestConfig().invalidPassword)        
    ]);
});


test.afterEach("Reset URL after each test", async ({page}) => {
    await page.waitForTimeout(2000);
    await page.close();
});


