/**
 * OpenCart Demo Selectors Configuration
 * Update these selectors to match the actual OpenCart demo site structure
 *
 * To find the correct selectors:
 * 1. Open https://demo.opencart.com/ in your browser
 * 2. Right-click on element and select "Inspect"
 * 3. Copy the selector or class/id from the HTML
 */

export const selectors = {
  // HOME PAGE
  home: {
    searchInput: 'input[name="search"]',
    searchButton: 'button[data-toggle="tooltip"][title="Search"]',
    accountLink: 'a[title="My Account"]',
    cartLink: 'a[title="Shopping Cart"]',
    // Featured/product items - try these selectors
    productItems: [
      '.product-item',          // Common OpenCart selector
      'div.col-lg-3',           // Column layout
      'div[class*="product"]',  // Any class with "product"
      'div.card',               // Card layout
      '[class*="featured"]'     // Featured products section
    ]
  },

  // LOGIN PAGE
  login: {
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button:has-text("Login")',
    errorMessage: '.alert-danger',
    pageTitle: 'h1'
  },

  // REGISTER PAGE
  register: {
    firstNameInput: 'input[name="firstname"]',
    lastNameInput: 'input[name="lastname"]',
    emailInput: 'input[name="email"]',
    telephoneInput: 'input[name="telephone"]',
    passwordInput: 'input[name="password"]',
    confirmPasswordInput: 'input[name="confirm"]',
    addressInput: 'input[name="address_1"]',
    cityInput: 'input[name="city"]',
    postCodeInput: 'input[name="postcode"]',
    countrySelect: 'select[name="country_id"]',
    zoneSelect: 'select[name="zone_id"]',
    agreeCheckbox: 'input[name="agree"]',
    continueButton: 'button:has-text("Continue")'
  },

  // PRODUCT PAGE
  product: {
    productName: 'h1',
    productPrice: '.price',
    productDescription: '#tab-description, [class*="description"]',
    addToCartButton: 'button#button-cart',
    quantityInput: 'input[name="quantity"]',
    successMessage: '.alert-success'
  },

  // CART PAGE
  cart: {
    cartItems: 'tbody tr',
    cartTotal: '.table-bordered .text-right strong',
    removeButton: 'button[title="Remove"]',
    checkoutButton: 'a:has-text("Checkout")',
    emptyCartMessage: '.alert'
  },

  // CHECKOUT PAGE
  checkout: {
    emailInput: 'input[name="email"]',
    firstNameInput: 'input[name="firstname"]',
    lastNameInput: 'input[name="lastname"]',
    addressInput: 'input[name="address_1"]',
    cityInput: 'input[name="city"]',
    postCodeInput: 'input[name="postcode"]',
    countrySelect: 'select[name="country_id"]',
    zoneSelect: 'select[name="zone_id"]',
    continueButton: 'button:has-text("Continue")',
    confirmOrderButton: 'button#button-confirm'
  }
};

/**
 * HOW TO UPDATE SELECTORS:
 *
 * 1. Run: npm run test:ui
 * 2. Click "Inspect" in the Playwright Test UI
 * 3. Right-click on elements and view HTML
 * 4. Update the selectors in this file
 * 5. Re-run tests
 *
 * Example finding product items:
 * - Open https://demo.opencart.com/
 * - Inspect the first product box
 * - Look for class or id attributes
 * - Update productItems array with the correct selector
 */
