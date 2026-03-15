import {test, expect} from "../fixtures/baseTest";
import { TestConfig } from "../test.config";
import { env } from "../config/env";

test.beforeEach("Launch URL before each test", async ({page}) => {
    await page.goto(env.baseURL);
});

test("login with valid credentials @master @sanity @regression", async ({loginPage}) => {
    await loginPage.performLogin(env.username, env.password);
    expect(loginPage.isLoginSuccessful()).toBeTruthy();
});

test("login with in-valid credentials @master @sanity", async ({page, loginPage}) => {
    await Promise.all([
        page.waitForEvent('dialog').then(dialog => {
            expect(dialog.message()).toBe('User does not exist.');
            dialog.accept();
        }),
        await loginPage.performLogin(env.invalidUsername, env.invalidPassword)        
    ]);
});


test.afterEach("Reset URL after each test", async ({page}) => {
    await page.waitForTimeout(2000);
    await page.close();
});


