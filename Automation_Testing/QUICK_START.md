# 🚀 Quick Start Guide

## ⚡ Get Started in 5 Minutes

### **Step 1: Install Dependencies**

```bash
cd "c:\Users\Pc\OneDrive\Desktop\Project of sem 8 COPYRIGHT\Automation_Testing"
npm install
npx playwright install
```

### **Step 2: Run Tests**

**Run all tests across all 3 browsers (Chromium, Firefox, WebKit):**

```bash
npm test
```

**Run tests on single browser:**

```bash
# Chrome only
npm test -- --project=chromium

# Firefox only
npm test -- --project=firefox

# Safari only
npm test -- --project=webkit
```

### **Step 3: View Results**

```bash
npm run test:report
```

Opens interactive HTML report with pass/fail details.

---

## 📁 Project Directory Structure

```
Automation_Testing/
├── pages/                 # Page Object Models
│   ├── HomePage.js       # Home page interactions
│   ├── LoginPage.js      # Login page interactions
│   ├── RegisterPage.js   # Registration page interactions
│   ├── ProductPage.js    # Product page interactions
│   ├── CartPage.js       # Cart page interactions
│   └── CheckoutPage.js   # Checkout page interactions
│
├── tests/                # Test files
│   ├── auth/             # Authentication tests
│   ├── product/          # Product tests
│   ├── cart/             # Cart tests
│   └── checkout/         # Checkout tests
│
├── fixtures/             # Playwright fixtures
│   └── setup.js          # Custom fixtures
│
├── utils/                # Utility files
│   ├── testData.js       # Test data constants
│   └── helpers.js        # Helper functions
│
├── playwright.config.js  # Test configuration
├── package.json          # Project dependencies
└── DOCUMENTATION.md      # Detailed documentation
```

---

## 🎯 What Each File Does

### **Page Objects (pages/)**

- **HomePage.js** - Handle home page navigation, search, product browsing
- **LoginPage.js** - Handle login, error messages, forgot password
- **RegisterPage.js** - Handle user registration form and validation
- **ProductPage.js** - Handle product details, add to cart, reviews
- **CartPage.js** - Handle cart operations, item management
- **CheckoutPage.js** - Handle multi-step checkout process

### **Tests (tests/)**

- **tests/auth/** - Login and registration tests
- **tests/product/** - Product browsing and search tests
- **tests/cart/** - Shopping cart operation tests
- **tests/checkout/** - Checkout process tests

### **Utilities (utils/)**

- **testData.js** - Test user credentials, product data
- **helpers.js** - Common functions (wait, retry, format, etc.)

---

## 🎬 Common Commands

| Command                          | Purpose                      |
| -------------------------------- | ---------------------------- |
| `npm test`                       | Run all tests all 3 browsers |
| `npm test -- --project=chromium` | Chrome only                  |
| `npm test -- --project=firefox`  | Firefox only                 |
| `npm test -- --project=webkit`   | Safari only                  |
| `npm run test:headed`            | Run with visible browser     |
| `npm run test:debug`             | Debug mode with inspector    |
| `npm run test:ui`                | Interactive UI test runner   |
| `npm run test:report`            | View HTML test report        |

---

## 📊 Test Coverage

The test suite covers:

- ✅ **Authentication** - Login, Registration (2 test files)
- ✅ **Product Browsing** - View products, search, filters (2 test files)
- ✅ **Shopping Cart** - Add/remove items, update quantity (1 test file)
- ✅ **Checkout** - Complete purchase flow (1 test file)
- ✅ **Cross-Browser** - Chromium, Firefox, WebKit

**Total: ~255+ test cases across 3 browsers**

---

## 🔧 Understanding Page Object Model (POM)

Each page has a corresponding Page Object:

```javascript
// Page Object (pages/LoginPage.js)
export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  get emailInput() {
    return 'input[name="email"]';
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    // ... more actions
  }
}
```

```javascript
// Test using Page Object (tests/auth/login.spec.js)
test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("user@example.com", "password123");
  // Verify login success
});
```

**Benefits:**

- Selectors in one place
- Reusable across tests
- Easy to maintain
- More readable tests

---

## 🐛 Troubleshooting

### **Tests timeout?**

```bash
# Run on single browser
npm test -- --project=chromium

# Run in headed mode to see what's happening
npm run test:headed
```

### **Permission error (EPERM)?**

```bash
# Delete test-results folder
rm -rf test-results/

# Run tests again
npm test
```

### **Selectors not found?**

1. Check the page object selectors match actual site
2. Run test in headed mode to inspect elements
3. Use flexible selectors: `'button:has-text("Login")'`

### **Tests fail on one browser only?**

```bash
# Run on that specific browser in headed mode
npm test -- --project=firefox --headed
```

---

## 📈 Performance Tips

1. **During development** - Use single browser: `npm test -- --project=chromium`
2. **Before committing** - Run all browsers: `npm test`
3. **In CI/CD** - Retries enabled automatically
4. **Debugging** - Use headed mode: `npm run test:headed`

---

## 📞 Need Help?

1. **Read DOCUMENTATION.md** for detailed explanations
2. **Check test output** - Error messages guide you
3. **Run in debug mode** - `npm run test:debug`
4. **Enable traces** - `npm test -- --trace on`
5. **Check Playwright docs** - https://playwright.dev/docs/troubleshooting

---

## 🎓 Next Steps

1. ✅ Run `npm test` to validate setup
2. ✅ Review DOCUMENTATION.md for detailed info
3. ✅ Check tests/auth/login.spec.js to understand test structure
4. ✅ Review pages/LoginPage.js to understand Page Objects
5. ✅ Add new tests following existing patterns

---

**Happy Testing! 🎉**
