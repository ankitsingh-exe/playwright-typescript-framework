import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";

import { test as base } from "@playwright/test";
import { DialogHandler } from "../utils/DialogHandlerUtils";


type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    cartPage: CartPage;
    dialogHandler: DialogHandler;
};

export const test = base.extend<MyFixtures>({

    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    productPage: async ({page}, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({page}, use) => {
        await use(new CartPage(page));
    },
    dialogHandler: async ({productPage}, use) => {
        await use(new DialogHandler(productPage.page));
    }
});

export { expect } from "@playwright/test";




