import { expect } from '@playwright/test';
import { test } from '../core';
import { HomePage } from '../pages';
import { generateRandomPatient, deletePatient } from '../commands';
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
    await page.evaluate(() => {
      document.querySelector('.react-joyride__overlay')?.setAttribute('style', 'z-index: 1 !important');
    });
    await page.getByRole('button', { name: 'Search patient' }).click();
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

  await test.step('Then I should see the third tooltip', async () => {
    await expect(
      page.getByText(
        /if there are a lot of patients in the system, you may need additional fields to search other than the name. also, the patient you are looking for may not be displayed in the top results if there are multiple patients with the same name. in these scenarios, you can click here to open the advanced search./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Search` button', async () => {
    await page.evaluate(() => {
      document.querySelector('.react-joyride__overlay')?.setAttribute('style', 'z-index: 1 !important');
    });
    await page.getByRole('button', { name: 'Search', exact: true }).click();
  });

  await test.step('Then I should see the Filters section tooltip', async () => {
    await expect(page.getByRole('heading', { name: /filters section/i, level: 4 })).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the fifth tooltip', async () => {
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
    await page.evaluate(() => {
      document.querySelector('.react-joyride__overlay')?.setAttribute('style', 'z-index: 1 !important');
    });
    await page.getByRole('button', { name: 'Close Search Panel' }).click();
  });

  await test.step('Then I should be redirected to home page', async () => {
    await expect(page).toHaveURL(`${process.env.E2E_BASE_URL}/spa/home`);
  });
});

test.afterEach(async ({ api }) => {
  await deletePatient(api, patient.uuid);
});
