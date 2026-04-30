// LoginPage Page Object Model for OpenCart

export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    // Selectors
    get emailInput() {
        return 'input[name="email"]';
    }

    get passwordInput() {
        return 'input[name="password"]';
    }

    get loginButton() {
        return 'button:has-text("Login")';
    }

    get errorMessage() {
        return '.alert-danger';
    }

    get successMessage() {
        return '.alert-success';
    }

    get forgotPasswordLink() {
        return 'a[href*="forgotten"]';
    }

    get pageTitle() {
        return 'h1:has-text("Login")';
    }

    get rightColumn() {
        return '.col-sm-6.offset-sm-3';
    }

    // Methods
    async navigate() {
        await this.page.goto('/index.php?route=account/login', { waitUntil: 'load', timeout: 60000 });
        await this.page.waitForTimeout(2000);
    }

    async login(email, password) {
        try {
            await this.page.fill(this.emailInput, email);
            await this.page.fill(this.passwordInput, password);
            await this.page.click(this.loginButton);
            await this.page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
            await this.page.waitForTimeout(1000);
        } catch (e) {
            console.log('Login error:', e);
        }
    }

    async getErrorMessage() {
        const element = await this.page.$(this.errorMessage);
        if (element) {
            return await element.textContent();
        }
        return null;
    }

    async getSuccessMessage() {
        const element = await this.page.$(this.successMessage);
        if (element) {
            return await element.textContent();
        }
        return null;
    }

    async isEmailFieldVisible() {
        return await this.page.isVisible(this.emailInput);
    }

    async isPasswordFieldVisible() {
        return await this.page.isVisible(this.passwordInput);
    }

    async isLoginButtonVisible() {
        return await this.page.isVisible(this.loginButton);
    }

    async isErrorMessageVisible() {
        return await this.page.isVisible(this.errorMessage);
    }

    async clickForgotPassword() {
        await this.page.click(this.forgotPasswordLink);
        await this.page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
    }

    async isPageTitleVisible() {
        return await this.page.isVisible(this.pageTitle);
    }
}
