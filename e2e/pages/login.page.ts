import { Page } from '@playwright/test';
import CONSTANTS from "../utils/constants.json";
import { Utils } from '../utils/commons';

export class LoginPage {
    // static DEFAULT_TIMEOUT = 2_000;

    loginUrl = 'auth/login';

    loginHeading = '.orangehrm-login-container h5';
    usernameField = 'input[name="username"]';
    passwordField = 'input[name="password"]';
    loginButton = 'button[type="submit"]';

    utils: Utils;

    constructor(private page: Page) { 
        this.utils = new Utils(page);
    }

    async gotoBaseUrl() {
        await this.page.goto('/');
    }

    async getTextContent(selector: string) {
        return await this.utils.getTextContent(selector);
    }

    async login() {
        await this.utils.fillValue(this.usernameField, CONSTANTS.credentials.username);
        await this.utils.fillValue(this.passwordField, CONSTANTS.credentials.password);
        await this.utils.performClick(this.loginButton);
    }
}
