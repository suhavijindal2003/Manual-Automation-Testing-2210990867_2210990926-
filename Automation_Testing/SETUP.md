# End-to-End Automation Testing Setup Guide

## ✅ What's Included

- **Page Objects**: HomePage, LoginPage, RegisterPage, ProductPage, CartPage, CheckoutPage
- **Test Suites**: 255 tests across authentication, products, cart, and checkout flows
- **Utilities**: Test data, helpers, and configuration
- **NPM Scripts**: Easy commands to run tests

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Update Selectors for OpenCart Demo Site

The tests are timing out because selectors don't match the actual site. You need to update them:

**Option A: Using Playwright Inspector (Recommended)**

```bash
npm run test:ui
```

This opens Playwright in UI mode where you can:

- Inspect elements on the page
- Find the correct CSS selectors
- Update `selectors.config.js`

**Option B: Manual Inspection**

1. Open https://demo.opencart.com/ in browser
2. Right-click on product items → Inspect
3. Find the class/id attribute
4. Update `selectors.config.js` with correct selectors
5. Update page objects to use these selectors

### 3. Key Selectors to Find

**Homepage Product Items** (Most Important)

- Look for: `<div class="..." data-product-id="...">` or similar
- Update `HomePage.js` line 34: `get featuredProducts()`
- Example: `.product-item`, `[class*="product"]`, `div.card`

**Login Form**

- Email input, password input, login button
- Check `LoginPage.js`

**Cart**

- Cart items table, total price, remove buttons
- Check `CartPage.js`

## 📋 Running Tests

```bash
# All tests
npm test

# Specific test suite
npm run test:auth          # Authentication tests only
npm run test:product       # Product tests only
npm run test:cart          # Cart tests only
npm run test:checkout      # Checkout tests only

# With UI (easier for debugging)
npm run test:ui

# Debug mode (opens DevTools)
npm run test:debug

# View HTML report
npm run test:report
```

## 🔧 Troubleshooting

### Tests Timeout

- **Cause**: Selectors don't match actual site elements
- **Fix**: Update selectors in `selectors.config.js` and page objects

### Element Not Found

- **Cause**: Incorrect CSS selectors
- **Fix**: Use browser inspector to find correct selector
- **Tip**: Use more flexible selectors: `a[href*="login"]` instead of exact classes

### Network Timeout

- **Cause**: Site is slow to load
- **Fix**: Already using `waitForLoadState('load')` instead of `networkidle`
- **More Fix**: Can increase timeout in `playwright.config.js`

## 📁 Project Structure

```
├── pages/                  # Page Object Models
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/                  # Test files
│   ├── auth/              # Login & Register tests
│   ├── product/           # Product browsing & search tests
│   ├── cart/              # Shopping cart tests
│   └── checkout/          # Checkout tests
├── utils/                 # Utilities
│   ├── testData.js        # Test data & users
│   └── helpers.js         # Helper functions
├── selectors.config.js    # Selector configuration
└── playwright.config.js   # Playwright configuration
```

## 🎯 Next Steps

1. **Update Selectors**: Run `npm run test:ui` and inspect elements
2. **Update Page Objects**: Modify selectors in each page file
3. **Run Tests**: Use `npm test` to validate
4. **View Results**: Use `npm run test:report` to see detailed results

## 💡 Tips

- Start with just `npm run test:product` to debug selector issues
- Use `npm run test:ui` for interactive debugging
- Check `test-results/` folder for detailed error logs
- Page objects are in `pages/` - update them with correct selectors

## 📝 Test Data

Edit `utils/testData.js` to customize:

- Test user credentials
- Product search terms
- Order data
- Custom timeouts

## ✨ Examples

**Find Product Selector**:

1. Open https://demo.opencart.com/
2. Right-click on any product → Inspect
3. Look for repeating div structure
4. Update `HomePage.js` line 34

**Find Login Button**:

1. Navigate to login page
2. Inspect login button
3. Copy selector (e.g., `button[type="submit"]`)
4. Update `LoginPage.js` line 18
