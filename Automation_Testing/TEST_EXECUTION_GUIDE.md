# 🎬 Test Execution Guide & Examples

## Complete Guide to Running Tests with Examples

---

## 📊 Execution Scenarios

### **Scenario 1: Full Cross-Browser Test Run**

**Purpose:** Validate entire test suite across all 3 browsers  
**Use Case:** Before pushing code, final validation  
**Duration:** ~20-30 minutes

```bash
# Command
npm test

# What happens:
# - Runs all tests in tests/ directory
# - Executes on Chromium (Chrome)
# - Executes on Firefox
# - Executes on WebKit (Safari)
# - Generates HTML report

# Expected output:
# ✓ 255+ tests passed across 3 browsers
# ✓ HTML report generated in test-results/
# ✓ All tests should pass
```

**Verification:**

```bash
# View the HTML report
npm run test:report
```

---

### **Scenario 2: Single Browser Testing (Development)**

**Purpose:** Quick feedback during development  
**Use Case:** While writing/fixing tests  
**Duration:** ~5-10 minutes

```bash
# Chrome only
npm test -- --project=chromium

# Firefox only
npm test -- --project=firefox

# Safari only
npm test -- --project=webkit

# Which to use?
# - Use Chrome for fastest feedback during development
# - Switch to Firefox/Safari when you see consistent Chrome passes
# - Run all 3 before committing
```

**Example Session:**

```bash
# 1. Start development with Chrome
npm test -- --project=chromium

# 2. Fix failing tests and re-run
npm test -- --project=chromium

# 3. Once Chrome tests pass, test Firefox
npm test -- --project=firefox

# 4. Finally, test Safari
npm test -- --project=webkit

# 5. If all pass, run full suite
npm test
```

---

### **Scenario 3: Headed Mode Testing (Visual Debugging)**

**Purpose:** See test execution in real browser  
**Use Case:** Debugging failures, understanding page behavior  
**Duration:** Variable (manual observation)

```bash
# Run with browser visible
npm run test:headed

# Or specific browser
npm test -- --project=chromium --headed

# What you see:
# - Browser window opens
# - Tests execute visually
# - Can pause and inspect
# - See exact failures
```

**Debugging with Headed Mode:**

```javascript
// In your test file, add a pause point
test("debug example", async ({ page }) => {
  // ... test code ...

  // Pause here to inspect
  await page.pause();

  // ... more test code ...
});
```

Then run:

```bash
npm run test:headed
```

---

### **Scenario 4: Debug Mode (Interactive Debugging)**

**Purpose:** Step-through debugging with inspector  
**Use Case:** Complex test failures, understanding test flow  
**Duration:** Variable (interactive debugging)

```bash
# Run in debug mode
npm run test:debug

# Or specific test
npm test -- tests/auth/login.spec.js --debug

# Playwright Inspector opens with:
# - Step through buttons
# - Code viewer
# - Console
# - Element selector tool
```

**Using Debug Mode:**

1. Inspector opens
2. Step through test line by line
3. Inspect DOM and values
4. Execute JavaScript in console
5. Record/playback actions

---

### **Scenario 5: Run Specific Test File**

**Purpose:** Focus on one feature during development  
**Use Case:** Working on specific feature  
**Duration:** 1-2 minutes per test file

```bash
# Run specific test file
npm test -- tests/auth/login.spec.js

# Run specific test directory
npm test -- tests/auth/

# Run multiple specific files
npm test -- tests/auth/login.spec.js tests/auth/register.spec.js

# Examples by feature:
npm test -- tests/auth/              # All auth tests
npm test -- tests/product/           # All product tests
npm test -- tests/cart/              # All cart tests
npm test -- tests/checkout/          # All checkout tests
```

---

### **Scenario 6: Run Specific Test by Name**

**Purpose:** Run one specific test case  
**Use Case:** Debugging specific failing test  
**Duration:** <1 minute

```bash
# Run test matching name pattern
npm test -- --grep "should login with valid credentials"

# Run tests NOT matching pattern
npm test -- --grep-invert "slow"

# Examples:
npm test -- --grep "login"           # All tests with "login"
npm test -- --grep "cart"            # All tests with "cart"
npm test -- --grep "checkout"        # All tests with "checkout"
npm test -- --grep "registration"    # All tests with "registration"
```

---

### **Scenario 7: Interactive UI Mode**

**Purpose:** Visual test explorer and runner  
**Use Case:** Convenient test selection and execution  
**Duration:** Variable (interactive)

