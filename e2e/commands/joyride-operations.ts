import { type Locator } from '@playwright/test';

/**
 * Clicks an element that is highlighted by the Joyride spotlight.
 *
 * When a tutorial step sets `spotlightClicks: true`, Joyride's overlay only becomes
 * click-through once it registers a `mousemove` event inside the spotlight, at which
 * point it sets `pointer-events: none` on the overlay. Playwright's pre-click hit test
 * runs before any mouse movement, so a plain `locator.click()` times out because the
 * overlay is still intercepting pointer events. Moving the mouse over the element first
 * (without actionability checks) lets Joyride release the overlay, after which a normal
 * click goes through, the same way it does for a real user.
 */
export const clickSpotlightedElement = async (locator: Locator) => {
  await locator.waitFor({ state: 'visible' });
  const box = await locator.boundingBox();
  if (box) {
    await locator.page().mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  }
  await locator.click();
};
