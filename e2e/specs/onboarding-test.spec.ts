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

  await test.step('And I click on the Basic Overview Tutorial', async () => {
    await page
      .locator('li')
      .filter({ hasText: 'Basic Overview' })
      .locator('button', { hasText: 'Walkthrough' })
      .click();
  });

  await test.step('Then I should see the first Joyride tooltip', async () => {
    await expect(
      page.getByText(
        'Welcome to OpenMRS! This is the main dashboard where you can navigate to various features of the system.',
      ),
    ).toBeVisible();
  });

  await test.step('And I click the next button', async () => {
    await page.getByLabel('Next', { exact: true }).click();
  });

  await test.step('Then I should see the search icon  Joyride tooltip', async () => {
    await expect(
      page.getByText('This is the search icon. Use it to find patients in the system quickly.'),
    ).toBeVisible();
  });
  await test.step('And I click the next button', async () => {
    await page.getByLabel('Next', { exact: true }).click();
  });

  await test.step('Then I should see the add patient icon Joyride tooltip', async () => {
    await expect(
      page.getByText('This is the add patient icon. Click here to register a new patient into the system.'),
    ).toBeVisible();
  });
  await test.step('And I click the next button', async () => {
    await page.getByLabel('Next', { exact: true }).click();
  });

  await test.step('Then I should see the user icon Joyride tooltip', async () => {
    await expect(
      page.getByText('The user icon. Click here to change your user preferences and settings.'),
    ).toBeVisible();
  });
  await test.step('And I click the next button', async () => {
    await page.getByLabel('Next', { exact: true }).click();
  });

  await test.step('Then I should see the active visits Joyride tooltip', async () => {
    await expect(
      page.getByText('This table displays active visits. Here you can see all the ongoing patient visits.'),
    ).toBeVisible();
  });

  await test.step('And I click the next button', async () => {
    await page.getByLabel('Next', { exact: true }).click();
  });

  await test.step('And I should see the appointments table Joyride tooltip', async () => {
    await expect(
      page.getByText('This table shows appointments. View and manage patient appointments from this section.'),
    ).toBeVisible();
  });

  await test.step('And I click the finish button', async () => {
    await page.getByLabel('Last').click();
  });
});
