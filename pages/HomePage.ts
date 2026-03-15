import {Page, Locator, errors} from '@playwright/test';

export class HomePage {

    private readonly page: Page;
    private readonly homeLink: Locator;
    private readonly cartLink: Locator;
    private readonly contactLink: Locator;
    private readonly aboutUsLink: Locator;
    private readonly phonesLink: Locator;
    private readonly laptopsLink: Locator
    private readonly monitorsLink: Locator;
    private readonly samsungPhoneLink: Locator;
    private readonly macLaptopLink: Locator;
    private readonly appleMonitorLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.contactLink = page.getByRole('link', { name: 'Contact' });
        this.aboutUsLink = page.getByRole('link', { name: 'About us' });
        this.phonesLink = page.getByRole('link', { name: 'Phones' });
        this.laptopsLink = page.getByRole('link', { name: 'Laptops' });
        this.monitorsLink = page.getByRole('link', { name: 'Monitors' });
        this.samsungPhoneLink = page.getByRole('link', { name: 'Samsung galaxy s7' });
        this.macLaptopLink = page.getByRole('link', { name: 'MacBook Pro' });
        this.appleMonitorLink = page.getByRole('link', { name: 'Apple monitor' });
    }

    async isHomePageDisplayed() {
        return await this.page.title();
    }

    async navigateToHomePage() {
        try {
            await this.homeLink.click();
        } catch (error) {
            if (error instanceof errors.TimeoutError) {
                console.error(`Error clicking to ${this.homeLink}:`, error.message);
            }
            if (error instanceof Error) {
                throw error;
            }
        }
    }

    async navigateToCartPage() {
        await this.cartLink.click();
    }

    async navigateToContactPage() {
        await this.contactLink.click();
    }
    async navigateToAboutUsPage() {
        await this.aboutUsLink.click();
    }
    async navigateToPhonesPage() {
        await this.phonesLink.click();
    }
    async navigateToLaptopsPage() {
        await this.laptopsLink.click();
    }
    async navigateToMonitorsPage() {
        await this.monitorsLink.click();
    }


    

}