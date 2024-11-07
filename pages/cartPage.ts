import { Page } from '@playwright/test';

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCart() {
        await this.page.click('.shopping_cart_link');
        await this.page.waitForURL(/.*cart.html/);
    }

    async verifyProductInCart(expectedProductName: string) {
        const cartProductName = await this.page.locator('.inventory_item_name').first().textContent();
        if (cartProductName !== expectedProductName) {
            throw new Error(`Product in cart does not match. Expected: ${expectedProductName}, Found: ${cartProductName}`);
        }
    }

    async logout() {
        await this.page.click('#react-burger-menu-btn');  
        await this.page.click('#logout_sidebar_link');     
        await this.page.waitForURL('https://www.saucedemo.com/');
    }
}
