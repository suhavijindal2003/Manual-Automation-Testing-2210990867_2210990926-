// HomePage Page Object Model for OpenCart

export class HomePage {
  constructor(page) {
    this.page = page;
  }

  // Selectors - Updated for better cross-browser compatibility
  get searchInput() {
    return 'input[name="search"]';
  }

  get searchButton() {
    return 'button[type="button"]';
  }

  get accountLink() {
    return 'a[href*="account"]';
  }

  get cartLink() {
    return 'a[href*="cart"], button[data-toggle="dropdown"]';
  }

  get menuItems() {
    return 'nav a';
  }

  get categoryMenu() {
    return 'a[href*="category"]';
  }

  get featuredProducts() {
    return 'div[class*="col"]';
  }

  get logo() {
    return 'a.logo';
  }

  get myAccountDropdown() {
    return 'a[href*="account"]';
  }

  get loginOption() {
    return 'a[href*="login"]';
  }

  get registerOption() {
    return 'a[href*="register"]';
  }

  // Methods
  async navigate() {
    await this.page.goto('/', { waitUntil: 'load', timeout: 60000 });
    await this.page.waitForTimeout(2000);
  }

  async search(searchTerm) {
    await this.page.fill(this.searchInput, searchTerm);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000);
  }

  async clickAccountDropdown() {
    const accountLink = await this.page.$(this.accountLink);
    if (accountLink) {
      await accountLink.click();
      await this.page.waitForTimeout(500);
    }
  }

  async clickLogin() {
    try {
      const loginBtn = await this.page.$('a:has-text("Login")');
      if (loginBtn) {
        await loginBtn.click();
      } else {
        await this.page.click(this.loginOption);
      }
      await this.page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
    } catch (e) {
      await this.page.goto('/index.php?route=account/login', { waitUntil: 'load', timeout: 30000 });
    }
  }

  async clickRegister() {
    try {
      const registerBtn = await this.page.$('a:has-text("Register")');
      if (registerBtn) {
        await registerBtn.click();
      } else {
        await this.page.click(this.registerOption);
      }
      await this.page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
    } catch (e) {
      await this.page.goto('/index.php?route=account/register', { waitUntil: 'load', timeout: 30000 });
    }
  }

  async clickCart() {
    try {
      const cartBtn = await this.page.$('a[title="Shopping Cart"]');
      if (cartBtn) {
        await cartBtn.click();
      } else {
        await this.page.click(this.cartLink);
      }
      await this.page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
    } catch (e) {
      await this.page.goto('/index.php?route=checkout/cart', { waitUntil: 'load', timeout: 30000 });
    }
  }

  async clickCategory(categoryName) {
    const category = await this.page.$(`a:has-text("${categoryName}")`);
    if (category) {
      await category.click();
      await this.page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
    }
  }

  async getProductCount() {
    try {
      const count = await this.page.locator('div[class*="col"]').count();
      return count > 0 ? count - 2 : 0; // Subtract header/footer elements
    } catch {
      return 0;
    }
  }

  async isLogoVisible() {
    return await this.page.isVisible(this.logo).catch(() => false);
  }

  async clickFirstProduct() {
    try {
      const products = await this.page.locator('a[href*="product_id"]').all();
      if (products.length > 0) {
        await products[0].click();
        await this.page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
      }
    } catch (e) {
      throw new Error('Could not click first product');
    }
  }

  async isSearchInputVisible() {
    return await this.page.isVisible(this.searchInput).catch(() => false);
  }
}

