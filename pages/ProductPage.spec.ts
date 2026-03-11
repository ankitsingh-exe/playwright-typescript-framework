import {Page, Locator, errors} from '@playwright/test';
import { HomePage } from "./HomePage.spec";

export class ProductPage {

    private readonly page: Page;
    private readonly priceHeading: Locator;
    private readonly addToCartButton: Locator;
    private readonly homePage: HomePage;

    constructor(page: Page) {
        this.page = page;
        this.priceHeading = page.locator('//h3[contains(text(), "$")]');
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
        this.homePage = new HomePage(page);
    }

    getProduct(productName : string) {
        return this.page.getByRole('link', { name: productName });
    }

    async clickProductAndAddToCart(productName : string) {
        await this.getProduct(productName).click();
        console.log(`price of product ${productName} is ${await this.priceHeading.textContent()}`);
        await this.addToCartButton.click();
        await this.page.waitForTimeout(5000);
        await this.homePage.navigateToHomePage();
    }

    async isHomePageDisplayed() {
        return await this.page.title();
    }
}