```bash
# Launch interactive UI
npm run test:ui

# Features:
# - Visual list of all tests
# - Filter tests
# - Run selected tests
# - Watch mode
# - See live results
```

**In UI Mode:**

1. All tests listed with status
2. Click test to run it
3. Filter by filename or pattern
4. Watch mode auto-reruns on file changes
5. See results immediately

---

### **Scenario 8: Continuous Integration (CI) Pipeline**

**Purpose:** Automated testing on every commit  
**Use Case:** GitHub Actions, GitLab CI, etc.  
**Duration:** Automated

```bash
# Set CI environment (triggers CI settings)
export CI=true
npm test

# What changes with CI=true:
# - retries: 2 (retry failed tests)
# - workers: 1 (single worker)
# - Stricter configuration

# CI Configuration (from playwright.config.js):
retries: process.env.CI ? 2 : 0,      // 2 retries on CI
workers: process.env.CI ? 1 : undefined // 1 worker on CI
```

---

### **Scenario 9: Generate Test Report**

**Purpose:** View detailed HTML test report  
**Use Case:** Analysis, sharing results, archiving  
**Duration:** <1 minute

```bash
# Run tests and generate report
npm test

# View the report
npm run test:report

# Report includes:
# - Test status (pass/fail)
# - Timing information
# - Screenshots on failure
# - Video recordings (if enabled)
# - Full test details
```

---

### **Scenario 10: Trace Recording (Advanced Debugging)**

**Purpose:** Record detailed trace of test execution  
**Use Case:** Complex debugging, analyzing failures  
**Duration:** Variable

```bash
# Run with trace enabled
npm test -- --trace on

# Or force traces always
npm test -- --trace on

# Trace output:
# - All page actions
# - DOM snapshots
# - Network events
# - Console logs
# - Screenshot at each step

# View trace
npx playwright show-trace test-results/trace.zip
```

---

## 🔄 Common Test Workflows

### **Workflow 1: Develop New Test**

```bash
# 1. Create new test file in tests/
# 2. Run new test on Chrome
npm test -- tests/new-feature.spec.js --project=chromium

# 3. If fails, debug
npm test -- tests/new-feature.spec.js --project=chromium --headed

# 4. Once Chrome passes, test other browsers
npm test -- tests/new-feature.spec.js --project=firefox
npm test -- tests/new-feature.spec.js --project=webkit

# 5. Run full suite to ensure no regression
npm test
```

---

### **Workflow 2: Debug Failing Test**

```bash
# 1. See the failure
npm test

# 2. Run failing test in headed mode
npm test -- tests/auth/login.spec.js --project=chromium --headed

# 3. Or use debug mode
npm test -- tests/auth/login.spec.js --debug

# 4. Fix the issue
# (modify test or page object)

# 5. Re-run on Chrome
npm test -- tests/auth/login.spec.js --project=chromium

# 6. Test on other browsers
npm test -- tests/auth/login.spec.js --project=firefox
npm test -- tests/auth/login.spec.js --project=webkit
```

---

### **Workflow 3: Fix Browser-Specific Issue**

```bash
# 1. Test fails on Firefox but passes on Chrome
npm test -- --project=firefox

# 2. Run only on Firefox in headed mode
npm test -- --project=firefox --headed

# 3. Observe the difference
# (timing issue, selector issue, etc.)

# 4. Adjust page object or test
# (increase timeout, adjust selector, etc.)

# 5. Re-test Firefox
npm test -- --project=firefox

# 6. Then verify Chrome still works
npm test -- --project=chromium

# 7. Test all three
npm test
```

---

### **Workflow 4: Pre-Commit Verification**

```bash
# Before committing code, run:

# 1. All tests on Chrome (quick check)
npm test -- --project=chromium

# 2. View any failures
npm run test:report

# 3. If Chrome passes, test other browsers
npm test -- --project=firefox
npm test -- --project=webkit

# 4. Finally, full cross-browser test
npm test

# 5. If all pass, safe to commit
git add .
git commit -m "Your message"
git push
```

---

## 📈 Performance & Optimization

### **Fast Development Cycle**

```bash
# Use Chrome only (fastest)
npm test -- --project=chromium

# Skip some tests during development
npm test -- --grep "login" --project=chromium
```

**Speed:** ~5-10 minutes

---

### **Balanced Approach**

```bash
# Test on Chrome, then Firefox
npm test -- --project=chromium
npm test -- --project=firefox
```

**Speed:** ~15-20 minutes

---

### **Full Validation**

