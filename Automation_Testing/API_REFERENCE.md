# 📖 Page Object API Reference

## Complete Reference for All Page Objects & Methods

---

## 🏠 HomePage API

**Location:** `pages/HomePage.js`

### Constructor

```javascript
const homePage = new HomePage(page);
```

### Methods

#### `navigate()`

Navigate to application home page.

```javascript
await homePage.navigate();
```

- **Parameters:** None
- **Returns:** Promise<void>
- **Timeout:** 60000ms
- **Example:**

```javascript
await homePage.navigate();
```

---

#### `search(searchTerm)`

Search for products using search bar.

```javascript
await homePage.search("iPhone");
```

- **Parameters:**
  - `searchTerm` (string) - Product search term
- **Returns:** Promise<void>
- **Example:**

```javascript
await homePage.search("Apple MacBook");
```

---

#### `clickAccountDropdown()`

Open account dropdown menu.

```javascript
await homePage.clickAccountDropdown();
```

- **Parameters:** None
- **Returns:** Promise<void>
- **Example:**

```javascript
await homePage.clickAccountDropdown();
// Menu is now visible
```

---

#### `clickLogin()`

Navigate to login page.

```javascript
await homePage.clickLogin();
```

- **Parameters:** None
- **Returns:** Promise<void>
- **Features:**
  - Tries UI click first
  - Falls back to direct navigation if needed
- **Example:**

```javascript
await homePage.clickLogin();
```

---

#### `clickRegister()`

Navigate to registration page.

```javascript
await homePage.clickRegister();
```

- **Parameters:** None
- **Returns:** Promise<void>
- **Example:**

```javascript
await homePage.clickRegister();
```

---

#### `clickCart()`

Navigate to shopping cart page.

```javascript
await homePage.clickCart();
```

- **Parameters:** None
- **Returns:** Promise<void>
- **Example:**

```javascript
await homePage.clickCart();
```

---

#### `clickCategory(categoryName)`

Click product category from menu.

```javascript
await homePage.clickCategory("Laptops");
```

- **Parameters:**
  - `categoryName` (string) - Category name to click
- **Returns:** Promise<void>
- **Example:**

```javascript
await homePage.clickCategory("Desktops");
```

---

#### `clickFirstProduct()`

Click first product in listing.

```javascript
await homePage.clickFirstProduct();
```

- **Parameters:** None
- **Returns:** Promise<void>
- **Example:**

```javascript
await homePage.clickFirstProduct();
```

---

#### `getProductCount()`

Get number of products displayed on page.

```javascript
const count = await homePage.getProductCount();
```

- **Parameters:** None
- **Returns:** Promise<number>
- **Example:**

```javascript
const productCount = await homePage.getProductCount();
console.log(`Found ${productCount} products`);
```

---

#### `isLogoVisible()`

Check if site logo is visible.

```javascript
const visible = await homePage.isLogoVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>
- **Example:**

```javascript
if (await homePage.isLogoVisible()) {
  console.log("Logo is visible");
}
```

---

#### `isSearchInputVisible()`

Check if search input field is visible.

```javascript
const visible = await homePage.isSearchInputVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

## 🔐 LoginPage API

**Location:** `pages/LoginPage.js`

### Constructor

```javascript
const loginPage = new LoginPage(page);
```

### Methods

#### `navigate()`

Navigate to login page.

```javascript
await loginPage.navigate();
```

- **Parameters:** None
- **Returns:** Promise<void>
- **Timeout:** 60000ms
- **Example:**

```javascript
await loginPage.navigate();
```

---

#### `login(email, password)`

Perform login action.

```javascript
await loginPage.login("user@example.com", "password123");
```

- **Parameters:**
  - `email` (string) - User email address
  - `password` (string) - User password
- **Returns:** Promise<void>
- **Features:**
  - Fills email field
  - Fills password field
  - Clicks login button
  - Waits for navigation
- **Example:**

```javascript
await loginPage.login("test@example.com", "TestPass123");
```

---

#### `getErrorMessage()`

Get error message text if displayed.

```javascript
const errorMsg = await loginPage.getErrorMessage();
```

- **Parameters:** None
- **Returns:** Promise<string | null>
- **Example:**

```javascript
const error = await loginPage.getErrorMessage();
if (error) {
  console.log("Error:", error);
}
```

---

#### `getSuccessMessage()`

Get success message text.

```javascript
const successMsg = await loginPage.getSuccessMessage();
```

- **Parameters:** None
- **Returns:** Promise<string | null>

---

