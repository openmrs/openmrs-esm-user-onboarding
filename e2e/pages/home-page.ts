import type { Page } from '@playwright/test';

export class HomePage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto('/openmrs/spa/home/service-queues');
  }
}
