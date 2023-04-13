import { Page } from "@playwright/test";

export class Utils {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoBaseUrl() {
        await this.page.goto('/');
    }

    async closePage() {
        await this.page.close();
    }

    async check(selector: string) {
        await this.page.check(selector);
    }

    async fillValue(selector: string, value: string) {
        await this.page.fill(selector, value)
    }

    async getTextContent(selector: string) {
        return await this.page.textContent(selector);
    }

    async isVisible(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isVisible();
    }

    async performClick(selector: string) {
        await this.page.click(selector);
    }
}