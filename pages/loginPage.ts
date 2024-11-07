import { Page } from '@playwright/test';
import { PASSWORD } from '../utils/credentials';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string) {
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', PASSWORD);
        await this.page.click('#login-button');
    }

    async isLoginErrorDisplayed() {
        return this.page.isVisible('.error-message-container');
    }
}