#### `isEmailFieldVisible()`

Check if email field is visible.

```javascript
const visible = await loginPage.isEmailFieldVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

#### `isPasswordFieldVisible()`

Check if password field is visible.

```javascript
const visible = await loginPage.isPasswordFieldVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

#### `isLoginButtonVisible()`

Check if login button is visible.

```javascript
const visible = await loginPage.isLoginButtonVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

#### `isErrorMessageVisible()`

Check if error message is displayed.

```javascript
const visible = await loginPage.isErrorMessageVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

#### `clickForgotPassword()`

Click forgot password link.

```javascript
await loginPage.clickForgotPassword();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `isPageTitleVisible()`

Check if login page title is visible.

```javascript
const visible = await loginPage.isPageTitleVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

## 📝 RegisterPage API

**Location:** `pages/RegisterPage.js`

### Constructor

```javascript
const registerPage = new RegisterPage(page);
```

### Methods

#### `navigate()`

Navigate to registration page.

```javascript
await registerPage.navigate();
```

- **Parameters:** None
- **Returns:** Promise<void>
- **Timeout:** 60000ms

---

#### `fillRegistrationForm(userData)`

Fill registration form with user data.

```javascript
await registerPage.fillRegistrationForm({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  telephone: "1234567890",
  address: "123 Main St",
  city: "New York",
  postCode: "10001",
  country: "United States",
  zone: "New York",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
});
```

- **Parameters:**
  - `userData` (object) - Registration form data
    - `firstName` (string)
    - `lastName` (string)
    - `email` (string)
    - `telephone` (string)
    - `address` (string)
    - `city` (string)
    - `postCode` (string)
    - `country` (string)
    - `zone` (string)
    - `password` (string)
    - `confirmPassword` (string)
- **Returns:** Promise<void>
- **Timeout:** 10000ms per field

---

#### `acceptTermsAndConditions()`

Check terms and conditions checkbox.

```javascript
await registerPage.acceptTermsAndConditions();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `submitRegistration()`

Submit registration form.

```javascript
await registerPage.submitRegistration();
```

- **Parameters:** None
- **Returns:** Promise<void>
- **Features:**
  - Accepts terms first
  - Clicks continue button
  - Waits for navigation

---

#### `registerUser(userData)`

Complete registration flow (navigate → fill → submit).

```javascript
await registerPage.registerUser(userData);
```

- **Parameters:**
  - `userData` (object) - Same as fillRegistrationForm
- **Returns:** Promise<void>
- **Example:**

```javascript
await registerPage.registerUser({
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  telephone: "9876543210",
  address: "456 Oak Ave",
  city: "Los Angeles",
  postCode: "90001",
  country: "United States",
  zone: "California",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
});
```

---

#### `getErrorMessage()`

Get validation error message.

```javascript
const error = await registerPage.getErrorMessage();
```

- **Parameters:** None
- **Returns:** Promise<string | null>

---

#### `isErrorMessageVisible()`

Check if error message is displayed.

```javascript
const visible = await registerPage.isErrorMessageVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

#### `isPageTitleVisible()`

Check if registration page title is visible.

```javascript
const visible = await registerPage.isPageTitleVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

#### `getSuccessMessage()`

Get success message after registration.

```javascript
const message = await registerPage.getSuccessMessage();
```

- **Parameters:** None
- **Returns:** Promise<string | null>

---

## 🛍️ ProductPage API

**Location:** `pages/ProductPage.js`

### Constructor

```javascript
const productPage = new ProductPage(page);
```

### Methods

#### `navigateToProduct(productName)`

Click product link to navigate to product page.

```javascript
await productPage.navigateToProduct("iPhone");
```

- **Parameters:**
  - `productName` (string) - Product name to click
- **Returns:** Promise<void>

---

#### `getProductName()`

Get product title/name.

```javascript
const name = await productPage.getProductName();
```

- **Parameters:** None
- **Returns:** Promise<string | null>
- **Example:**

```javascript
const productName = await productPage.getProductName();
console.log(`Product: ${productName}`);
```

---

#### `getProductPrice()`

Get product price.

```javascript
const price = await productPage.getProductPrice();
```

- **Parameters:** None
- **Returns:** Promise<string | null>

---

#### `getProductDescription()`

Get product description text.

```javascript
const description = await productPage.getProductDescription();
```

- **Parameters:** None
- **Returns:** Promise<string | null>

---

#### `setQuantity(quantity)`

Set purchase quantity.

```javascript
await productPage.setQuantity(3);
```

- **Parameters:**
  - `quantity` (number) - Quantity to set
- **Returns:** Promise<void>

---

#### `addToCart()`

Click add to cart button.

```javascript
await productPage.addToCart();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `addToCartWithQuantity(quantity)`

