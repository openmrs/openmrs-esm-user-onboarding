import { test } from '@playwright/test';
import { HomePage } from '../pages';
import { expect } from '@playwright/test';

test('Basic Walkthrough', async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('When I visit the home page', async () => {
    await homePage.goto();
  });

  await test.step('And I click on the help menu button', async () => {
    await page.locator('[id="single-spa-application\\:\\@openmrs\\/esm-help-menu-app-page-0"]').getByRole('button').click();
  });

  await test.step('And I click on the tutorials button', async () => {
    await page.getByText(/tutorials/i).click();
  });

  await test.step('Then I should see the tutorial modal', async () => {
    await expect(page.getByRole('heading', { name: 'Tutorials' })).toBeVisible();
    await expect(
      page.getByText(/find walkthroughs and video tutorials on some of the core features of openMRS./i),
    ).toBeVisible();
  });

  await test.step('And I click on the Basic Tutorial walkthrough', async () => {
    await page.getByText('Walkthrough').nth(1).click();
  });

  await test.step('Then I should see the first Joyride tooltip', async () => {
    await expect(
      page.locator('#react-joyride-step-0 div').filter({ hasText: 'Welcome to OpenMRS!' }).first(),
    ).toBeVisible();
    await page.locator('[data-test-id="button-primary"]').click();
  });

  await test.step('And I should see the search icon  Joyride tooltip', async () => {
    await expect(
      page.locator('#react-joyride-step-1 div').filter({ hasText: 'This is the search icon' }).first(),
    ).toBeVisible();
    await page.locator('[data-test-id="button-primary"]').click();
  });

  await test.step('Then I should see the add patient icon Joyride tooltip', async () => {
    await expect(
      page.locator('#react-joyride-step-2 div').filter({ hasText: 'This is the add patient icon' }).first(),
    ).toBeVisible();
    await page.locator('[data-test-id="button-primary"]').click();
  });

  await test.step('And I should see the user icon Joyride tooltip', async () => {
    await expect(page.locator('#react-joyride-step-3 div').filter({ hasText: 'The user icon' }).first()).toBeVisible();
    await page.locator('[data-test-id="button-primary"]').click();
  });

  await test.step('Then I should see the active visits Joyride tooltip', async () => {
    await expect(
      page.locator('#react-joyride-step-4 div').filter({ hasText: 'This table displays active visits' }).first(),
    ).toBeVisible();
    await page.locator('[data-test-id="button-primary"]').click();
  });

  await test.step('And I should see the appointments table Joyride tooltip', async () => {
    await expect(
      page.locator('#react-joyride-step-5 div').filter({ hasText: 'This table shows appointments' }).first(),
    ).toBeVisible();
    await page.locator('[data-test-id="button-primary"]').click();
  });
});
