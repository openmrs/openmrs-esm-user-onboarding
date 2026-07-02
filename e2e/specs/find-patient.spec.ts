import { expect } from '@playwright/test';
import { test } from '../core';
import { HomePage } from '../pages';
import { clickSpotlightedElement, generateRandomPatient, deletePatient } from '../commands';
import { type Patient } from '../types';

let patient: Patient;

test.beforeEach(async ({ api }) => {
  patient = await generateRandomPatient(api);
});

test('Finding a patient tutorial', async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('When I visit the home page', async () => {
    await homePage.goto();
  });

  await test.step('And I click the `Help` button', async () => {
    await homePage.helpButton().click();
  });

  await test.step('And I click the `Tutorials` button', async () => {
    await page.getByText(/tutorials/i).click();
  });

  await test.step('Then I should see the Tutorial modal', async () => {
    await expect(page.getByRole('heading', { name: /tutorials/i })).toBeVisible();
    await expect(
      page.getByText(/find walkthroughs and video tutorials on some of the core features of openmrs./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Finding a Patient` tutorial', async () => {
    await page
      .locator('li')
      .filter({ hasText: /finding a patient/i })
      .locator('a', { hasText: /walkthrough/i })
      .click();
  });

  await test.step('Then I should see the first tooltip', async () => {
    await expect(
      page.getByText(/click on the search icon to open the search box so that we can search for a patient./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Search patient` button', async () => {
    await clickSpotlightedElement(page.getByRole('button', { name: 'Search patient' }));
  });

  await test.step('Then I should see the second tooltip', async () => {
    await expect(
      page.getByText(
        /now, enter the name of the patient here. if you know the patient id, you can use that as well. you will see the results if the patient you entered exists in the system. some example patient names that you can search for are: john, smith, mary./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I search for the patient', async () => {
    await page.getByTestId('patientSearchBar').fill(patient.person.display);
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the third tooltip', async () => {
    await expect(
      page.getByText(
        /the search container shows only the top results and if they are not the patient you want, or you cannot find the patient by name or the patient id, you can use advanced search tools to narrow down your search. click next to learn more about the advanced search options./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the fourth tooltip', async () => {
    await expect(
      page.getByText(
        /the advanced search provides additional search fields like date of birth and phone number to help find the right patient, which comes in helpful in scenarios where multiple patients have the same name. click here to access the advanced search tool./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Search` button', async () => {
    await clickSpotlightedElement(page.getByRole('button', { name: 'Search', exact: true }));
  });

  await test.step('Then I should see the Filters section tooltip', async () => {
    await expect(page.getByRole('heading', { name: /filters section/i, level: 4 })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the sixth tooltip', async () => {
    await expect(
      page.getByText(
        /here you can see all the patients who match the search criteria. clicking on a patient will open the patient’s patient chart./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the last tooltip', async () => {
    await expect(
      page.getByText(/that’s the end of the tutorial. click on the close button to go back to the home page./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Close Search Panel` button', async () => {
    await clickSpotlightedElement(page.getByRole('button', { name: 'Close Search Panel' }));
  });

  await test.step('Then I should be redirected to the home page', async () => {
    await expect(page).toHaveURL(/\/home/);
  });
});

test.afterEach(async ({ api }) => {
  await deletePatient(api, patient.uuid);
});
