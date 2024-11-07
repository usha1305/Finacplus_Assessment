import { test, expect} from '@playwright/test'
import { LoginPage } from '../pages/loginpage'
import { ProductsPage } from '../pages/productPage'
import { CartPage } from '../pages/cartPage'
import { USERNAME } from '../utils/credentials'

test.describe('Add to Cart', ()=>
{
    let loginpage : LoginPage;
    let productPage : ProductsPage;
    let cartPage : CartPage;
    

    test.beforeEach(async ({ page })=>{
        loginpage =  new LoginPage(page);
        productPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        await loginpage.navigate();
        await loginpage.login(USERNAME);
 
    });

    test('Add Product to Cart & Verify it', async({page})=>{
        await productPage.verifyOnProductsPage();

        const { name: expectedProductName } = await productPage.getFirstProductDetails()

        await productPage.addFirstProductToCart()

        await cartPage.navigateToCart()
        await cartPage.verifyProductInCart(expectedProductName);

        await cartPage.logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});