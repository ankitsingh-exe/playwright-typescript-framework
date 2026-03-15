import {test, expect} from "../fixtures/baseTest";
import {env} from "../config/env";

test("Setup authentication", async ({page, loginPage}) => {

    await page.goto(env.baseURL);
    await loginPage.performLogin(env.username, env.password);
    expect(loginPage.isLoginSuccessful()).toBeTruthy();

    page.context().storageState(
        {path: "storage/auth.json"}
    );

})