Set quantity and add to cart.

```javascript
await productPage.addToCartWithQuantity(2);
```

- **Parameters:**
  - `quantity` (number) - Quantity to add
- **Returns:** Promise<void>
- **Example:**

```javascript
await productPage.addToCartWithQuantity(5);
```

---

#### `getSuccessMessage()`

Get add-to-cart success message.

```javascript
const message = await productPage.getSuccessMessage();
```

- **Parameters:** None
- **Returns:** Promise<string | null>

---

#### `isSuccessMessageVisible()`

Check if success message is displayed.

```javascript
const visible = await productPage.isSuccessMessageVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

#### `getErrorMessage()`

Get error message if any.

```javascript
const error = await productPage.getErrorMessage();
```

- **Parameters:** None
- **Returns:** Promise<string | null>

---

#### `isAddToCartButtonVisible()`

Check if add to cart button is visible.

```javascript
const visible = await productPage.isAddToCartButtonVisible();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

#### `getRelatedProductsCount()`

Get number of related products shown.

```javascript
const count = await productPage.getRelatedProductsCount();
```

- **Parameters:** None
- **Returns:** Promise<number>

---

#### `selectOption(optionIndex, optionValue)`

Select product option (size, color, etc.).

```javascript
await productPage.selectOption(0, "Red");
```

- **Parameters:**
  - `optionIndex` (number) - Option dropdown index
  - `optionValue` (string) - Option value to select
- **Returns:** Promise<void>

---

#### `clickWishlist()`

Add product to wishlist.

```javascript
await productPage.clickWishlist();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `clickCompare()`

Add product to compare list.

```javascript
await productPage.clickCompare();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `navigateByUrl(url)`

Navigate directly to product via URL.

```javascript
await productPage.navigateByUrl("https://demo.opencart.com/product/123");
```

- **Parameters:**
  - `url` (string) - Product URL
- **Returns:** Promise<void>

---

## 🛒 CartPage API

**Location:** `pages/CartPage.js`

### Constructor

```javascript
const cartPage = new CartPage(page);
```

### Methods

#### `navigate()`

Navigate to shopping cart page.

```javascript
await cartPage.navigate();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `getCartItemCount()`

Get number of items in cart.

```javascript
const count = await cartPage.getCartItemCount();
```

- **Parameters:** None
- **Returns:** Promise<number>

---

#### `getCartTotal()`

Get cart total price.

```javascript
const total = await cartPage.getCartTotal();
```

- **Parameters:** None
- **Returns:** Promise<string>

---

#### `updateQuantity(itemIndex, quantity)`

Update item quantity.

```javascript
await cartPage.updateQuantity(0, 5);
```

- **Parameters:**
  - `itemIndex` (number) - Item index in cart
  - `quantity` (number) - New quantity
- **Returns:** Promise<void>

---

#### `removeItem(itemIndex)`

Remove item from cart.

```javascript
await cartPage.removeItem(0);
```

- **Parameters:**
  - `itemIndex` (number) - Item index to remove
- **Returns:** Promise<void>

---

#### `getItemPrice(itemIndex)`

Get price of specific cart item.

```javascript
const price = await cartPage.getItemPrice(0);
```

- **Parameters:**
  - `itemIndex` (number) - Item index
- **Returns:** Promise<string>

---

#### `proceedToCheckout()`

Click proceed to checkout button.

```javascript
await cartPage.proceedToCheckout();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `continueShopping()`

Click continue shopping button.

```javascript
await cartPage.continueShopping();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `isCartEmpty()`

Check if cart is empty.

```javascript
const empty = await cartPage.isCartEmpty();
```

- **Parameters:** None
- **Returns:** Promise<boolean>

---

#### `clearCart()`

Remove all items from cart.

```javascript
await cartPage.clearCart();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

## 💳 CheckoutPage API

**Location:** `pages/CheckoutPage.js`

### Constructor

```javascript
const checkoutPage = new CheckoutPage(page);
```

### Methods

#### `navigate()`

Navigate to checkout page.

```javascript
await checkoutPage.navigate();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `proceedAsGuest()`

Select guest checkout option.

```javascript
await checkoutPage.proceedAsGuest();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `fillBillingAddress(userData)`

Fill billing address information.

