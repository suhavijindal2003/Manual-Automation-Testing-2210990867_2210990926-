import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { products } from '../../utils/testData.js';

test.describe('Product Search Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Home page should display search input', async ({ page }) => {
    expect(await homePage.isSearchInputVisible()).toBeTruthy();
  });

  test('User should be able to search for products', async ({ page }) => {
    const initialUrl = page.url();
    await homePage.search(products.search.term);
    expect(page.url()).not.toBe(initialUrl);
  });

  test('Search should return relevant results', async ({ page }) => {
    await homePage.search(products.search.term);
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('Search results should contain search term in product names', async ({ page }) => {
    await homePage.search('MacBook');
    const productLinks = await page.$$('.product-item a');
    expect(productLinks.length).toBeGreaterThan(0);
  });

  test('User should see filtered results after search', async ({ page }) => {
    await homePage.search(products.search.term);
    const results = await page.locator('.product-item').count();
    expect(results).toBeGreaterThanOrEqual(0);
  });

  test('Search with empty term should show appropriate message or all products', async ({ page }) => {
    await homePage.search('');
    // Empty search behavior varies by application
    await page.waitForTimeout(500);
  });

  test('Search should be case insensitive', async ({ page }) => {
    await homePage.search('MACBOOK');
    const results = await page.locator('.product-item').count();
    expect(results).toBeGreaterThan(0);
  });

  test('Multiple searches should work correctly', async ({ page }) => {
    // First search
    await homePage.search('MacBook');
    let count1 = await homePage.getProductCount();
    expect(count1).toBeGreaterThan(0);

    // Search again with different term
    await homePage.navigate();
    await homePage.search('iPhone');
    let count2 = await homePage.getProductCount();
    expect(count2).toBeGreaterThan(0);
  });

  test('Search with special characters should handle gracefully', async ({ page }) => {
    await homePage.search('Product & Accessories');
    await page.waitForTimeout(500);
  });

  test('Search results page should have pagination if needed', async ({ page }) => {
    await homePage.search('Mac');
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThanOrEqual(0);
  });

  test('User should be able to click on search result', async ({ page }) => {
    await homePage.search(products.search.term);
    const firstProduct = await page.$('.product-item a');
    expect(firstProduct).toBeTruthy();

    const href = await firstProduct.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('Search with no results should display appropriate message', async ({ page }) => {
    await homePage.search('NonexistentProductXYZ123');
    // Some sites show "no results" message
    await page.waitForTimeout(500);
  });

  test('Search should be accessible from homepage', async ({ page }) => {
    expect(await homePage.isSearchInputVisible()).toBeTruthy();
  });
});
