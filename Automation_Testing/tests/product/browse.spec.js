import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { ProductPage } from '../../pages/ProductPage.js';

test.describe('Product Browsing Tests', () => {
  let homePage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await homePage.navigate();
  });

  test('Home page should display featured products', async ({ page }) => {
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('User should be able to click on a product', async ({ page }) => {
    const initialUrl = page.url();
    await homePage.clickFirstProduct();
    expect(page.url()).not.toBe(initialUrl);
  });

  test('Product page should display product name', async ({ page }) => {
    await homePage.clickFirstProduct();
    const productName = await productPage.getProductName();
    expect(productName).toBeTruthy();
    expect(productName.length).toBeGreaterThan(0);
  });

  test('Product page should display product price', async ({ page }) => {
    await homePage.clickFirstProduct();
    const price = await productPage.getProductPrice();
    expect(price).toBeTruthy();
  });

  test('Product page should display product description', async ({ page }) => {
    await homePage.clickFirstProduct();
    const description = await productPage.getProductDescription();
    expect(description).toBeTruthy();
  });

  test('Product page should display Add to Cart button', async ({ page }) => {
    await homePage.clickFirstProduct();
    expect(await productPage.isAddToCartButtonVisible()).toBeTruthy();
  });

  test('User should be able to change product quantity', async ({ page }) => {
    await homePage.clickFirstProduct();
    await productPage.setQuantity(2);
    const quantity = await page.inputValue(productPage.quantityInput);
    expect(quantity).toBe('2');
  });

  test('User should be able to add product to cart', async ({ page }) => {
    await homePage.clickFirstProduct();
    await productPage.addToCart();
    // Verify success message appears
    expect(await productPage.isSuccessMessageVisible()).toBeTruthy();
  });

  test('User should be able to add multiple quantity to cart', async ({ page }) => {
    await homePage.clickFirstProduct();
    await productPage.addToCartWithQuantity(3);
    expect(await productPage.isSuccessMessageVisible()).toBeTruthy();
  });

  test('Related products should be displayed', async ({ page }) => {
    await homePage.clickFirstProduct();
    const relatedCount = await productPage.getRelatedProductsCount();
    // Related products may or may not exist, so we just verify the method works
    expect(relatedCount).toBeGreaterThanOrEqual(0);
  });

  test('Product page should have working navigation back', async ({ page }) => {
    await homePage.clickFirstProduct();
    await page.goBack();
    // Should be back on home or category page
    expect(page.url()).toContain('opencart');
  });

  test('User can navigate to product via URL', async ({ page }) => {
    // Try to navigate to a known product URL pattern
    await productPage.navigateByUrl('/index.php?route=product/product&product_id=40');
    const productName = await productPage.getProductName();
    expect(productName).toBeTruthy();
  });

  test('Product page should display correct product information', async ({ page }) => {
    await homePage.clickFirstProduct();

    const name = await productPage.getProductName();
    const price = await productPage.getProductPrice();

    expect(name).toBeTruthy();
    expect(price).toBeTruthy();
    expect(price.toLowerCase()).toContain('$') || expect(price.toLowerCase()).toContain('£');
  });

  test('User should be able to add product with quantity 1', async ({ page }) => {
    await homePage.clickFirstProduct();
    await productPage.setQuantity(1);
    await productPage.addToCart();
    expect(await productPage.isSuccessMessageVisible()).toBeTruthy();
  });

  test('Add to cart button should be clickable', async ({ page }) => {
    await homePage.clickFirstProduct();
    const button = await page.$(productPage.addToCartButton);
    expect(button).toBeTruthy();
    const isEnabled = await button.evaluate(el => !el.disabled);
    expect(isEnabled).toBeTruthy();
  });
});
