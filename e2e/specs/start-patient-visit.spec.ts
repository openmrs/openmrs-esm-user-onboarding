import { expect } from '@playwright/test';
import { test } from '../core';
import { HomePage } from '../pages';
import { generateRandomPatient, deletePatient } from '../commands';
import { type Patient } from '../types';

let patient: Patient;

test.beforeEach(async ({ api }) => {
  patient = await generateRandomPatient(api);
});

test('Starting a patient visit tutorial', async ({ page }) => {
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

  await test.step('Then I should see the Tutorial modal', async () => {
    await expect(page.getByRole('heading', { name: /tutorials/i })).toBeVisible();
    await expect(
      page.getByText(/find walkthroughs and video tutorials on some of the core features of openmrs./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Starting a Patient Visit` tutorial', async () => {
    await page
      .locator('li')
      .filter({ hasText: /starting a patient visit/i })
      .locator('a', { hasText: /walkthrough/i })
      .click();
  });

  await test.step('Then I should see the first tooltip', async () => {
    await expect(
      page.getByText(
        /to fill out any forms or encounters of a patient, you have to start a visit. to start a patient visit, first you need to go to the patient chart view of the respective patient. click on the search icon to open the search box so that we can search for the patient./i,
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

  await test.step('And I search for the patient I need to start a visit', async () => {
    await page.getByTestId('patientSearchBar').fill(patient.person.display);
  });

  await test.step('Then I should see the third tooltip', async () => {
    await expect(
      page.getByText(
        /click on the patient whose chart you want to access. make sure to select a patient without the "active visit" label, as we will start a visit in the next steps of the tutorial./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the first patient in the search results', async () => {
    await page.getByTestId('floatingSearchResultsContainer').locator('a').first().click();
  });

  await test.step('Then I should be redirected to Patient Summary and see the fourth tooltip and ', async () => {
    await expect(page).toHaveURL(`${process.env.E2E_BASE_URL}/spa/patient/${patient.uuid}/chart/Patient%20Summary`);
    await expect(
      page.getByText(
        /welcome to the patient chart view! here, you can find detailed patient information, records of clinical visits, demographic information, graphs, and medical forms. click on the "start visit" button to open the start visit form./i,
      ),
    ).toBeVisible();
    await expect(page).toHaveURL(`${process.env.E2E_BASE_URL}/spa/patient/${patient.uuid}/chart/Patient%20Summary`);
  });

  await test.step('And I click the `Start a visit` button', async () => {
    await page.getByRole('button', { name: 'Start a visit' }).click();
  });

  await test.step('Then I should see the Start Visit Form tooltip', async () => {
    await expect(
      page.getByText(
        /fill out the necessary information here and click on the "start visit" button at the bottom of this form to start the visit. you can click on "discard" if you don't want to start a visit at the moment./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I select `Home Visit` as the visit type and click the `Start visit` button', async () => {
    await page.getByText(/home visit/i).click();
    await page.getByRole('button', { name: 'Start visit' }).click();
  });

  await test.step('Then I should see a success notification and the last tooltip', async () => {
    await expect(page.getByText('Visit started', { exact: true })).toBeVisible();
    await expect(
      page.getByText(
        /that's the end of this tutorial! if you have already started a visit, you will see an "active visit" tag near the patient's name. after the visit is started, you can do things like capturing vitals, biometrics, and more through this patient chart view./i,
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
