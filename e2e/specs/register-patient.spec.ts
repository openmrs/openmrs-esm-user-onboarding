import { test } from '@playwright/test';
import { HomePage } from '../pages';
import { expect } from '@playwright/test';

test('Registering a patient tutorial', async ({ page }) => {
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

  await test.step('And I click the `Registering a Patient` tutorial', async () => {
    await page
      .locator('li')
      .filter({ hasText: /registering a patient/i })
      .locator('a', { hasText: /walkthrough/i })
      .click();
  });

  await test.step('Then I should see the first tooltip', async () => {
    await expect(page.getByText(/click here to add a patient to the system./i)).toBeVisible();
  });

  await test.step('And I click the `Add patient` button', async () => {
    await page.evaluate(() => {
      document.querySelector('.react-joyride__overlay')?.setAttribute('style', 'z-index: 1 !important');
    });
    await page.getByRole('button', { name: 'Add patient' }).click();
  });

  await test.step('Then I should be redirected to Patient Registration and see the Demographics tooltip', async () => {
    await expect(page).toHaveURL(`${process.env.E2E_BASE_URL}/spa/patient-registration`);
    await expect(page.getByRole('heading', { name: /demographics/i })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the Contact Details tooltip', async () => {
    await expect(page.getByRole('heading', { name: /contact details/i, level: 4 })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the Relationships tooltip', async () => {
    await expect(page.getByRole('heading', { name: /relationships/i, level: 4 })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the last tooltip', async () => {
    await expect(
      page.getByText(/click this button to register the patient's information into the system./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Finish` button', async () => {
    await homePage.finishButton().click();
  });
});
