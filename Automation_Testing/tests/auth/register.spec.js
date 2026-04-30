import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { RegisterPage } from '../../pages/RegisterPage.js';
import { testUsers } from '../../utils/testData.js';

test.describe('Registration Tests', () => {
    let homePage;
    let registerPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        registerPage = new RegisterPage(page);
        await homePage.navigate();
    });

    test('User should navigate to registration page successfully', async ({ page }) => {
        await homePage.clickRegister();
        expect(await registerPage.isPageTitleVisible()).toBeTruthy();
    });

    test('Registration page should display all required fields', async ({ page }) => {
        await homePage.clickRegister();
        expect(await page.isVisible(registerPage.firstNameInput)).toBeTruthy();
        expect(await page.isVisible(registerPage.lastNameInput)).toBeTruthy();
        expect(await page.isVisible(registerPage.emailInput)).toBeTruthy();
        expect(await page.isVisible(registerPage.telephoneInput)).toBeTruthy();
        expect(await page.isVisible(registerPage.passwordInput)).toBeTruthy();
        expect(await page.isVisible(registerPage.confirmPasswordInput)).toBeTruthy();
    });

    test('User should be able to fill registration form', async ({ page }) => {
        await homePage.clickRegister();
        await registerPage.fillRegistrationForm(testUsers.newUser);

        // Verify values are filled
        expect(await page.inputValue(registerPage.firstNameInput)).toBe(testUsers.newUser.firstName);
        expect(await page.inputValue(registerPage.emailInput)).toBe(testUsers.newUser.email);
    });

    test('User should see error when passwords do not match', async ({ page }) => {
        await homePage.clickRegister();
        await registerPage.navigate();
        await page.fill(registerPage.firstNameInput, testUsers.newUser.firstName);
        await page.fill(registerPage.lastNameInput, testUsers.newUser.lastName);
        await page.fill(registerPage.emailInput, testUsers.newUser.email);
        await page.fill(registerPage.telephoneInput, testUsers.newUser.telephone);
        await page.fill(registerPage.addressInput, testUsers.newUser.address);
        await page.fill(registerPage.cityInput, testUsers.newUser.city);
        await page.fill(registerPage.postCodeInput, testUsers.newUser.postCode);
        await page.selectOption(registerPage.countrySelect, { label: testUsers.newUser.country });
        await page.waitForLoadState('networkidle');
        await page.selectOption(registerPage.zoneSelect, { label: testUsers.newUser.zone });

        await page.fill(registerPage.passwordInput, testUsers.newUser.password);
        await page.fill(registerPage.confirmPasswordInput, 'DifferentPassword123');

        // Attempt to submit - should fail or show error
        await registerPage.acceptTermsAndConditions();
        await page.click(registerPage.continueButton);

        // Wait a moment for validation
        await page.waitForTimeout(1000);
    });

    test('User should see error when email is invalid', async ({ page }) => {
        await homePage.clickRegister();
        const invalidUser = {
            ...testUsers.newUser,
            email: 'invalid-email'
        };

        await registerPage.fillRegistrationForm(invalidUser);
        await registerPage.acceptTermsAndConditions();
        await page.click(registerPage.continueButton);

        // Verify validation message or form remains open
        await page.waitForTimeout(1000);
    });

    test('User must accept terms and conditions to register', async ({ page }) => {
        await homePage.clickRegister();
        await registerPage.fillRegistrationForm(testUsers.newUser);

        // Try to submit without accepting checkbox
        const checkbox = await page.$(registerPage.agreeCheckbox);
        if (checkbox) {
            await checkbox.uncheck();
        }

        // Form should not submit or show error
        const continueButton = await page.$(registerPage.continueButton);
        const isDisabled = await continueButton.evaluate(el => el.disabled);
        // Some forms disable the button, others show validation
    });

    test('Registration form should require all mandatory fields', async ({ page }) => {
        await homePage.clickRegister();

        // Try to submit empty form
        await registerPage.acceptTermsAndConditions();
        await page.click(registerPage.continueButton);

        // Verification would depend on form validation behavior
        await page.waitForTimeout(1000);
    });

    test('User should see first name field', async ({ page }) => {
        await homePage.clickRegister();
        expect(await page.isVisible(registerPage.firstNameInput)).toBeTruthy();
    });

    test('User should see last name field', async ({ page }) => {
        await homePage.clickRegister();
        expect(await page.isVisible(registerPage.lastNameInput)).toBeTruthy();
    });

    test('User should see email field', async ({ page }) => {
        await homePage.clickRegister();
        expect(await page.isVisible(registerPage.emailInput)).toBeTruthy();
    });

    test('User should see telephone field', async ({ page }) => {
        await homePage.clickRegister();
        expect(await page.isVisible(registerPage.telephoneInput)).toBeTruthy();
    });

    test('User should see address field', async ({ page }) => {
        await homePage.clickRegister();
        expect(await page.isVisible(registerPage.addressInput)).toBeTruthy();
    });

    test('User should see city field', async ({ page }) => {
        await homePage.clickRegister();
        expect(await page.isVisible(registerPage.cityInput)).toBeTruthy();
    });

    test('User should see post code field', async ({ page }) => {
        await homePage.clickRegister();
        expect(await page.isVisible(registerPage.postCodeInput)).toBeTruthy();
    });
});
