import {Page, Locator, errors} from '@playwright/test';
import { HomePage } from "./HomePage";
import { CartProduct } from '../model/cartProduct';

export class ProductPage {

    readonly page: Page;
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

    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    async clickProductAndGetDetails(product : string) : Promise<CartProduct> {            
        await this.getProduct(product).click();
        const priceText = await this.priceHeading.textContent();
        const price = priceText ? parseInt(priceText.replace('$', '')) : 0;
        return {product, price};
    }

    async AddProductToCart() {                
        await this.clickAddToCart();
    }

    async isHomePageDisplayed() {
        return await this.page.title();
    }
}