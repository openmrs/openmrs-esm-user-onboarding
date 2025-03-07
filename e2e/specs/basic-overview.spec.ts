import { test } from '@playwright/test';
import { HomePage } from '../pages';
import { expect } from '@playwright/test';

test('Basic overview tutorial', async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('When I visit the home page', async () => {
    await homePage.goto();
  });

  await test.step('And I click the `Help` button', async () => {
    await page
      .locator('[id="single-spa-application\\:\\@openmrs\\/esm-help-menu-app-page-0"]')
      .getByRole('button')
      .click();
  });

  await test.step('And I click the `Tutorials` button', async () => {
    await page.getByText(/tutorials/i).click();
  });

  await test.step('Then I should see the Tutorials modal', async () => {
    await expect(page.getByRole('heading', { name: /tutorials/i })).toBeVisible();
    await expect(
      page.getByText(/find walkthroughs and video tutorials on some of the core features of openmrs./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Basic Overview` tutorial', async () => {
    await page
      .locator('li')
      .filter({ hasText: /basic overview/i })
      .locator('a', { hasText: /walkthrough/i })
      .click();
  });

  await test.step('Then I should see the first tooltip', async () => {
    await expect(
      page.getByText(
        /welcome to openmrs! this is the main dashboard where you can navigate to various features of the system./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click({ force: true });
  });

  await test.step('Then I should see the second tooltip', async () => {
    await expect(
      page.getByText(/this is the search icon. use it to find patients in the system quickly./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the third tooltip', async () => {
    await expect(
      page.getByText(/this is the add patient icon. click here to register a new patient into the system./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the fourth tooltip', async () => {
    await expect(
      page.getByText(/the user icon. click here to change your user preferences and settings./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the fifth tooltip', async () => {
    await expect(
      page.getByText(/this table displays active visits. here you can see all the ongoing patient visits./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the last tooltip', async () => {
    await expect(
      page.getByText(/this table shows appointments. view and manage patient appointments from this section./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Finish` button', async () => {
    await homePage.finishButton().click();
  });
});
