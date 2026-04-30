// CheckoutPage Page Object Model for OpenCart

export class CheckoutPage {
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
    return 'button[onclick*="login"]';
  }

  get guestCheckoutButton() {
    return 'button[onclick*="guest"], input[value="guest"]';
  }

  get billingFirstNameInput() {
    return 'input[name="firstname"]';
  }

  get billingLastNameInput() {
    return 'input[name="lastname"]';
  }

  get billingAddressInput() {
    return 'input[name="address_1"]';
  }

  get billingCityInput() {
    return 'input[name="city"]';
  }

  get billingPostCodeInput() {
    return 'input[name="postcode"]';
  }

  get billingCountrySelect() {
    return 'select[name="country_id"]';
  }

  get billingZoneSelect() {
    return 'select[name="zone_id"]';
  }

  get continueButton() {
    return 'button#button-account';
  }

  get shippingAddressContinue() {
    return 'button#button-shipping-address';
  }

  get shippingMethodContinue() {
    return 'button#button-shipping-method';
  }

  get paymentMethodRadios() {
    return 'input[name="payment_method"]';
  }

  get paymentMethodContinue() {
    return 'button#button-payment-method';
  }

  get confirmOrderButton() {
    return 'button#button-confirm';
  }

  get orderSuccessMessage() {
    return '.alert-success';
  }

  get orderNumber() {
    return 'h1 + p, .order-id';
  }

  get termsCheckbox() {
    return 'input[name="agree"]';
  }

  get paymentContinue() {
    return 'button#button-payment';
  }

  get shippingMethodRadios() {
    return 'input[name="shipping_method"]';
  }

  // Methods
  async navigate() {
    await this.page.goto('/index.php?route=checkout/checkout');
    await this.page.waitForTimeout(1000);
  }

  async proceedAsGuest() {
    const guestCheckout = await this.page.$(this.guestCheckoutButton);
    if (guestCheckout) {
      await this.page.click(this.guestCheckoutButton);
      await this.page.waitForTimeout(500);
    }
  }

  async fillBillingAddress(userData) {
    await this.page.fill(this.billingFirstNameInput, userData.firstName);
    await this.page.fill(this.billingLastNameInput, userData.lastName);
    await this.page.fill(this.billingAddressInput, userData.address);
    await this.page.fill(this.billingCityInput, userData.city);
    await this.page.fill(this.billingPostCodeInput, userData.postCode);

    // Select country
    await this.page.selectOption(this.billingCountrySelect, { label: userData.country });
    await this.page.waitForTimeout(500);

    // Select zone
    await this.page.selectOption(this.billingZoneSelect, { label: userData.zone });
  }

  async continueBillingAddress() {
    const button = await this.page.$(this.continueButton);
    if (button) {
      await this.page.click(this.continueButton);
      await this.page.waitForTimeout(1000);
    }
  }

  async continueShippingAddress() {
    const button = await this.page.$(this.shippingAddressContinue);
    if (button) {
      await this.page.click(this.shippingAddressContinue);
      await this.page.waitForTimeout(1000);
    }
  }

  async selectShippingMethod(methodIndex = 0) {
    const methods = await this.page.locator(this.shippingMethodRadios).all();
    if (methodIndex < methods.length) {
      await methods[methodIndex].click();
    }
  }

  async continueShippingMethod() {
    const button = await this.page.$(this.shippingMethodContinue);
    if (button) {
      await this.page.click(this.shippingMethodContinue);
      await this.page.waitForTimeout(1000);
    }
  }

  async selectPaymentMethod(methodIndex = 0) {
    const methods = await this.page.locator(this.paymentMethodRadios).all();
    if (methodIndex < methods.length) {
      await methods[methodIndex].click();
    }
  }

  async continuePaymentMethod() {
    const button = await this.page.$(this.paymentMethodContinue);
    if (button) {
      await this.page.click(this.paymentMethodContinue);
      await this.page.waitForTimeout(1000);
    }
  }

  async continuePayment() {
    const button = await this.page.$(this.paymentContinue);
    if (button) {
      await this.page.click(this.paymentContinue);
      await this.page.waitForTimeout(1000);
    }
  }

  async acceptTermsAndConditions() {
    const checkbox = await this.page.$(this.termsCheckbox);
    if (checkbox && !(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  async confirmOrder() {
    await this.acceptTermsAndConditions();
    await this.page.click(this.confirmOrderButton);
    await this.page.waitForTimeout(1000);
  }

  async isOrderSuccessful() {
    return await this.page.isVisible(this.orderSuccessMessage);
  }

  async getOrderNumber() {
    const element = await this.page.$(this.orderNumber);
    if (element) {
      return await element.textContent();
    }
    return null;
  }

  async getSuccessMessage() {
    const element = await this.page.$(this.orderSuccessMessage);
    if (element) {
      return await element.textContent();
    }
    return null;
  }
}
