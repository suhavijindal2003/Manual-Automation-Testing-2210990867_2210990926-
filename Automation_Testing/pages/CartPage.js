// CartPage Page Object Model for OpenCart

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  // Selectors
  get cartItems() {
    return 'tbody tr';
  }

  get cartItemName() {
    return 'tbody tr:first-child a';
  }

  get cartItemQuantity() {
    return 'input[name="quantity"]';
  }

  get removeButton() {
    return 'button[title="Remove"]';
  }

  get updateButton() {
    return 'button[name="update"]';
  }

  get continueShoppingButton() {
    return 'a:has-text("Continue Shopping")';
  }

  get checkoutButton() {
    return 'a:has-text("Checkout"), button:has-text("Checkout")';
  }

  get cartTotal() {
    return '.table-bordered .text-right:last-child strong';
  }

  get subtotal() {
    return '.subtotal .text-right';
  }

  get emptyCartMessage() {
    return '.alert-info';
  }

  get couponInput() {
    return 'input[name="coupon"]';
  }

  get couponButton() {
    return 'button[name="coupon"]';
  }

  get applyVoucherInput() {
    return 'input[name="voucher"]';
  }

  get applyVoucherButton() {
    return 'button[name="voucher"]';
  }

  get shippingEstimateLink() {
    return 'a:has-text("Estimate")';
  }

  get pageTitle() {
    return 'h1:has-text("Shopping Cart")';
  }

  // Methods
  async navigate() {
    await this.page.goto('/index.php?route=checkout/cart');
    await this.page.waitForTimeout(1000);
  }

  async getCartItemsCount() {
    return await this.page.locator(this.cartItems).count();
  }

  async getFirstItemName() {
    return await this.page.textContent(this.cartItemName);
  }

  async updateItemQuantity(itemIndex, newQuantity) {
    const quantityInputs = await this.page.locator(this.cartItemQuantity).all();
    if (itemIndex < quantityInputs.length) {
      await quantityInputs[itemIndex].fill(newQuantity.toString());
    }
  }

  async clickUpdateButton() {
    await this.page.click(this.updateButton);
    await this.page.waitForTimeout(1000);
  }

  async removeItem(itemIndex) {
    const removeButtons = await this.page.locator(this.removeButton).all();
    if (itemIndex < removeButtons.length) {
      await removeButtons[itemIndex].click();
      await this.page.waitForTimeout(500);
    }
  }

  async isCartEmpty() {
    return await this.page.isVisible(this.emptyCartMessage);
  }

  async getCartTotal() {
    return await this.page.textContent(this.cartTotal);
  }

  async getSubtotal() {
    return await this.page.textContent(this.subtotal);
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
    await this.page.waitForTimeout(1000);
  }

  async applyCoupon(couponCode) {
    await this.page.fill(this.couponInput, couponCode);
    await this.page.click(this.couponButton);
    await this.page.waitForTimeout(1000);
  }

  async applyVoucher(voucherCode) {
    await this.page.fill(this.applyVoucherInput, voucherCode);
    await this.page.click(this.applyVoucherButton);
    await this.page.waitForTimeout(1000);
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
    await this.page.waitForTimeout(1000);
  }

  async isPageTitleVisible() {
    return await this.page.isVisible(this.pageTitle);
  }

  async getItemPrice(itemIndex) {
    const rows = await this.page.locator(this.cartItems).all();
    if (itemIndex < rows.length) {
      const cells = await rows[itemIndex].locator('td').all();
      if (cells.length >= 3) {
        return await cells[2].textContent();
      }
    }
    return null;
  }
}
