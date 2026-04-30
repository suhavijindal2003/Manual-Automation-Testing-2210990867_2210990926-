// Utility helper functions for automation testing

export async function waitForNavigation(page) {
  await page.waitForLoadState('networkidle');
}

export async function takeScreenshot(page, testName) {
  await page.screenshot({ path: `screenshots/${testName}-${Date.now()}.png`, fullPage: true });
}

export async function scrollToElement(page, selector) {
  const element = await page.$(selector);
  if (element) {
    await element.scrollIntoViewIfNeeded();
  }
}

export async function verifyElementVisible(page, selector) {
  const element = await page.$(selector);
  return element !== null && await element.isVisible();
}

export async function getElementCount(page, selector) {
  return await page.locator(selector).count();
}

export async function getTableData(page, tableSelector) {
  const rows = await page.locator(`${tableSelector} tbody tr`).all();
  const data = [];

  for (const row of rows) {
    const cells = await row.locator('td').all();
    const rowData = [];
    for (const cell of cells) {
      rowData.push(await cell.textContent());
    }
    data.push(rowData);
  }

  return data;
}

export async function handleAlert(page, shouldAccept = true) {
  page.once('dialog', async (dialog) => {
    if (shouldAccept) {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });
}

export async function retryAction(fn, maxRetries = 3, delayMs = 1000) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}

export async function waitForElement(page, selector, timeout = 30000) {
  await page.waitForSelector(selector, { timeout });
}

export async function getTextContent(page, selector) {
  const element = await page.$(selector);
  if (element) {
    return await element.textContent();
  }
  return null;
}

export async function getInputValue(page, selector) {
  return await page.inputValue(selector);
}
