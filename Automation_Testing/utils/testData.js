// Test data for OpenCart automation testing

export const testUsers = {
  newUser: {
    firstName: 'John',
    lastName: 'Doe',
    email: `testuser_${Date.now()}@test.com`,
    telephone: '1234567890',
    password: 'Test@123456',
    confirmPassword: 'Test@123456',
    address: '123 Main Street',
    city: 'New York',
    postCode: '10001',
    country: 'United States',
    zone: 'New York'
  },

  validLogin: {
    email: 'test@test.com',
    password: 'Test@123456'
  },

  invalidCredentials: {
    email: 'invalid@test.com',
    password: 'WrongPassword123'
  }
};

export const products = {
  search: {
    term: 'MacBook',
    expectedResults: 2
  },

  categoryProducts: {
    category: 'Laptops & Notebooks',
    subcategory: 'Macs'
  }
};

export const orderData = {
  paymentMethod: 'COD', // Cash on Delivery
  shippingMethod: 'Flat Shipping Rate',
  comments: 'Please handle with care'
};

export const testConfig = {
  baseUrl: 'https://demo.opencart.com/',
  timeout: 30000,
  navigationWaitTime: 5000
};
