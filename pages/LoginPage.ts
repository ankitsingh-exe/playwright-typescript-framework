import {Page, Locator, errors} from '@playwright/test';

export class LoginPage {

    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly signUpLink: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly welcomeUsername: Locator;
    private readonly logoutLink: Locator;
    private readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.welcomeUsername = page.getByRole('link', { name: `Welcome singhank ` });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    }

    async isHomePageDisplayed() {
        return await this.page.title();
    }

    async navigateToLoginPage() {
        await this.loginLink.click();
    }
    async navigateToSignUpPage() {
        await this.signUpLink.click();
    }
    
    async enterUsername(username: string) {
        await this.usernameInput.click();
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.click();
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async performLogin(username: string, password: string) {
        await this.navigateToLoginPage();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async isLoginSuccessful(): Promise<boolean> {
        return this.welcomeUsername.isVisible().catch(() => false);
    }

    async performSignup(username: string, password: string) {
        await this.navigateToSignUpPage();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSignUpButton();
    }

}