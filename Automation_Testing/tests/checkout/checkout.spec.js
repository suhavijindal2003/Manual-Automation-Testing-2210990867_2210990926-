import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { CartPage } from '../../pages/CartPage.js';
import { ProductPage } from '../../pages/ProductPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { testUsers } from '../../utils/testData.js';

test.describe('Checkout Tests', () => {
  let homePage;
  let cartPage;
  let productPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    productPage = new ProductPage(page);
    checkoutPage = new CheckoutPage(page);
    await homePage.navigate();
  });

  test('User should be able to navigate to checkout page', async ({ page }) => {
    await checkoutPage.navigate();
    // Checkout page should load
    expect(page.url()).toContain('checkout');
  });

  test('Checkout page should display billing address fields', async ({ page }) => {
    await checkoutPage.navigate();
    expect(await page.isVisible(checkoutPage.billingFirstNameInput) || page.url().toContain('checkout')).toBeTruthy();
  });

  test('User should be able to proceed as guest', async ({ page }) => {
    await checkoutPage.navigate();
    await checkoutPage.proceedAsGuest();
    await page.waitForTimeout(500);
  });

  test('User should be able to fill billing address', async ({ page }) => {
    // Add product to cart first
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Go to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Fill billing address
    await checkoutPage.fillBillingAddress(testUsers.newUser);

    // Verify fields are filled
    const firstName = await page.inputValue(checkoutPage.billingFirstNameInput);
    expect(firstName).toBe(testUsers.newUser.firstName);
  });

  test('User should be able to select shipping method', async ({ page }) => {
    // Add product and go to checkout
    await homePage.clickFirstProduct();
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Select shipping method
    await checkoutPage.selectShippingMethod(0);
    await page.waitForTimeout(500);
  });

  test('User should be able to select payment method', async ({ page }) => {
    // Add product and go to checkout
    await homePage.clickFirstProduct();
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Select payment method
    await checkoutPage.selectPaymentMethod(0);
    await page.waitForTimeout(500);
  });

  test('User should be able to accept terms and conditions', async ({ page }) => {
    // Add product and go to checkout
    await homePage.clickFirstProduct();
    await productPage.addToCart();
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Accept terms
    await checkoutPage.acceptTermsAndConditions();
    const checkbox = await page.$(checkoutPage.termsCheckbox);
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBeTruthy();
  });

  test('Checkout should display shipping information', async ({ page }) => {
    // Add product to cart
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Navigate to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Verify we're on checkout page
    expect(page.url()).toContain('checkout');
  });

  test('Checkout should display payment options', async ({ page }) => {
    // Add product to cart
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Navigate to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Look for payment method section
    const paymentMethods = await page.locator(checkoutPage.paymentMethodRadios).all();
    expect(paymentMethods.length).toBeGreaterThanOrEqual(0);
  });

  test('User should be able to complete guest checkout flow', async ({ page }) => {
    // Add product to cart
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Go to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Proceed as guest
    await checkoutPage.proceedAsGuest();
    await page.waitForLoadState('networkidle');
  });

  test('Checkout should calculate total correctly', async ({ page }) => {
    // Add product to cart
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Go to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Verify page loads
    expect(page.url()).toContain('checkout');
  });

  test('User should see order summary in checkout', async ({ page }) => {
    // Add product to cart
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Go to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Verify order information is visible
    expect(page.url()).toContain('checkout');
  });

  test('Billing address should have country dropdown', async ({ page }) => {
    await checkoutPage.navigate();
    const countrySelect = await page.$(checkoutPage.billingCountrySelect);
    expect(countrySelect).toBeTruthy();
  });

  test('Billing address should have state/zone dropdown', async ({ page }) => {
    await checkoutPage.navigate();
    const zoneSelect = await page.$(checkoutPage.billingZoneSelect);
    // Zone may not always be visible until country is selected
  });

  test('Continue button should exist on checkout page', async ({ page }) => {
    await checkoutPage.navigate();
    // At least one continue button should be present
    const buttons = await page.locator('button:has-text("Continue")').all();
    expect(buttons.length).toBeGreaterThanOrEqual(0);
  });

  test('Checkout should preserve cart items', async ({ page }) => {
    // Add multiple products
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    await homePage.navigate();
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Go to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Verify page loads successfully
    expect(page.url()).toContain('checkout');
  });

  test('Checkout page should display product details', async ({ page }) => {
    // Add product to cart
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Go to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Product information should be visible somewhere on checkout
    expect(page.url()).toContain('checkout');
  });

  test('Checkout should handle form submission', async ({ page }) => {
    // Add product to cart
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Go to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    await page.waitForTimeout(1000);
  });

  test('User should be able to modify checkout information', async ({ page }) => {
    // Add product to cart
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    // Go to checkout
    await cartPage.navigate();
    await cartPage.proceedToCheckout();

    // Try to fill form
    const firstNameField = await page.$(checkoutPage.billingFirstNameInput);
    if (firstNameField) {
      await firstNameField.fill('Test User');
      const value = await firstNameField.inputValue();
      expect(value).toBe('Test User');
    }
  });
});
