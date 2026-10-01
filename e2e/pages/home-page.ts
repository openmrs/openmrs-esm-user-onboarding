import { type Page } from '@playwright/test';

export class HomePage {
  constructor(readonly page: Page) {}
  readonly helpButton = () =>
    this.page.locator('[id*="esm-help-menu-app"]').getByRole('button', { name: /help menu/i });
  readonly nextButton = () => this.page.getByRole('button', { name: 'Next', exact: true });
  readonly finishButton = () => this.page.getByRole('button', { name: 'Last' });

  async goto() {
    await this.page.goto('home/service-queues');
  }
}
