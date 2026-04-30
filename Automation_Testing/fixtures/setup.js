import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { testUsers } from '../utils/testData.js';

/**
 * Custom test fixture that provides page objects
 * Usage: test('my test', async ({ homePage, loginPage, page }) => { ... })
 */
export const test = base.extend({
    /**
     * HomePage fixture
     * Provides HomePage page object with pre-initialized page
     */
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
        // Cleanup after test (optional)
    },

    /**
     * LoginPage fixture
     * Provides LoginPage page object
     */
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    /**
     * RegisterPage fixture
     * Provides RegisterPage page object
     */
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    /**
     * ProductPage fixture
     * Provides ProductPage page object
     */
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    /**
     * CartPage fixture
     * Provides CartPage page object
     */
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    /**
     * CheckoutPage fixture
     * Provides CheckoutPage page object
     */
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    /**
     * authenticatedPage fixture
     * Logs in a user and provides page with active session
     * Usage: test('protected page test', async ({ authenticatedPage }) => { ... })
     */
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testUsers.validLogin.email, testUsers.validLogin.password);
        await use(page);
    },

    /**
     * cartWithProduct fixture
     * Adds a product to cart before test
     * Usage: test('checkout test', async ({ cartWithProduct }) => { ... })
     */
    cartWithProduct: async ({ page }, use) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        // Navigate and add product to cart
        await homePage.navigate();
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Provide cart page with product already in it
        await use(cartPage);

        // Optional: Cleanup - clear cart after test
        // (Commented out as it might be tested)
    },

    /**
     * homepageWithSearch fixture
     * Navigates to homepage (pre-loaded)
     */
    homepageWithSearch: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await use(homePage);
    },

    /**
     * allPageObjects fixture
     * Provides all page objects in one fixture
     * Usage: test('e2e flow', async ({ allPageObjects }) => {
     *   const { homePage, loginPage, cartPage } = allPageObjects;
     * })
     */
    allPageObjects: async ({ page }, use) => {
        const pageObjects = {
            homePage: new HomePage(page),
            loginPage: new LoginPage(page),
            registerPage: new RegisterPage(page),
            productPage: new ProductPage(page),
            cartPage: new CartPage(page),
            checkoutPage: new CheckoutPage(page),
        };
        await use(pageObjects);
    },
});

/**
 * Export expect from @playwright/test
 * Allows using: import { test, expect } from '../fixtures/setup.js'
 */
export { expect } from '@playwright/test';

/**
 * HOW TO USE FIXTURES:
 *
 * Instead of:
 * import { test } from '@playwright/test';
 * import { HomePage } from '../pages/HomePage.js';
 *
 * test('example', async ({ page }) => {
 *   const homePage = new HomePage(page);
 *   await homePage.navigate();
 * });
 *
 *
 * Use this:
 * import { test, expect } from '../fixtures/setup.js';
 *
 * test('example', async ({ homePage }) => {
 *   await homePage.navigate();
 * });
 *
 *
 * EXAMPLES:
 *
 * // Using single fixture
 * test('browse products', async ({ homePage }) => {
 *   await homePage.navigate();
 *   const count = await homePage.getProductCount();
 *   expect(count).toBeGreaterThan(0);
 * });
 *
 * // Using multiple fixtures
 * test('add to cart', async ({ homePage, productPage, cartPage }) => {
 *   await homePage.navigate();
 *   await homePage.clickFirstProduct();
 *   await productPage.addToCart();
 *   await cartPage.navigate();
 *   const items = await cartPage.getCartItemsCount();
 *   expect(items).toBeGreaterThan(0);
 * });
 *
 * // Using all page objects fixture
 * test('e2e checkout', async ({ allPageObjects }) => {
 *   const { homePage, cartPage, checkoutPage } = allPageObjects;
 *   await homePage.navigate();
 *   // ... test logic
 * });
 *
 * // Using cart with product pre-loaded
 * test('checkout flow', async ({ cartWithProduct }) => {
 *   await cartWithProduct.proceedToCheckout();
 *   // ... rest of checkout
 * });
 *
 * // Using authenticated user
 * test('user dashboard', async ({ authenticatedPage }) => {
 *   await authenticatedPage.goto('/account/account');
 *   // Page is already logged in
 * });
 */
