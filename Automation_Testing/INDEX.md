# 📚 Documentation Index

## Complete Documentation for OpenCart Automation Testing Suite

Welcome! This index will guide you through all available documentation.

---

## 🚀 Quick Links

### **🔥 Start Here**

- **[QUICK_START.md](QUICK_START.md)** - 5-minute setup and first test run

### **📖 Comprehensive Guides**

- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Complete project documentation
- **[TEST_EXECUTION_GUIDE.md](TEST_EXECUTION_GUIDE.md)** - How to run tests
- **[API_REFERENCE.md](API_REFERENCE.md)** - All page object methods

---

## 📄 Documentation Files Overview

### 1. **QUICK_START.md** ⚡

**Best for:** Getting started immediately  
**Length:** 5 minutes to read  
**Covers:**

- 5-minute setup instructions
- Basic project structure
- Common commands
- What each file does
- Quick troubleshooting

**Read this first if:** You want to run your first test now

---

### 2. **DOCUMENTATION.md** 📖

**Best for:** Deep understanding of the project  
**Length:** 20-30 minutes to read  
**Covers:**

- Complete project overview
- Detailed file descriptions
  - All 6 page objects (HomePage, LoginPage, RegisterPage, ProductPage, CartPage, CheckoutPage)
  - All test files (auth, product, cart, checkout)
  - Utility and fixture files
- Installation & setup steps
- Page Object Model (POM) pattern explanation
- Test structure & best practices
- Configuration details
- Troubleshooting guide

**Read this if:** You want comprehensive understanding of the project

---

### 3. **TEST_EXECUTION_GUIDE.md** 🎬

**Best for:** Learning how to run tests  
**Length:** 15-20 minutes to read  
**Covers:**

- 10 different execution scenarios
- Common test workflows
- Performance & optimization tips
- Examples with expected output
- Troubleshooting test execution
- Command reference table
- Best practices

**Read this if:** You want to master different ways to run tests

---

### 4. **API_REFERENCE.md** 📖

**Best for:** Reference while writing tests  
**Length:** Quick lookup (keep nearby)  
**Covers:**

- Complete API for all page objects
- Every method with parameters and return types
- Usage examples for each method
- Complete end-to-end test example
- Grouped by page object

**Read this if:** You're writing tests and need method details

---

## 🎯 Reading Recommendations

### **Scenario A: I'm Brand New to This Project**

1. Start: **QUICK_START.md** (5 min)
2. Read: **DOCUMENTATION.md** - Project Overview section (5 min)
3. Do: Run `npm test -- --project=chromium` (10 min)
4. Reference: **API_REFERENCE.md** when writing tests

---

### **Scenario B: I Need to Run Tests**

1. Quick reference: **TEST_EXECUTION_GUIDE.md** (2 min for relevant scenario)
2. Run: Appropriate command from guide
3. Troubleshoot: Use Troubleshooting section as needed

---

### **Scenario C: I'm Writing a New Test**

1. Review: **DOCUMENTATION.md** - Test Files Explained (5 min)
2. Study: Example test in **API_REFERENCE.md** (5 min)
3. Reference: **API_REFERENCE.md** while writing
4. Execute: Use **TEST_EXECUTION_GUIDE.md** to run your test

---

### **Scenario D: I'm Debugging a Failing Test**

1. Check: **TEST_EXECUTION_GUIDE.md** - Troubleshooting section
2. Run: Headed mode: `npm run test:headed`
3. Reference: **API_REFERENCE.md** to understand methods
4. Modify: Test or page object
5. Verify: Re-run using appropriate command from **TEST_EXECUTION_GUIDE.md**

---

### **Scenario E: I Have a Specific Question**

- **"How do I run tests?"** → **TEST_EXECUTION_GUIDE.md**
- **"What does HomePage.js do?"** → **DOCUMENTATION.md** → File Descriptions
- **"How do I use loginPage.login()?"** → **API_REFERENCE.md** → LoginPage API
- **"What's the project structure?"** → **DOCUMENTATION.md** → Project Structure
- **"How do I write a test?"** → **API_REFERENCE.md** → Complete Test Example
- **"What's Page Object Model?"** → **DOCUMENTATION.md** → POM Pattern
- **"I get EPERM error"** → **DOCUMENTATION.md** → Troubleshooting

---

## 📊 File Descriptions Quick Reference

### **Page Objects (pages/ directory)**

