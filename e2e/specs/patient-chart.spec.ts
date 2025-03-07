import { expect } from '@playwright/test';
import { test } from '../core';
import { HomePage } from '../pages';
import { generateRandomPatient, deletePatient } from '../commands';
import { type Patient } from '../types';

let patient: Patient;

test.beforeEach(async ({ api }) => {
  patient = await generateRandomPatient(api);
});

test('Patient chart tutorial', async ({ page }) => {
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

  await test.step('And I click the `Patient Chart` tutorial', async () => {
    await page
      .locator('li')
      .filter({ hasText: /patient chart/i })
      .locator('a', { hasText: /walkthrough/i })
      .first()
      .click();
  });

  await test.step('Then I should see the first tooltip', async () => {
    await expect(
      page.getByText(
        /to access the patient chart, first, you need to select a patient. to start, click here to open the search box so that we can search for a patient./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Search patient` button', async () => {
    await page.evaluate(() => {
      document.querySelector('.react-joyride__overlay')?.setAttribute('style', 'z-index: 1 !important');
    });
    await page.getByRole('button', { name: 'Search patient' }).click();
  });

  await test.step('Then I should see the second tooltip', async () => {
    await expect(
      page.getByText(
        /now, enter the name or the id of the patient here. some example patient names that you can search for are: john, smith, mary./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I search for the patient', async () => {
    await page.getByTestId('patientSearchBar').fill(patient.person.display);
  });

  await test.step('Then I should see the third tooltip', async () => {
    await expect(page.getByText(/click on the patient you want to go to their patient chart./i)).toBeVisible();
  });

  await test.step('And I click the first patient in the search results', async () => {
    await page.getByTestId('floatingSearchResultsContainer').locator('a').first().click();
  });

  await test.step('Then I should be redirected to Patient Summary and see the Patient Chart tooltip', async () => {
    await expect(page).toHaveURL(`${process.env.E2E_BASE_URL}/spa/patient/${patient.uuid}/chart/Patient%20Summary`);
    await expect(page.getByRole('heading', { name: /patient chart/i, level: 4 })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the Patient header tooltip', async () => {
    await expect(page.getByRole('heading', { name: /patient header/i, level: 4 })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the Left panel tooltip', async () => {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('heading', { name: /left panel/i, level: 4 })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the Patient summary widgets tooltip', async () => {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('heading', { name: /patient summary widgets/i, level: 4 })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the Siderail tooltip', async () => {
    await expect(page.getByRole('heading', { name: /siderail/i, level: 4 })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the last tooltip', async () => {
    await expect(
      page.getByText(
        /great job! you've completed the tutorial. now, take a moment to explore the patient chart View and discover all its features. feel free to navigate around and get comfortable with the layout. if you need to return to the home page, just click the close button in the top right corner. happy exploring!/i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Finish` button', async () => {
    await homePage.finishButton().click();
  });
});

test.afterEach(async ({ api }) => {
  await deletePatient(api, patient.uuid);
});
