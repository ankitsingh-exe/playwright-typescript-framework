import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { TestConfig } from "../test.config";
import { CartPage } from "../pages/CartPage";
import { DialogHandler } from "./DialogHandlerUtils";
import { CartProduct } from "../model/cartProduct";

let loginPage: LoginPage;
let homePage: HomePage;
let productPage: ProductPage;
let cartPage: CartPage;
let dialogHandler: DialogHandler;
let productToAdd = ['Samsung galaxy s6', 'Nexus 6'];

test.beforeEach("Launch URL before each test", async ({ page }) => {
    await page.goto(new TestConfig().appUrl);
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await loginPage.performLogin(new TestConfig().email, new TestConfig().password);
    await loginPage.isLoginSuccessful();
});


async function addProductToCart(productArray: string[]): Promise<CartProduct[]> {

    let addedProducts: CartProduct[] = [];
    dialogHandler = new DialogHandler(productPage.page);

    for (const product of productArray) {
        let productPriceDetails = await productPage.clickProductAndGetDetails(product);
        let productDetails = await dialogHandler.handleDialogFor(
            () => productPage.clickAddToCart(),
            { accept: true }
        );
        addedProducts.push(productPriceDetails);
        await homePage.navigateToHomePage();
    }

    return addedProducts
}


test("Add Product to Cart and verify added details are same @productAdd", async () => {
    let addedProducts: CartProduct[] = [];
    let actualProducts: CartProduct[] = [];

    await test.step("Add product to cart", async () => {
        await homePage.navigateToHomePage();
        await homePage.navigateToPhonesPage();

        addedProducts = await addProductToCart(productToAdd);
    });


    await test.step("Verify products in cart is same as what was added", async () => {
        actualProducts = await cartPage.getCartProducts();
        actualProducts.forEach(product => {
            console.log(`Actual product: ${product.product} with price ${product.price}`);
        });

        expect.soft(addedProducts.length).toBe(productToAdd.length);
        expect.soft(addedProducts).toEqual(expect.arrayContaining(actualProducts));
        expect.soft(actualProducts).toEqual(expect.arrayContaining(addedProducts));
    });

    await test.step("Verify the total price is correct on Cart page", async () => {
        const sum: number = 0;
        const expectedTotal = addedProducts.reduce((acc, product) => acc + product.price, 0);
        expect.soft(await cartPage.getDisplayedTotal()).toBe(expectedTotal);
    });

});

test.afterEach("Reset URL after each test", async ({ page }) => {
    await page.close();
});