- **HomePage.js** - Home page navigation, search, product browsing
- **LoginPage.js** - User login, error messages, forgot password
- **RegisterPage.js** - User registration form, validation
- **ProductPage.js** - Product details, add to cart, reviews
- **CartPage.js** - Shopping cart operations
- **CheckoutPage.js** - Multi-step checkout process

### **Tests (tests/ directory)**

- **tests/auth/** - Login and registration tests
- **tests/product/** - Product browsing and search tests
- **tests/cart/** - Shopping cart tests
- **tests/checkout/** - Checkout process tests

### **Utilities (utils/ directory)**

- **testData.js** - Test user credentials and data
- **helpers.js** - Reusable helper functions

### **Configuration**

- **playwright.config.js** - Playwright test configuration
- **package.json** - Project dependencies and npm scripts
- **fixtures/setup.js** - Custom Playwright fixtures

---

## 🚀 Common Commands Reference

```bash
# Installation
npm install
npx playwright install

# Testing
npm test                                    # All tests, all browsers
npm test -- --project=chromium             # Chrome only
npm run test:headed                        # Run with visible browser
npm run test:debug                         # Interactive debugging
npm run test:ui                            # Interactive UI mode
npm run test:report                        # View HTML report

# Development
npm test -- tests/auth/login.spec.js       # Specific test file
npm test -- --grep "login"                 # Tests matching pattern
npm test -- --timeout 180000               # Custom timeout
```

---

## 📈 Key Concepts

### **Page Object Model (POM)**

A design pattern where each web page has a corresponding object containing:

- Element selectors
- User interaction methods
- Validation methods

**Benefit:** Makes tests more maintainable and readable

### **Selectors**

CSS selectors used to find elements on the page:

- `'input[name="email"]'` - Input by name attribute
- `'button:has-text("Login")'` - Button by text content
- `'a[href*="account"]'` - Link by partial href

### **Async/Await**

JavaScript pattern for handling asynchronous operations:

```javascript
await page.navigate(); // Wait for navigation to complete
```

### **Test Fixtures**

Reusable test setup that provides page objects:

```javascript
test("example", async ({ homePage, loginPage }) => {
  // page objects already initialized
});
```

---

## 🎓 Learning Path

### **Level 1: Basics (30 minutes)**

1. Read: **QUICK_START.md**
2. Run: `npm test -- --project=chromium`
3. View: HTML report with `npm run test:report`

### **Level 2: Understanding (1-2 hours)**

1. Read: **DOCUMENTATION.md**
2. Study: One page object (e.g., LoginPage.js)
3. Study: One test file (e.g., tests/auth/login.spec.js)
4. Review: **API_REFERENCE.md** for the page objects you studied

### **Level 3: Writing Tests (2-3 hours)**

1. Create a simple test file
2. Reference **API_REFERENCE.md** for method signatures
3. Use **TEST_EXECUTION_GUIDE.md** to run your test
4. Debug using headed mode or debug mode

### **Level 4: Mastery (Ongoing)**

1. Create complex tests with multiple page objects
2. Master different execution scenarios from **TEST_EXECUTION_GUIDE.md**
3. Optimize and maintain existing tests
4. Add new page objects for new pages

---

## 🔗 Cross-References

### **Documentation to File Mappings**

| Doc Reference  | File Path                         |
| -------------- | --------------------------------- |
| HomePage       | `pages/HomePage.js`               |
| LoginPage      | `pages/LoginPage.js`              |
| RegisterPage   | `pages/RegisterPage.js`           |
| ProductPage    | `pages/ProductPage.js`            |
| CartPage       | `pages/CartPage.js`               |
| CheckoutPage   | `pages/CheckoutPage.js`           |
| Login Tests    | `tests/auth/login.spec.js`        |
| Register Tests | `tests/auth/register.spec.js`     |
| Browse Tests   | `tests/product/browse.spec.js`    |
| Search Tests   | `tests/product/search.spec.js`    |
| Cart Tests     | `tests/cart/cart.spec.js`         |
| Checkout Tests | `tests/checkout/checkout.spec.js` |
| Test Data      | `utils/testData.js`               |
| Helpers        | `utils/helpers.js`                |
| Fixtures       | `fixtures/setup.js`               |

---

## ❓ FAQ

### **Q: Which documentation should I read first?**

**A:** Start with **QUICK_START.md** for immediate getting started, then **DOCUMENTATION.md** for comprehensive understanding.

### **Q: How do I run a specific test?**

**A:** See **TEST_EXECUTION_GUIDE.md** - Scenario 5 (Run Specific Test File)

### **Q: What methods are available on HomePage?**

**A:** See **API_REFERENCE.md** - HomePage API section

### **Q: How do I debug a failing test?**

**A:** See **TEST_EXECUTION_GUIDE.md** - Workflow 2 (Debug Failing Test)

### **Q: What's the Page Object Model pattern?**

**A:** See **DOCUMENTATION.md** - Page Object Model (POM) Pattern section

### **Q: How do I write a test?**

**A:** See **API_REFERENCE.md** - Complete Test Example section

### **Q: How long do tests take?**

**A:** See **TEST_EXECUTION_GUIDE.md** - Command Reference Table for durations

### **Q: I get a permission error, what do I do?**

**A:** See **DOCUMENTATION.md** - Troubleshooting - Issue 3: EPERM Permission Error

---

## 📞 Support Resources

### **Internal Documentation**

- **QUICK_START.md** - Get started immediately
- **DOCUMENTATION.md** - Comprehensive project guide
- **TEST_EXECUTION_GUIDE.md** - How to run tests
- **API_REFERENCE.md** - Page object methods

### **External Resources**

- **Playwright Docs:** https://playwright.dev/docs/test-runners
- **Page Object Model:** https://playwright.dev/docs/pom
- **OpenCart Demo:** https://demo.opencart.com/

---

## 📝 Documentation Map

```
Documentation/
├── QUICK_START.md ..................... Start here (5 min)
├── DOCUMENTATION.md ................... Comprehensive guide (30 min)
├── TEST_EXECUTION_GUIDE.md ........... How to run tests (20 min)
├── API_REFERENCE.md ................... Method reference (lookup)
└── INDEX.md ........................... This file

Code/
├── pages/ ............................ Page objects (6 files)
├── tests/ ............................ Test files (6 files)
├── utils/ ............................ Utilities (2 files)
├── fixtures/ ......................... Fixtures (1 file)
├── playwright.config.js .............. Configuration
├── package.json ....................... Dependencies
└── SETUP.md ........................... Setup guide
```

---

## ✅ Checklist for New Users

- [ ] Read **QUICK_START.md**
- [ ] Run `npm install && npx playwright install`
- [ ] Run `npm test -- --project=chromium`
- [ ] View results with `npm run test:report`
- [ ] Read **DOCUMENTATION.md** sections 1-3
- [ ] Study one page object file
- [ ] Study one test file
- [ ] Review **API_REFERENCE.md** for that page object
- [ ] Try writing a simple test
- [ ] Bookmark **TEST_EXECUTION_GUIDE.md** for commands

---

## 🎯 Next Steps

1. **Now:** Read **QUICK_START.md** (5 min)
2. **Then:** Run your first test (10 min)
3. **Next:** Read **DOCUMENTATION.md** (30 min)
4. **Finally:** Review **API_REFERENCE.md** and start writing tests

---

## 📊 Documentation Statistics

| Document                | Length      | Reading Time | Use For                     |
| ----------------------- | ----------- | ------------ | --------------------------- |
| QUICK_START.md          | 200 lines   | 5 min        | Getting started             |
| DOCUMENTATION.md        | 1000+ lines | 30 min       | Comprehensive understanding |
| TEST_EXECUTION_GUIDE.md | 600+ lines  | 20 min       | Running tests               |
| API_REFERENCE.md        | 800+ lines  | Lookup       | Method reference            |

**Total Documentation:** 2600+ lines covering all aspects of the project

---

## 🚀 Pro Tips

1. **Keep API_REFERENCE.md nearby** - Quick lookup while coding
2. **Bookmark TEST_EXECUTION_GUIDE.md** - Reference while running tests
3. **Use Ctrl+F** to search documentation for keywords
4. **Read QUICK_START.md first** - Fastest way to get running
5. **Run tests frequently** - See results early and often

---

**Last Updated:** 2026-04-30  
**Project Version:** 1.0.0  
**Framework:** Playwright v1.x  
**Browsers:** Chromium, Firefox, WebKit

---

## 📞 Questions?

Use this guide to find answers:

1. Use **Quick Links** above for specific topics
2. Check **FAQ** section for common questions
3. Search documentation using Ctrl+F
4. Review relevant sections from **Reading Recommendations**
5. Consult **External Resources** for framework-specific questions

**Happy Testing! 🎉**
