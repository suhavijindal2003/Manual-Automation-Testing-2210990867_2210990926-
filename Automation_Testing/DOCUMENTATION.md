# OpenCart Automation Testing - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [File Descriptions](#file-descriptions)
4. [Installation & Setup](#installation--setup)
5. [Execution Commands](#execution-commands)
6. [Page Object Model (POM) Pattern](#page-object-model-pom-pattern)
7. [Test Files Explained](#test-files-explained)
8. [Configuration Details](#configuration-details)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Project Name:** OpenCart Automation Testing Suite  
**Application Under Test:** https://demo.opencart.com/  
**Testing Framework:** Playwright  
**Test Architecture:** Page Object Model (POM)  
**Target Browsers:** Chromium, Firefox, WebKit  
**Language:** JavaScript (Node.js)  

This project provides end-to-end automation testing for the OpenCart demo application, covering user authentication, product browsing, shopping cart operations, and checkout flows across all three major browsers.

---

## 📁 Project Structure

```
Automation_Testing/
│
├── pages/                          # Page Object Models (POM)
│   ├── HomePage.js                # Home page interactions
│   ├── LoginPage.js               # Login page interactions
│   ├── RegisterPage.js            # Registration page interactions
│   ├── ProductPage.js             # Product details page interactions
│   ├── CartPage.js                # Shopping cart page interactions
│   └── CheckoutPage.js            # Checkout process interactions
│
├── tests/                          # Test Specifications
│   ├── auth/
│   │   ├── login.spec.js          # Login functionality tests
│   │   └── register.spec.js       # Registration functionality tests
│   ├── product/
│   │   ├── browse.spec.js         # Product browsing tests
│   │   └── search.spec.js         # Product search tests
│   ├── cart/
│   │   └── cart.spec.js           # Shopping cart tests
│   └── checkout/
│       └── checkout.spec.js       # Checkout process tests
│
├── fixtures/                       # Playwright Fixtures
│   └── setup.js                   # Custom fixtures for page objects
│
├── utils/                          # Utility Functions
│   ├── testData.js                # Test data and constants
│   └── helpers.js                 # Helper functions
│
├── selectors.config.js            # Centralized CSS selectors (optional)
├── playwright.config.js           # Playwright configuration
├── package.json                   # Project dependencies & scripts
├── SETUP.md                       # Quick setup guide
└── DOCUMENTATION.md               # This file
```

---

## 📄 File Descriptions

### 🎭 Page Object Models (`pages/` directory)

#### **1. HomePage.js**
**Purpose:** Encapsulates all interactions with the OpenCart home page

**Key Selectors:**
- `searchInput` - Search bar input field
- `searchButton` - Search submission button
- `accountLink` - Account dropdown menu
- `cartLink` - Shopping cart link
- `loginOption` - Login menu option
- `registerOption` - Register menu option
- `categoryMenu` - Product category links
- `logo` - Site logo

**Key Methods:**
```javascript
async navigate()              // Navigate to home page
async search(searchTerm)      // Search for products
async clickAccountDropdown()  // Open account menu
async clickLogin()            // Navigate to login
async clickRegister()         // Navigate to registration
async clickCart()             // Navigate to cart
async clickCategory()         // Click product category
async clickFirstProduct()     // Click first product in listing
async getProductCount()       // Get number of products displayed
async isLogoVisible()         // Verify logo is visible
```

**Usage Example:**
```javascript
const homePage = new HomePage(page);
await homePage.navigate();
await homePage.search('iPhone');
await homePage.clickFirstProduct();
```

---

#### **2. LoginPage.js**
**Purpose:** Manages all login page interactions and validations

**Key Selectors:**
- `emailInput` - Email/username input field
- `passwordInput` - Password input field
- `loginButton` - Login submit button
- `errorMessage` - Error alert container
- `successMessage` - Success alert container
- `forgotPasswordLink` - Password recovery link
- `pageTitle` - Page heading

**Key Methods:**
```javascript
async navigate()              // Navigate to login page
async login(email, password)  // Perform login action
async getErrorMessage()       // Retrieve error message text
async getSuccessMessage()     // Retrieve success message text
async isEmailFieldVisible()   // Check if email field exists
async isPasswordFieldVisible()// Check if password field exists
async isLoginButtonVisible()  // Check if login button exists
async isErrorMessageVisible() // Check if error is displayed
async clickForgotPassword()   // Click forgot password link
async isPageTitleVisible()    // Verify login page loaded
```

**Usage Example:**
```javascript
const loginPage = new LoginPage(page);
await loginPage.navigate();
await loginPage.login('user@example.com', 'password123');
const errorMsg = await loginPage.getErrorMessage();
```

---

#### **3. RegisterPage.js**
**Purpose:** Manages user registration form interactions

**Key Selectors:**
- `firstNameInput` - First name field
- `lastNameInput` - Last name field
- `emailInput` - Email address field
- `telephoneInput` - Phone number field
- `passwordInput` - Password field
- `confirmPasswordInput` - Confirm password field
- `addressInput` - Street address field
- `cityInput` - City field
- `postCodeInput` - Postal code field
- `countrySelect` - Country dropdown
- `zoneSelect` - State/province dropdown
- `agreeCheckbox` - Terms & conditions checkbox
- `continueButton` - Submit button

**Key Methods:**
```javascript
async navigate()                    // Go to registration page
async fillRegistrationForm(userData)// Fill all form fields
async acceptTermsAndConditions()   // Check terms checkbox
async submitRegistration()          // Submit registration form
async registerUser(userData)        // Complete registration flow
async getErrorMessage()             // Get validation error text
async isErrorMessageVisible()       // Check if error displays
async isPageTitleVisible()          // Verify registration page
async getSuccessMessage()           // Get success message
```

**Usage Example:**
```javascript
const registerPage = new RegisterPage(page);
await registerPage.navigate();
await registerPage.registerUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  telephone: '1234567890',
  password: 'SecurePass123',
  confirmPassword: 'SecurePass123',
  address: '123 Main St',
  city: 'New York',
  postCode: '10001',
  country: 'United States',
  zone: 'New York'
});
```

---

#### **4. ProductPage.js**
**Purpose:** Handles product details page interactions

**Key Selectors:**
- `productName` - Product title
- `productPrice` - Product price display
- `productDescription` - Product description text
- `addToCartButton` - Add to cart button
- `quantityInput` - Quantity input field
- `ratingSection` - Product rating display
- `reviewsSection` - Customer reviews section
- `relatedProducts` - Related products list
- `productImages` - Product image gallery
- `attributeSelects` - Product option dropdowns
- `wishlistButton` - Add to wishlist button
- `compareButton` - Add to compare button

**Key Methods:**
```javascript
async navigateToProduct(productName)    // Click product link
async getProductName()                  // Get product title
async getProductPrice()                 // Get product price
async getProductDescription()           // Get product details
async setQuantity(quantity)             // Set purchase quantity
async addToCart()                       // Add product to cart
async addToCartWithQuantity(quantity)   // Set qty and add to cart
async getSuccessMessage()               // Get confirmation message
async isSuccessMessageVisible()         // Verify add-to-cart success
async selectOption(index, value)        // Select product option
async clickWishlist()                   // Add to wishlist
async clickCompare()                    // Add to compare
async navigateByUrl(url)                // Navigate directly to product
```

**Usage Example:**
```javascript
const productPage = new ProductPage(page);
await productPage.navigateToProduct('iPhone');
const price = await productPage.getProductPrice();
await productPage.addToCartWithQuantity(2);
const successMsg = await productPage.getSuccessMessage();
```

---

#### **5. CartPage.js**
**Purpose:** Manages shopping cart operations and validations

**Key Selectors:**
- `cartItems` - List of items in cart
- `itemQuantity` - Quantity fields for each item
- `removeButton` - Remove item buttons
- `subtotal` - Subtotal price display
- `total` - Total price display
- `checkoutButton` - Proceed to checkout button
- `continueShoppingButton` - Continue shopping button
- `emptyMessage` - Empty cart message

**Key Methods:**
```javascript
async navigate()                  // Go to cart page
async getCartItemCount()          // Get number of items
async getCartTotal()              // Get cart total price
async updateQuantity(itemIndex, quantity) // Change item quantity
async removeItem(itemIndex)       // Remove item from cart
async getItemPrice(itemIndex)     // Get price of specific item
async proceedToCheckout()         // Click checkout button
async continueShhopping()         // Continue shopping
async isCartEmpty()               // Check if cart is empty
async clearCart()                 // Remove all items
```

**Usage Example:**
```javascript
const cartPage = new CartPage(page);
await cartPage.navigate();
const itemCount = await cartPage.getCartItemCount();
await cartPage.updateQuantity(0, 3);
const total = await cartPage.getCartTotal();
await cartPage.proceedToCheckout();
```

---

#### **6. CheckoutPage.js**
**Purpose:** Manages multi-step checkout process

**Key Selectors:**
- Billing address fields
- Shipping address fields
- Shipping method options
- Payment method options
- Terms checkbox
- Various continue buttons

**Key Methods:**
```javascript
async navigate()                       // Go to checkout
async proceedAsGuest()                // Select guest checkout
async fillBillingAddress(userData)    // Fill billing details
async continueBillingAddress()        // Move to next step
async continueShippingAddress()       // Confirm shipping address
async selectShippingMethod(index)     // Choose shipping method
async continueShippingMethod()        // Proceed to payment
async selectPaymentMethod(index)      // Choose payment method
async continuePaymentMethod()         // Proceed to order review
async acceptTermsAndConditions()      // Accept terms
async confirmOrder()                  // Submit order
async isOrderSuccessful()             // Verify order confirmation
async getOrderNumber()                // Get order ID
async getSuccessMessage()             // Get confirmation message
```

**Usage Example:**
```javascript
const checkoutPage = new CheckoutPage(page);
await checkoutPage.navigate();
await checkoutPage.proceedAsGuest();
await checkoutPage.fillBillingAddress({
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St',
  city: 'New York',
  postCode: '10001',
  country: 'United States',
  zone: 'New York'
});
await checkoutPage.continueShippingMethod();
await checkoutPage.selectPaymentMethod(0);
await checkoutPage.confirmOrder();
const success = await checkoutPage.isOrderSuccessful();
```

---

### 🧪 Test Files (`tests/` directory)

#### **tests/auth/login.spec.js**
**Purpose:** Tests for login functionality

**Test Scenarios:**
1. ✅ User can see login page elements
2. ✅ User can login with valid credentials
3. ✅ User sees error with invalid credentials
4. ✅ User can click forgot password link
5. ✅ Email field is visible and accessible
6. ✅ Password field is visible and accessible

**Key Test Structure:**
```javascript
test.describe('Login Tests', () => {
  test('should see login page elements', async ({ page }) => {
    // Test implementation
  });
  
  test('should login with valid credentials', async ({ page }) => {
    // Test implementation
  });
});
```

---

#### **tests/auth/register.spec.js**
**Purpose:** Tests for user registration functionality

**Test Scenarios:**
1. ✅ Registration page loads correctly
2. ✅ User can fill registration form
3. ✅ User can submit registration
4. ✅ Validation errors appear for empty fields
5. ✅ Success message displays on completion
6. ✅ Form fields are properly labeled

---

#### **tests/product/browse.spec.js**
**Purpose:** Tests for product browsing functionality

**Test Scenarios:**
1. ✅ Home page loads with products
2. ✅ User can click on a product
3. ✅ Product details page displays
4. ✅ Product name and price are visible
5. ✅ Add to cart button is functional
6. ✅ Related products are displayed

---

#### **tests/product/search.spec.js**
**Purpose:** Tests for product search functionality

**Test Scenarios:**
1. ✅ Search bar is accessible
2. ✅ User can enter search term
3. ✅ Search results display products
4. ✅ Search returns relevant products
5. ✅ Empty search handling
6. ✅ Special characters in search

---

#### **tests/cart/cart.spec.js**
**Purpose:** Tests for shopping cart operations

**Test Scenarios:**
1. ✅ Products can be added to cart
2. ✅ Cart displays correct item count
3. ✅ Cart total calculates correctly
4. ✅ Item quantity can be updated
5. ✅ Items can be removed from cart
6. ✅ Continue shopping works

---

#### **tests/checkout/checkout.spec.js**
**Purpose:** Tests for complete checkout process

**Test Scenarios:**
1. ✅ User can proceed to checkout
2. ✅ Guest checkout is available
3. ✅ Billing address can be filled
4. ✅ Shipping method can be selected
5. ✅ Payment method can be selected
6. ✅ Order can be confirmed
7. ✅ Order confirmation displays

---

### 🔧 Utility Files (`utils/` directory)

#### **utils/testData.js**
**Purpose:** Contains test data constants used across test suite

**Contents:**
```javascript
// User credentials
export const validUser = {
  email: 'test@example.com',
  password: 'TestPassword123'
};

// Registration data
export const newUserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'neweuser@example.com',
  telephone: '1234567890',
  password: 'SecurePass123',
  confirmPassword: 'SecurePass123',
  address: '123 Main Street',
  city: 'New York',
  postCode: '10001',
  country: 'United States',
  zone: 'New York'
};

// Product search terms
export const searchTerms = [
  'iPhone',
  'MacBook',
  'Apple',
  'Samsung'
];
```

---

#### **utils/helpers.js**
**Purpose:** Common helper functions used in tests

**Key Functions:**
```javascript
// Wait for specific time
export async function wait(ms);

// Generate random email
export function generateRandomEmail();

// Format currency
export function formatCurrency(amount);

// Get current date
export function getCurrentDate();

// Retry mechanism
export async function retryOperation(operation, maxRetries);
```

---

### 🎯 Fixtures (`fixtures/` directory)

#### **fixtures/setup.js**
**Purpose:** Playwright fixtures for test setup and teardown

**Contents:**
```javascript
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  }
});

export { expect } from '@playwright/test';
```

---

### ⚙️ Configuration Files

#### **playwright.config.js**
**Purpose:** Main Playwright test configuration

**Key Settings:**
```javascript
{
  testDir: './tests',                    // Where tests are located
  fullyParallel: true,                   // Run tests in parallel
  retries: 0,                            // No retries (set to 2 on CI)
  workers: undefined,                    // Use all available CPU cores
  reporter: 'html',                      // Generate HTML report
  timeout: 120000,                       // 2 minutes per test
  actionTimeout: 15000,                  // 15 seconds per action
  outputDir: './test-results',           // Where to save results
  baseURL: 'https://demo.opencart.com/', // Application URL
  
  projects: [
    { name: 'chromium' },                // Google Chrome
    { name: 'firefox' },                 // Mozilla Firefox
    { name: 'webkit' }                   // Apple Safari
  ]
}
```

---

#### **package.json**
**Purpose:** Node.js project configuration and scripts

**Key Scripts:**
```json
{
  "scripts": {
    "test": "playwright test",                           // Run all tests
    "test:chromium": "playwright test --project=chromium", // Chrome only
    "test:firefox": "playwright test --project=firefox",   // Firefox only
    "test:webkit": "playwright test --project=webkit",     // Safari only
    "test:headed": "playwright test --headed",            // Run with UI
    "test:debug": "playwright test --debug",              // Debug mode
    "test:report": "playwright show-report",              // View HTML report
    "test:ui": "playwright test --ui"                     // Interactive UI mode
  }
}
```

---

## 🚀 Installation & Setup

### **1. Prerequisites**
- Node.js (v14 or higher)
- npm or yarn package manager
- Git (for version control)

### **2. Installation Steps**

```bash
# Step 1: Navigate to project directory
cd "c:\Users\Pc\OneDrive\Desktop\Project of sem 8 COPYRIGHT\Automation_Testing"

# Step 2: Install dependencies
npm install

# Step 3: Install Playwright browsers
npx playwright install

# Step 4: Verify installation
npx playwright --version
```

### **3. Verify Setup**

```bash
# Run a single test to verify setup
npm test -- --project=chromium tests/auth/login.spec.js
```

---

## 🎬 Execution Commands

### **Basic Test Execution**

#### **1. Run All Tests on All Browsers**
```bash
npm test
```
- Runs all tests in `tests/` directory
- Executes on Chromium, Firefox, and WebKit
- Generates HTML report in `test-results/`

#### **2. Run Tests on Specific Browser**

**Chromium (Chrome):**
```bash
npm test -- --project=chromium
```

**Firefox:**
```bash
npm test -- --project=firefox
```

**WebKit (Safari):**
```bash
npm test -- --project=webkit
```

### **Advanced Test Execution**

#### **3. Run Tests in Headed Mode (See Browser)**
```bash
npm run test:headed
```
- Opens browser window
- Visible test execution
- Helps with debugging

#### **4. Run Tests in Debug Mode**
```bash
npm run test:debug
```
- Step-through debugging
- Inspect page state
- Playwright Inspector opens

#### **5. Run Tests in Interactive UI Mode**
```bash
npm run test:ui
```
- Visual test explorer
- Filter and run specific tests
- Watch test execution

#### **6. Run Specific Test File**
```bash
# Login tests only
npm test -- tests/auth/login.spec.js

# Registration tests only
npm test -- tests/auth/register.spec.js

# Product browsing tests only
npm test -- tests/product/browse.spec.js

# Product search tests only
npm test -- tests/product/search.spec.js

# Cart tests only
npm test -- tests/cart/cart.spec.js

# Checkout tests only
npm test -- tests/checkout/checkout.spec.js
```

#### **7. Run Specific Test on Specific Browser**
```bash
npm test -- --project=firefox tests/auth/login.spec.js
```

#### **8. Run Tests with Filtering**
```bash
# Run tests matching a pattern
npm test -- --grep "login"

# Run tests NOT matching a pattern
npm test -- --grep-invert "slow"
```

#### **9. Run Tests with Traces**
```bash
npm test -- --trace on
```
- Records test execution traces
- Useful for debugging failures
- Opens in Playwright Trace Viewer

#### **10. Run Tests with Screenshots**
```bash
npm test -- --screenshot on
```

### **Test Reporting**

#### **11. View HTML Test Report**
```bash
npm run test:report
```
- Opens interactive HTML report
- Shows test results
- Displays screenshots/videos

#### **12. Generate and View Report**
```bash
npm test && npm run test:report
```

---

## 📊 Test Execution Examples

### **Example 1: Complete Cross-Browser Test Run**

```bash
# Clear previous results
rm -rf test-results/

# Run full test suite on all browsers
npm test

# View results
npm run test:report
```

**Expected Output:**
- ✅ 255+ tests across 3 browsers
- ✅ ~45 tests per browser × 3 browsers
- ✅ ~15-20 minutes total execution time

---

### **Example 2: Single Browser Testing During Development**

```bash
# Run tests only on Chrome for faster feedback
npm test -- --project=chromium

# Add --headed to see browser
npm test -- --project=chromium --headed
```

**Benefits:**
- Faster test feedback (5-10 minutes)
- Visual debugging capability
- Reduced resource usage

---

### **Example 3: Debug Failing Test**

```bash
# Run specific failing test in debug mode
npm test -- tests/checkout/checkout.spec.js --debug

# Or in UI mode
npm run test:ui
```

**In Debug Mode:**
- Step through test execution
- Inspect DOM elements
- Evaluate JavaScript expressions
- Take screenshots

---

### **Example 4: Run Tests with Custom Timeout**

```bash
npm test -- --timeout 180000
```
- Sets 3-minute timeout per test
- Useful for slow networks

---

### **Example 5: Run Tests in CI/CD Pipeline**

```bash
# Set CI environment variable
export CI=true

# Run tests with CI settings (retries enabled, single worker)
npm test
```

**CI Configuration:**
```javascript
// From playwright.config.js
retries: process.env.CI ? 2 : 0,  // Retry twice in CI
workers: process.env.CI ? 1 : undefined  // Single worker in CI
```

---

## 🏗️ Page Object Model (POM) Pattern

### **What is POM?**
POM is a design pattern that creates an object repository for web elements. Each page has a corresponding Page Object class containing:
- Element selectors
- Methods for user interactions
- Validation methods

### **Benefits:**
✅ **Maintainability** - Selectors in one place  
✅ **Reusability** - Page objects across multiple tests  
✅ **Readability** - Tests read like business logic  
✅ **Scalability** - Easy to add new tests  

### **POM Structure Example:**

```javascript
// Page Object
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
  
  // Methods
  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForNavigation({ waitUntil: 'load' });
  }
}
```

### **Using POM in Tests:**

```javascript
// Test using POM
test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('user@example.com', 'password123');
  // Assertions...
});
```

---

## 🧬 Test Structure & Best Practices

### **Test File Template:**

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Functionality', () => {
  let loginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });
  
  test('user can login with valid credentials', async () => {
    await loginPage.login('user@example.com', 'password123');
    // Assertion
  });
  
  test('error message appears for invalid credentials', async () => {
    await loginPage.login('invalid@example.com', 'wrongpass');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid credentials');
  });
});
```

### **Best Practices:**

1. **Descriptive Test Names** - Tests should clearly state what they verify
2. **Single Responsibility** - One test = one scenario
3. **Arrange-Act-Assert** - Setup → Execute → Verify
4. **Use Page Objects** - Avoid direct element interactions in tests
5. **Handle Waits Properly** - Use explicit waits, not hard sleep
6. **Error Handling** - Test both success and failure paths
7. **Test Data** - Use testData.js for constants

---

## ⚙️ Configuration Details

### **playwright.config.js Settings:**

| Setting | Value | Purpose |
|---------|-------|---------|
| `testDir` | `./tests` | Where test files are located |
| `fullyParallel` | `true` | Run tests simultaneously |
| `timeout` | `120000` (2 min) | Per-test timeout |
| `actionTimeout` | `15000` (15 sec) | Per-action timeout |
| `retries` | `0` / `2` (CI) | Retry failed tests |
| `workers` | `undefined` / `1` (CI) | Number of parallel workers |
| `reporter` | `html` | Generate HTML test report |
| `baseURL` | `https://demo.opencart.com/` | Application URL |
| `trace` | `on-first-retry` | Capture traces on failure |
| `screenshot` | `only-on-failure` | Capture screenshots on failure |

---

## 🐛 Troubleshooting

### **Issue 1: Tests Timeout**

**Symptoms:** "Test timeout of 120000ms exceeded"

**Solutions:**
```bash
# Increase timeout
npm test -- --timeout 180000

# Run on single browser first
npm test -- --project=chromium

# Run in headed mode to debug
npm run test:headed
```

---

### **Issue 2: Selectors Not Found**

**Symptoms:** "locator.click: Test timeout of 15000ms exceeded"

**Solution:** Verify selectors match actual page:
```javascript
// Use flexible attribute selectors
get loginButton() {
  return 'button:has-text("Login")';  // ✅ Flexible
  // NOT 'button.btn-login'           // ❌ Fragile
}
```

---

### **Issue 3: EPERM Permission Error**

**Symptoms:** "EPERM: operation not permitted, rmdir test-results"

**Solution:**
```bash
# Delete test-results folder
rm -rf test-results/

# Run tests again
npm test
```

---

### **Issue 4: Tests Fail on Specific Browser**

**Symptoms:** Tests pass on Chrome but fail on Firefox

**Solution:**
1. Run test in headed mode on failing browser:
```bash
npm test -- --project=firefox --headed
```

2. Check for browser-specific issues:
   - Timing differences
   - CSS selector compatibility
   - Local storage/cookies

---

### **Issue 5: Network Connectivity Issues**

**Symptoms:** Random test failures with "ERR_NAME_NOT_RESOLVED"

**Solution:**
```bash
# Verify network connectivity
ping demo.opencart.com

# Retry failed tests
npm test -- --retries 2

# Run with longer timeouts
npm test -- --timeout 180000
```

---

## 📈 Performance Optimization

### **Speed Up Test Execution**

```bash
# Run on single browser during development
npm test -- --project=chromium

# Run tests in parallel (default behavior)
npm test

# Skip specific slow tests
npm test -- --grep-invert "checkout"

# Use headed mode selectively
npm test -- --project=chromium --headed
```

### **Optimization Tips:**

1. **Reduce waits** - Use shorter waitForTimeout values
2. **Parallel execution** - Enabled by default (fullyParallel: true)
3. **Skip non-essential tests** - Run only affected tests during development
4. **Use single browser** - Test on Chrome first, then all browsers
5. **Cache data** - Reuse authentication across tests where possible

---

## 📚 Additional Resources

### **Playwright Documentation:**
- https://playwright.dev
- https://playwright.dev/docs/test-runners
- https://playwright.dev/docs/pom

### **OpenCart Demo:**
- https://demo.opencart.com/
- Admin: demo / demo

### **JavaScript Testing:**
- https://jestjs.io
- https://nodejs.org

---

## 📞 Support & Contribution

### **Running into Issues?**

1. **Check this documentation first**
2. **Review test output and error messages**
3. **Run test in debug mode** - `npm run test:debug`
4. **Check Playwright docs** - https://playwright.dev/docs/troubleshooting

### **Contributing New Tests:**

1. Create test file in appropriate `tests/` subdirectory
2. Follow naming convention: `feature.spec.js`
3. Use existing Page Objects or create new ones
4. Add test data to `utils/testData.js`
5. Run tests on all 3 browsers: `npm test`
6. Add screenshots/traces if needed

---

## 📝 Quick Reference

### **Execution Commands Summary:**

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests on all browsers |
| `npm test -- --project=chromium` | Chrome only |
| `npm test -- --project=firefox` | Firefox only |
| `npm test -- --project=webkit` | Safari only |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Step-through debugging |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:report` | View HTML report |
| `npx playwright codegen https://demo.opencart.com/` | Generate test code |

---

**Last Updated:** 2026-04-30  
**Project Version:** 1.0.0  
**Framework:** Playwright v1.x  
**Browsers Tested:** Chromium, Firefox, WebKit
