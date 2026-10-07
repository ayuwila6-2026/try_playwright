import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    checkout = new CheckoutPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.openCart();
    await cart.checkout();
  });

  test('checkout lengkap berhasil', async () => {
    await checkout.fillInfo('Budi', 'Santoso', '62271');
    await checkout.continueButton.click();
    await checkout.finishButton.click();
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  });

  test('form kosong menampilkan error first name', async () => {
    await checkout.continueButton.click();
    await expect(checkout.errorMessage).toContainText('First Name is required');
  });

  test('last name kosong menampilkan error', async () => {
    await checkout.firstName.fill('Budi');
    await checkout.continueButton.click();
    await expect(checkout.errorMessage).toContainText('Last Name is required');
  });

  test('postal code kosong menampilkan error', async () => {
    await checkout.fillInfo('Budi', 'Santoso', '');
    await checkout.continueButton.click();
    await expect(checkout.errorMessage).toContainText('Postal Code is required');
  });
});