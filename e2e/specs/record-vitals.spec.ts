import { expect } from '@playwright/test';
import { type Visit } from '@openmrs/esm-framework';
import { generateRandomPatient, deletePatient, startVisit, endVisit } from '../commands';
import { type Patient } from '../types';
import { HomePage } from '../pages';
import { test } from '../core';

let patient: Patient;
let visit: Visit;

test.beforeEach(async ({ api }) => {
  patient = await generateRandomPatient(api);
  visit = await startVisit(api, patient.uuid);
});

test('Recording vitals tutorial', async ({ page }) => {
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

  await test.step('And I click the `Recording Vitals` tutorial', async () => {
    await page
      .locator('li')
      .filter({ hasText: /recording vitals/i })
      .locator('a', { hasText: /walkthrough/i })
      .click();
  });

  await test.step('Then I should see the first tooltip', async () => {
    await expect(
      page.getByText(
        /to capture the vitals of a patient, you need to start by going to the patient chart view of the respective patient. click on the search icon to open the search box so that you can search for the patient./i,
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
        /now, enter the name or the id of the patient here. some example patient names you can search for are: john, smith, mary./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I search for the patient whose vitals need to be recorded', async () => {
    await page.getByTestId('patientSearchBar').fill(patient.person.display);
  });

  await test.step('Then I should see the third tooltip', async () => {
    await expect(page.getByText(/click on the patient to go to their patient chart./i)).toBeVisible();
  });

  await test.step('And I click the first patient in the search results', async () => {
    await page.getByTestId('floatingSearchResultsContainer').locator('a').first().click();
  });

  await test.step('Then I should be redirected to Patient Summary and see the fourth tooltip', async () => {
    await expect(page).toHaveURL(`${process.env.E2E_BASE_URL}/spa/patient/${patient.uuid}/chart/Patient%20Summary`);
    await expect(
      page.getByText(
        /click on the "record vitals" button to open the vitals form. if the selected patient doesn't have an active visit, you will be prompted to start one. in that case, submit the start visit form in order to the next step./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Record vitals` button', async () => {
    await page.getByRole('button', { name: 'Record vitals' }).click();
  });

  await test.step('Then I should see the Vitals form tooltip', async () => {
    await expect(page.getByRole('heading', { name: /vitals form/i, level: 4 })).toBeVisible();
  });

  await test.step('And I fill in the Vitals form', async () => {
    await page.getByRole('spinbutton', { name: /temperature/i }).fill('37');
    await page.getByRole('spinbutton', { name: /systolic/i }).fill('120');
    await page.getByRole('spinbutton', { name: /diastolic/i }).fill('100');
    await page.getByRole('spinbutton', { name: /pulse/i }).fill('65');
    await page.getByRole('spinbutton', { name: /respiration rate/i }).fill('16');
    await page.getByRole('spinbutton', { name: /oxygen saturation/i }).fill('98');
    await page.getByPlaceholder(/type any additional notes here/i).fill('Test notes');
  });

  await test.step('And I click the `Save and close` button', async () => {
    await page.getByRole('button', { name: 'Save and close' }).click();
  });

  await test.step('Then I should see a success notification and the sixth tooltip', async () => {
    await expect(page.getByText(/vitals and biometrics saved/i)).toBeVisible();
    await expect(
      page.getByText(/the latest vitals and biometrics data of the patient can be viewed in this section./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the seventh tooltip', async () => {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(
      page.getByText(
        /click here to go to the vitals and biometrics page, where you can view the past records of vitals and biometrics./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Vitals & Biometrics` button', async () => {
    await page.evaluate(() => {
      document.querySelector('.react-joyride__overlay')?.setAttribute('style', 'z-index: 1 !important');
    });
    await page.getByRole('link', { name: /vitals & biometrics/i }).click();
  });

  await test.step('Then I should see the eighth tooltip', async () => {
    await expect(
      page.getByText(
        /these tables display the history of vitals and biometrics. indicators may be present here to show measurements that are higher or lower than the typical range./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the ninth tooltip', async () => {
    await expect(
      page.getByText(/you can click on the "chart" button for a graphical representation of the vitals history./i),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the last tooltip', async () => {
    await expect(
      page.getByText(
        /you have now successfully completed the tutorial. you can continue with the rest of the patient visit by recording additional information or performing other necessary actions within the patient chart view, or you can return to the homepage./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Finish` button', async () => {
    await homePage.finishButton().click();
  });
});

test.afterEach(async ({ api }) => {
  await endVisit(api, visit);
  await deletePatient(api, patient.uuid);
});
