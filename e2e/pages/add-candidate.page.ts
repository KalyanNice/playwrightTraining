import { Page } from '@playwright/test';
import CONSTANTS from "../utils/constants.json";
import { Utils } from '../utils/commons';

export class AddCandidate {
    utils: Utils;
    readonly page: Page;

    readonly recruitmentSelector = 'div.oxd-sidepanel-body > ul > li:nth-child(5) > a';
    readonly addButtonSelector = 'div.orangehrm-header-container > button';
    readonly firstNameField = '.--name-grouped-field input[name="firstName"]';
    readonly middleNameField = 'input[name="middleName"]';
    readonly lastNameField = 'input[name="lastName"]';
    readonly vacancySelectField = 'div.oxd-select-text-input';
    readonly emailField = '//form/div[3]/div/div[1]/div/div[2]/input';
    readonly contactField = '//form/div[3]/div/div[2]/div/div[2]/input';
    readonly inputFile = 'input[type="file"]';
    readonly dateField = 'input[placeholder="yyyy-mm-dd"]';
    readonly checkboxField = '.oxd-checkbox-input';
    readonly submitButton = 'button[type="submit"]';
    

    readonly successMessageSelector = '.oxd-text--toast-title';

    constructor(page: Page) {
        this.utils = new Utils(page);
        this.page = page;
    }

    async gotoAddCandidatePage() {
        await this.utils.performClick(this.recruitmentSelector);
        await this.utils.performClick(this.addButtonSelector);
    }

    async gotoBaseUrl() {
        await this.page.goto('/');
    }

    async fillAddCandidatePageForm() {
        await this.utils.fillValue(this.firstNameField, CONSTANTS.candidateDetails.firstName);
        await this.utils.fillValue(this.middleNameField, CONSTANTS.candidateDetails.middleName);
        await this.utils.fillValue(this.lastNameField, CONSTANTS.candidateDetails.lastName);
        await this.selecDropdownOption(this.vacancySelectField);
        await this.page.locator(this.inputFile).setInputFiles('sample.txt');
        await this.utils.fillValue(this.emailField, CONSTANTS.candidateDetails.email);
        await this.utils.fillValue(this.contactField, CONSTANTS.candidateDetails.contact);
        await this.utils.fillValue(this.dateField, CONSTANTS.candidateDetails.date);
        await this.utils.check(this.checkboxField);
        // await (await this.page.waitForSelector(this.submitButton)).waitForElementState("stable");
        await this.page.locator(this.submitButton).click({force:true});
    }

    async selecDropdownOption(locator: string) {
        await this.utils.performClick(locator);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    };

    async getTextContent(selector: string) {
        return await this.utils.getTextContent(selector);
    }
}
