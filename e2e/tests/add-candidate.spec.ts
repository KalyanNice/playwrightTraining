import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import CONSTANTS from "../utils/constants.json";
import { AddCandidate } from '../pages/add-candidate.page';
import { Utils } from '../utils/commons';


let addCandidatePage: AddCandidate;
let loginPage: LoginPage;
let utils: Utils;
let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    
    loginPage = new LoginPage(page);
    utils = new Utils(page);
    await loginPage.gotoBaseUrl();
    await expect(page).toHaveURL(/login/);
    loginPage.login();

    addCandidatePage = new AddCandidate(page);
    
});

test.afterAll(async () => {
    await page.close();
});

test.describe('addCandiate page', () => {
    test('goto addCandidate Page', async () => {
        await expect(page).toHaveURL(/dashboard\/index/);
        await addCandidatePage.gotoAddCandidatePage();
        await expect(page).toHaveURL(/recruitment\/addCandidate/);
    });

    test('fill and submit the addCandidate page form', async () => {
        await addCandidatePage.fillAddCandidatePageForm();
        console.log("toastloc",addCandidatePage.successMessageSelector);
        
        expect(await utils.getTextContent(addCandidatePage.successMessageSelector)).toBe(CONSTANTS.success);
    });
});