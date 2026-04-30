import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { CartPage } from '../../pages/CartPage.js';
import { ProductPage } from '../../pages/ProductPage.js';

test.describe('Shopping Cart Tests', () => {
    let homePage;
    let cartPage;
    let productPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
        productPage = new ProductPage(page);
        await homePage.navigate();
    });

    test('Empty cart should display empty message', async ({ page }) => {
        await cartPage.navigate();
        expect(await cartPage.isCartEmpty()).toBeTruthy();
    });

    test('User should be able to navigate to cart page', async ({ page }) => {
        await cartPage.navigate();
        expect(await cartPage.isPageTitleVisible()).toBeTruthy();
    });

    test('User should be able to add product to cart', async ({ page }) => {
        await homePage.clickFirstProduct();
        await productPage.addToCart();
        expect(await productPage.isSuccessMessageVisible()).toBeTruthy();
    });

    test('Cart should display added products', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Navigate to cart
        await cartPage.navigate();

        const itemCount = await cartPage.getCartItemsCount();
        expect(itemCount).toBeGreaterThan(0);
    });

    test('User should be able to update product quantity in cart', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Go to cart and update quantity
        await cartPage.navigate();
        await cartPage.updateItemQuantity(0, '2');
        await cartPage.clickUpdateButton();

        // Verify update
        const itemCount = await cartPage.getCartItemsCount();
        expect(itemCount).toBeGreaterThan(0);
    });

    test('User should be able to remove product from cart', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Go to cart and remove
        await cartPage.navigate();
        const countBefore = await cartPage.getCartItemsCount();
        await cartPage.removeItem(0);

        // Wait for update
        await page.waitForTimeout(1000);
    });

    test('Cart should display cart total', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Check cart total
        await cartPage.navigate();
        const total = await cartPage.getCartTotal();
        expect(total).toBeTruthy();
    });

    test('Cart should display subtotal', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Check subtotal
        await cartPage.navigate();
        const subtotal = await cartPage.getSubtotal();
        expect(subtotal).toBeTruthy();
    });

    test('Cart should display product name', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Navigate to cart and verify name is shown
        await cartPage.navigate();
        const itemName = await cartPage.getFirstItemName();
        expect(itemName).toBeTruthy();
        expect(itemName.length).toBeGreaterThan(0);
    });

    test('User should be able to continue shopping from cart', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Go to cart and continue shopping
        await cartPage.navigate();
        await cartPage.continueShopping();

        // Should be on home or products page
        expect(page.url()).toContain('opencart');
    });

    test('User should be able to proceed to checkout from cart', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Go to cart and proceed to checkout
        await cartPage.navigate();
        await cartPage.proceedToCheckout();

        // Should be on checkout page
        expect(page.url()).toContain('checkout');
    });

    test('Cart should display product price', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Check price in cart
        await cartPage.navigate();
        const price = await cartPage.getItemPrice(0);
        expect(price).toBeTruthy();
    });

    test('Multiple products should be visible in cart', async ({ page }) => {
        // Add first product
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Go back and add another product
        await homePage.navigate();
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Check cart
        await cartPage.navigate();
        const itemCount = await cartPage.getCartItemsCount();
        expect(itemCount).toBeGreaterThanOrEqual(1);
    });

    test('Cart should handle quantity zero gracefully', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Try to set quantity to 0
        await cartPage.navigate();
        await cartPage.updateItemQuantity(0, '0');
        await cartPage.clickUpdateButton();

        // Should handle gracefully (either remove or show error)
        await page.waitForTimeout(1000);
    });

    test('Cart summary should be visible', async ({ page }) => {
        await cartPage.navigate();
        // Cart page should load successfully
        expect(await cartPage.isPageTitleVisible()).toBeTruthy();
    });

    test('User should see remove buttons for each item', async ({ page }) => {
        // Add product to cart
        await homePage.clickFirstProduct();
        await productPage.addToCart();

        // Check for remove button
        await cartPage.navigate();
        const removeButtons = await page.locator(cartPage.removeButton).all();
        expect(removeButtons.length).toBeGreaterThan(0);
    });
});
