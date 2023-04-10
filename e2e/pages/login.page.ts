import { Page } from '@playwright/test';

export class LoginPage {
    // static DEFAULT_TIMEOUT = 2_000;

    loginUrl = 'auth/login';

    loginHeading = '.orangehrm-login-container h5';
    usernameField = 'input[name="username"]';
    passwordField = 'input[name="password"]';
    loginButton = 'button[type="submit"]';


    constructor(private page: Page) { }

    async gotoBaseUrl() {
        await this.page.goto('/');
    }

    async close() {
        await this.page.close();
    }
    async fillValue(selector: string, value: string) {
        await this.page.locator(selector).fill(value);
    }

    async getTextContent(selector: string) {
        return await this.page.textContent(selector);
    }

    async isVisible(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isVisible();
    }

    async performClick(selector: string): Promise<void> {
        return await this.page.locator(selector).click();
    }
}
