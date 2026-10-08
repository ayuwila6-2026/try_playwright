import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('logs in successfully with a valid user', async ({ page }) => {
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('fails to log in with a wrong password', async () => {
    await login.login('standard_user', 'wrong_password');
    await expect(login.errorMessage).toContainText('do not match');
  });

  test('locked-out user cannot log in', async () => {
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.errorMessage).toContainText('locked out');
  });

  test('shows an error when username is empty', async () => {
    await login.login('', 'secret_sauce');
    await expect(login.errorMessage).toContainText('Username is required');
  });

  test('shows an error when password is empty', async () => {
    await login.login('standard_user', '');
    await expect(login.errorMessage).toContainText('Password is required');
  });
});