// RegisterPage Page Object Model for OpenCart

export class RegisterPage {
  constructor(page) {
    this.page = page;
  }

  // Selectors
  get firstNameInput() {
    return 'input[name="firstname"]';
  }

  get lastNameInput() {
    return 'input[name="lastname"]';
  }

  get emailInput() {
    return 'input[name="email"]';
  }

  get telephoneInput() {
    return 'input[name="telephone"]';
  }

  get passwordInput() {
    return 'input[name="password"]';
  }

  get confirmPasswordInput() {
    return 'input[name="confirm"]';
  }

  get addressInput() {
    return 'input[name="address_1"]';
  }

  get cityInput() {
    return 'input[name="city"]';
  }

  get postCodeInput() {
    return 'input[name="postcode"]';
  }

  get countrySelect() {
    return 'select[name="country_id"]';
  }

  get zoneSelect() {
    return 'select[name="zone_id"]';
  }

  get agreeCheckbox() {
    return 'input[name="agree"]';
  }

  get continueButton() {
    return 'button:has-text("Continue")';
  }

  get errorMessage() {
    return '.alert-danger';
  }

  get successMessage() {
    return '.alert-success';
  }

  get pageTitle() {
    return 'h1:has-text("Register Account")';
  }

  // Methods
  async navigate() {
    await this.page.goto('/index.php?route=account/register', { waitUntil: 'load', timeout: 60000 });
    await this.page.waitForTimeout(2000);
  }

  async fillRegistrationForm(userData) {
    try {
      await this.page.fill(this.firstNameInput, userData.firstName, { timeout: 10000 });
      await this.page.fill(this.lastNameInput, userData.lastName, { timeout: 10000 });
      await this.page.fill(this.emailInput, userData.email, { timeout: 10000 });
      await this.page.fill(this.telephoneInput, userData.telephone, { timeout: 10000 });
      await this.page.fill(this.addressInput, userData.address, { timeout: 10000 });
      await this.page.fill(this.cityInput, userData.city, { timeout: 10000 });
      await this.page.fill(this.postCodeInput, userData.postCode, { timeout: 10000 });

      // Select country
      await this.page.selectOption(this.countrySelect, { label: userData.country }, { timeout: 10000 });
      await this.page.waitForTimeout(1000);

      // Select zone/state
      await this.page.selectOption(this.zoneSelect, { label: userData.zone }, { timeout: 10000 });

      // Fill password fields
      await this.page.fill(this.passwordInput, userData.password, { timeout: 10000 });
      await this.page.fill(this.confirmPasswordInput, userData.confirmPassword, { timeout: 10000 });
    } catch (e) {
      console.log('Form fill error:', e);
    }
  }

  async acceptTermsAndConditions() {
    try {
      const checkbox = await this.page.$(this.agreeCheckbox);
      if (checkbox && !(await checkbox.isChecked())) {
        await checkbox.check();
      }
    } catch (e) {
      console.log('Checkbox error:', e);
    }
  }

  async submitRegistration() {
    await this.acceptTermsAndConditions();
    try {
      await this.page.click(this.continueButton);
      await this.page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
    } catch (e) {
      console.log('Submit error:', e);
    }
  }

  async registerUser(userData) {
    await this.navigate();
    await this.fillRegistrationForm(userData);
    await this.submitRegistration();
  }

  async getErrorMessage() {
    const element = await this.page.$(this.errorMessage);
    if (element) {
      return await element.textContent();
    }
    return null;
  }

  async isErrorMessageVisible() {
    return await this.page.isVisible(this.errorMessage);
  }

  async isPageTitleVisible() {
    return await this.page.isVisible(this.pageTitle);
  }

  async getSuccessMessage() {
    const element = await this.page.$(this.successMessage);
    if (element) {
      return await element.textContent();
    }
    return null;
  }
}
