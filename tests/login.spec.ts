import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('berhasil login dengan user valid', async ({ page }) => {
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('gagal login dengan password salah', async () => {
    await login.login('standard_user', 'password_salah');
    await expect(login.errorMessage).toContainText('do not match');
  });

  test('user terkunci tidak bisa login', async () => {
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.errorMessage).toContainText('locked out');
  });

  test('username kosong menampilkan error', async () => {
    await login.login('', 'secret_sauce');
    await expect(login.errorMessage).toContainText('Username is required');
  });

  test('password kosong menampilkan error', async () => {
    await login.login('standard_user', '');
    await expect(login.errorMessage).toContainText('Password is required');
  });
});