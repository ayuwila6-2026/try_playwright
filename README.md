# SauceDemo Playwright Automation

![Playwright Tests](https://github.com/USERNAME/saucedemo-playwright-automation/actions/workflows/playwright.yml/badge.svg)

Framework test automation end-to-end untuk [SauceDemo](https://www.saucedemo.com)
menggunakan Playwright, TypeScript, dan Page Object Model.

## Tech Stack
- Playwright + TypeScript
- Page Object Model
- GitHub Actions (CI)

## Cakupan Test
- **Login:** user valid, password salah, user terkunci, username kosong, password kosong
- **Checkout:** alur lengkap sampai order selesai, validasi form (first name, last name, postal code)

## Laporan Test
![Laporan Playwright](docs/report.png)

## Menjalankan Test
```bash
npm install
npx playwright install chromium
npx playwright test
npx playwright show-report
```

## Struktur Proyek
```
pages/   -> Page Object (LoginPage, InventoryPage, CartPage, CheckoutPage)
tests/   -> Test spec (login, checkout)
.github/ -> Workflow CI
```

## Catatan
Test dijalankan otomatis di GitHub Actions pada setiap push dan pull request.