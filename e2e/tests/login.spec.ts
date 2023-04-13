import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import CONSTANTS from "../utils/constants.json";


let loginPage: LoginPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.gotoBaseUrl();
    await expect(page).toHaveURL(/login/);
});

test.afterAll(async () => {
    await page.close();
});

test.describe('login page', () => {
    test('has login title', async () => {
        expect(await loginPage.getTextContent(loginPage.loginHeading)).toBe(CONSTANTS.login);
    });

    test('submit login form', async () => {
        await loginPage.login();
        await expect(page).toHaveURL(/dashboard\/index/);
    });
});