```javascript
await checkoutPage.fillBillingAddress({
  firstName: "John",
  lastName: "Doe",
  address: "123 Main St",
  city: "New York",
  postCode: "10001",
  country: "United States",
  zone: "New York",
});
```

- **Parameters:**
  - `userData` (object) - Address data
    - `firstName` (string)
    - `lastName` (string)
    - `address` (string)
    - `city` (string)
    - `postCode` (string)
    - `country` (string)
    - `zone` (string)
- **Returns:** Promise<void>

---

#### `continueBillingAddress()`

Click continue button after billing address.

```javascript
await checkoutPage.continueBillingAddress();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `continueShippingAddress()`

Click continue button after shipping address.

```javascript
await checkoutPage.continueShippingAddress();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `selectShippingMethod(methodIndex)`

Select shipping method.

```javascript
await checkoutPage.selectShippingMethod(0);
```

- **Parameters:**
  - `methodIndex` (number, default: 0) - Shipping method index
- **Returns:** Promise<void>

---

#### `continueShippingMethod()`

Click continue button after selecting shipping.

```javascript
await checkoutPage.continueShippingMethod();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `selectPaymentMethod(methodIndex)`

Select payment method.

```javascript
await checkoutPage.selectPaymentMethod(0);
```

- **Parameters:**
  - `methodIndex` (number, default: 0) - Payment method index
- **Returns:** Promise<void>

---

#### `continuePaymentMethod()`

Click continue button after payment selection.

```javascript
await checkoutPage.continuePaymentMethod();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `continuePayment()`

Click continue payment button.

```javascript
await checkoutPage.continuePayment();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `acceptTermsAndConditions()`

Check terms and conditions checkbox.

```javascript
await checkoutPage.acceptTermsAndConditions();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `confirmOrder()`

Accept terms and confirm order.

```javascript
await checkoutPage.confirmOrder();
```

- **Parameters:** None
- **Returns:** Promise<void>

---

#### `isOrderSuccessful()`

Check if order was successful.

```javascript
const successful = await checkoutPage.isOrderSuccessful();
```

- **Parameters:** None
- **Returns:** Promise<boolean>
- **Example:**

```javascript
if (await checkoutPage.isOrderSuccessful()) {
  console.log("Order placed successfully!");
}
```

---

#### `getOrderNumber()`

Get order confirmation number.

```javascript
const orderNumber = await checkoutPage.getOrderNumber();
```

- **Parameters:** None
- **Returns:** Promise<string | null>

---

#### `getSuccessMessage()`

Get order success message.

```javascript
const message = await checkoutPage.getSuccessMessage();
```

- **Parameters:** None
- **Returns:** Promise<string | null>

---

## 📝 Complete Test Example

Using all Page Objects together:

```javascript
import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

test("complete end-to-end shopping flow", async ({ page }) => {
  // Initialize page objects
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Navigate to home
  await homePage.navigate();

  // Step 2: Search for product
  await homePage.search("iPhone");
  await homePage.clickFirstProduct();

  // Step 3: Add to cart
  await productPage.addToCartWithQuantity(1);
  expect(await productPage.isSuccessMessageVisible()).toBeTruthy();

  // Step 4: Go to cart
  await homePage.clickCart();
  expect(await cartPage.getCartItemCount()).toBeGreaterThan(0);

  // Step 5: Checkout
  await cartPage.proceedToCheckout();
  await checkoutPage.proceedAsGuest();

  // Step 6: Fill billing address
  await checkoutPage.fillBillingAddress({
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    city: "New York",
    postCode: "10001",
    country: "United States",
    zone: "New York",
  });
  await checkoutPage.continueBillingAddress();

  // Step 7: Select shipping and payment
  await checkoutPage.selectShippingMethod(0);
  await checkoutPage.continueShippingMethod();
  await checkoutPage.selectPaymentMethod(0);
  await checkoutPage.continuePaymentMethod();

  // Step 8: Confirm order
  await checkoutPage.confirmOrder();
  expect(await checkoutPage.isOrderSuccessful()).toBeTruthy();

  const orderNumber = await checkoutPage.getOrderNumber();
  console.log(`Order confirmed: ${orderNumber}`);
});
```

---

## 🔗 Related Documentation

- See **DOCUMENTATION.md** for detailed project information
- See **QUICK_START.md** for quick start guide
- See individual test files for usage examples
- Check **utils/testData.js** for test data

---

**Last Updated:** 2026-04-30  
**Playwright Version:** v1.x  
**OpenCart Demo:** https://demo.opencart.com/
