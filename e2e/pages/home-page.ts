import { type Page } from '@playwright/test';

export class HomePage {
  constructor(readonly page: Page) {}
  readonly nextButton = () => this.page.getByRole('button', { name: 'Next', exact: true });
  readonly finishButton = () => this.page.getByRole('button', { name: 'Last' });

  async goto() {
    await this.page.goto('/openmrs/spa/home/service-queues');
  }
}
