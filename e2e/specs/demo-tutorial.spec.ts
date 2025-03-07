import { test } from '@playwright/test';
import { HomePage } from '../pages';
import { expect } from '@playwright/test';

test('Demo tutorial', async ({ page }) => {
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

  await test.step('And I click the `Tutorial for demo purposes` tutorial', async () => {
    await page
      .locator('li')
      .filter({ hasText: /tutorial for demo purposes/i })
      .locator('a', { hasText: /walkthrough/i })
      .click();
  });

  await test.step('Then I should see the first tooltip', async () => {
    await expect(page.getByText(/let us walk through the tutorial features together./i)).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the second tooltip', async () => {
    await expect(
      page.getByText(
        /click on this link. this step is configured to be automatic and will take you to the next step. once the given query selector resolves an element on the page, it will proceed automatically./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Appointments` button', async () => {
    await page.evaluate(() => {
      const overlay = document.querySelector('.react-joyride__overlay');
      if (overlay) overlay.remove();
    });
    await page.getByRole('link', { name: /appointments/i }).click();
  });

  await test.step('Then I should see the third tooltip', async () => {
    await expect(page.getByText(/congrats! you have reached the clinical appointments dashboard./i)).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the fourth tooltip', async () => {
    await expect(
      page.getByText(
        /Now, let’s see how this behaves when elements take a bit longer to load. Set your network throttling to "Slow 3G" and hit "Next"./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the fifth tooltip', async () => {
    await expect(
      page.getByText(
        /Let's navigate to the laboratory page. Our next target is the "Tests Ordered" table. I’ll disappear once you reach the laboratory page and reappear when the table is loaded. See you there!/i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Laboratory` button', async () => {
    await page.getByRole('link', { name: /laboratory/i }).click();
  });

  await test.step('Then I should see the sixth tooltip', async () => {
    await expect(
      page.getByText(
        /it's me again. by default, i'll wait for the element to appear, so you don't have to worry about slow components when writing a new tutorial./i,
      ),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });

  await test.step('Then I should see the seventh tooltip', async () => {
    await expect(
      page.getByText(/Now let's do a fun exercise. Can you find out how to view a patient's allergies on your own?/i),
    ).toBeVisible();
  });

  await test.step('And I click the `Next` button', async () => {
    await homePage.nextButton().click();
  });
});
