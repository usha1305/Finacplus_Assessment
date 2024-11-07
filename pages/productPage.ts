// src/pages/productsPage.ts
import { Page } from '@playwright/test';
import * as fs from 'fs';

export class ProductsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyOnProductsPage() {
        await this.page.waitForURL(/.*inventory.html/);
        await this.page.waitForSelector('.title', { state: 'visible' });
    }

    async getFirstProductDetails() {
        const name = (await this.page.locator('.inventory_item_name').first().textContent()) ?? "Unknown Product";
        const price = (await this.page.locator('.inventory_item_price').first().textContent()) ?? "0.00";

        const productDetails = `Product: ${name}\nPrice: ${price}`;
        fs.writeFileSync('product-details.txt', productDetails);

        return { name, price };
    }

    async addFirstProductToCart() {
        await this.page.locator('.btn_inventory').first().click();
    }
}

