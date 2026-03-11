import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.spec";
import { HomePage } from "../pages/HomePage.spec";
import { ProductPage } from "../pages/ProductPage.spec";
import { TestConfig } from "../test.config";

let loginPage: LoginPage;
let homePage: HomePage;
let productPage: ProductPage;
let productToAdd = ['Samsung galaxy s6', 'Nexus 6'];

test.beforeEach("Launch URL before each test", async ({page}) => {
    await page.goto(new TestConfig().appUrl);
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
});

test("Add Product to Cart", async ({page}) => {
    await homePage.navigateToHomePage();
    await homePage.navigateToPhonesPage();

    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => { });
    });

      for (const product of productToAdd) {
        await productPage.clickProductAndAddToCart(product);
      }
      await homePage.navigateToCartPage();
});

test.afterEach("Reset URL after each test", async ({page}) => {
    await page.waitForTimeout(2000);
    await page.close();
});


