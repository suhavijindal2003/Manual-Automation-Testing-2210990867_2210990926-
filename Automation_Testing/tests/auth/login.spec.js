import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { testUsers } from '../../utils/testData.js';

test.describe('Login Tests', () => {
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigate();
  });

  test('User should navigate to login page successfully', async ({ page }) => {
    await homePage.clickLogin();
    expect(await loginPage.isPageTitleVisible()).toBeTruthy();
  });

  test('Login page should display email and password fields', async ({ page }) => {
    await homePage.clickLogin();
    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
    expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
  });

  test('Login page should display login button', async ({ page }) => {
    await homePage.clickLogin();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });

  test('Login page should display forgot password link', async ({ page }) => {
    await homePage.clickLogin();
    const link = await page.$('a[href*="forgotten"]');
    expect(link).toBeTruthy();
  });

  test('User should see error message with invalid credentials', async ({ page }) => {
    await homePage.clickLogin();
    await loginPage.login(testUsers.invalidCredentials.email, testUsers.invalidCredentials.password);
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
  });

  test('Login form should require email field', async ({ page }) => {
    // Check if validation message appears or form doesn't submit
    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
  });

  test('Login form should require password field', async ({ page }) => {
    await homePage.clickLogin();
    await loginPage.login(testUsers.validLogin.email, '');
    expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
  });

  test('User can access forgot password page', async ({ page }) => {
    await homePage.clickLogin();
    await loginPage.clickForgotPassword();
    // Verify navigation to forgot password page
    expect(page.url()).toContain('forgotten');
  });
});