```bash
# Test all browsers
npm test
```

**Speed:** ~25-35 minutes

---

## 🐛 Troubleshooting Test Execution

### **Tests Timeout**

```bash
# Option 1: Run on single browser
npm test -- --project=chromium

# Option 2: Increase timeout
npm test -- --timeout 180000

# Option 3: Run in headed mode to see what's happening
npm run test:headed
```

---

### **Tests Hang**

```bash
# Stop hanging tests (Ctrl+C or Cmd+C)
# Then run with debug
npm run test:debug

# Or check for network issues
npm test -- --trace on
```

---

### **Permission Error (EPERM)**

```bash
# Clear test results
rm -rf test-results/

# Try again
npm test
```

---

### **Specific Test Fails**

```bash
# Run that test in isolation
npm test -- tests/path/to/test.spec.js

# Run in headed mode
npm test -- tests/path/to/test.spec.js --headed

# Run in debug mode
npm test -- tests/path/to/test.spec.js --debug
```

---

## 📊 Test Execution Examples with Output

### **Example 1: Successful Full Run**

```bash
$ npm test

> automation_testing@1.0.0 test
> playwright test

Running 85 tests using 1 worker
  ✓ auth/login.spec.js (8 tests)
  ✓ auth/register.spec.js (8 tests)
  ✓ product/browse.spec.js (10 tests)
  ✓ product/search.spec.js (8 tests)
  ✓ cart/cart.spec.js (10 tests)
  ✓ checkout/checkout.spec.js (15 tests)

85 passed (2m 15s)

To view full report run: npx playwright show-report
```

---

### **Example 2: Chrome Only Run**

```bash
$ npm test -- --project=chromium

> automation_testing@1.0.0 test
> playwright test --project=chromium

Running 85 tests using 1 worker on chromium

  ✓ auth/login.spec.js (8 tests)
  ✓ auth/register.spec.js (8 tests)
  ...

85 passed (40s)
```

---

### **Example 3: Headed Mode Debugging**

```bash
$ npm run test:headed

> automation_testing@1.0.0 test:headed
> playwright test --headed

Running 85 tests using 1 worker
Launching Chromium browser...

[Browser window opens showing test execution]

✓ Tests pass/fail with visual feedback
```

---

### **Example 4: Debug Mode**

```bash
$ npm run test:debug

> automation_testing@1.0.0 test:debug
> playwright test --debug

Launching Chromium browser...
Launching Playwright Inspector...

[Inspector window opens]
[Browser is paused at first line of test]

Step through test line by line
Inspect elements and values
```

---

### **Example 5: Grep Filter**

```bash
$ npm test -- --grep "login"

> automation_testing@1.0.0 test
> playwright test --grep login

Running tests matching 'login'

  ✓ auth/login.spec.js (8 tests)

8 passed (30s)
```

---

## 📝 Command Reference Table

| Task                    | Command                                | Duration |
| ----------------------- | -------------------------------------- | -------- |
| All tests, all browsers | `npm test`                             | 25-35m   |
| Chrome only             | `npm test -- --project=chromium`       | 5-10m    |
| Firefox only            | `npm test -- --project=firefox`        | 5-10m    |
| Safari only             | `npm test -- --project=webkit`         | 5-10m    |
| See browser             | `npm run test:headed`                  | Variable |
| Debug                   | `npm run test:debug`                   | Variable |
| Interactive UI          | `npm run test:ui`                      | Variable |
| View report             | `npm run test:report`                  | <1m      |
| Specific file           | `npm test -- tests/auth/login.spec.js` | 1-2m     |
| Match pattern           | `npm test -- --grep "login"`           | 1-2m     |
| With traces             | `npm test -- --trace on`               | 25-35m   |
| Custom timeout          | `npm test -- --timeout 180000`         | 25-35m   |

---

## 🎯 Best Practices

### ✅ Do:

- Run Chrome during development
- Run all browsers before committing
- Use headed mode for debugging
- Use grep to run specific tests
- Check HTML report for detailed results

### ❌ Don't:

- Run all browsers every 5 minutes during development
- Use random sleep values instead of proper waits
- Ignore browser-specific failures
- Skip Firefox/Safari until final testing
- Leave tests in debug mode

---

## 📞 Quick Help

```bash
# Unsure which command to use?
# For development:
npm test -- --project=chromium

# Before committing:
npm test

# Debugging:
npm run test:headed

# Full report:
npm test && npm run test:report
```

---

**Happy Testing! 🎉**
