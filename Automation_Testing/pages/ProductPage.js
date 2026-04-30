// ProductPage Page Object Model for OpenCart

export class ProductPage {
  constructor(page) {
    this.page = page;
  }

  // Selectors
  get productName() {
    return 'h1';
  }

  get productPrice() {
    return '.price';
  }

  get productDescription() {
    return '.tab-content #tab-description';
  }

  get addToCartButton() {
    return 'button#button-cart';
  }

  get quantityInput() {
    return 'input[name="quantity"]';
  }

  get ratingSection() {
    return '.rating';
  }

  get reviewsSection() {
    return '#tab-review';
  }

  get successMessage() {
    return '.alert-success';
  }

  get errorMessage() {
    return '.alert-danger';
  }

  get relatedProducts() {
    return '.related-products .product-item';
  }

  get productImages() {
    return '.product-images img';
  }

  get attributeSelects() {
    return 'select[name^="option"]';
  }

  get wishlistButton() {
    return 'button.btn[onclick*="wishlist"]';
  }

  get compareButton() {
    return 'button.btn[onclick*="compare"]';
  }

  // Methods
  async navigateToProduct(productName) {
    // This assumes you're already on a page with product links
    await this.page.click(`a:has-text("${productName}")`);
    await this.page.waitForTimeout(1000);
  }

  async getProductName() {
    return await this.page.textContent(this.productName);
  }

  async getProductPrice() {
    return await this.page.textContent(this.productPrice);
  }

  async getProductDescription() {
    return await this.page.textContent(this.productDescription);
  }

  async setQuantity(quantity) {
    await this.page.fill(this.quantityInput, quantity.toString());
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
    await this.page.waitForTimeout(1000); // Wait for success message
  }

  async addToCartWithQuantity(quantity) {
    await this.setQuantity(quantity);
    await this.addToCart();
  }

  async getSuccessMessage() {
    const element = await this.page.$(this.successMessage);
    if (element) {
      return await element.textContent();
    }
    return null;
  }

  async isSuccessMessageVisible() {
    return await this.page.isVisible(this.successMessage);
  }

  async getErrorMessage() {
    const element = await this.page.$(this.errorMessage);
    if (element) {
      return await element.textContent();
    }
    return null;
  }

  async isAddToCartButtonVisible() {
    return await this.page.isVisible(this.addToCartButton);
  }

  async getRelatedProductsCount() {
    return await this.page.locator(this.relatedProducts).count();
  }

  async selectOption(optionIndex, optionValue) {
    const selects = await this.page.locator(this.attributeSelects).all();
    if (optionIndex < selects.length) {
      await selects[optionIndex].selectOption(optionValue);
    }
  }

  async clickWishlist() {
    await this.page.click(this.wishlistButton);
    await this.page.waitForTimeout(500);
  }

  async clickCompare() {
    await this.page.click(this.compareButton);
    await this.page.waitForTimeout(500);
  }

  async navigateByUrl(url) {
    await this.page.goto(url);
    await this.page.waitForTimeout(1000);
  }
}
