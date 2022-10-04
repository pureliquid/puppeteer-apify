import { Page } from 'puppeteer';
import { BrowserService } from '../browser.service';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type Transformers<T> = Partial<Record<keyof Partial<T>, (value: string) => any>>;
const sleepAsync = (timeout: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
export class ApifyService<T> {
  constructor(
    private elementContainerSelector: string,
    private childSelectors: Record<keyof T, string>,
    private transformers: Transformers<T> = {} as Transformers<T>,
    private browserService = new BrowserService()
  ) {}

  async getElements(
    url: string,
    waitTill: 'networkidle0' | ((page: Page) => Promise<void>) = 'networkidle0',
    closePage = true
  ) {
    const page: Page = await this.browserService.browser.newPage();
    if (waitTill === 'networkidle0') {
      await this.browserService.awaitNavigation(page, url);
    } else {
      await page.goto(url);
      await waitTill(page);
    }
    await this.browserService.scrollToBottom(page);
    const res = await page.evaluate(
      (selectors: Record<keyof T, string>, elementContainerSelector: string) => {
        return [...document.querySelectorAll(elementContainerSelector)].map((element) => {
          const response: Record<keyof T, unknown> = {} as Record<keyof T, unknown>;
          Object.keys(selectors).forEach((key) => {
            response[key as keyof T] = (element.querySelector(selectors[key as keyof T]) as HTMLElement)?.innerText;
          });
          return response;
        });
      },
      this.childSelectors,
      this.elementContainerSelector
    );

    for (const entry of res) {
      for (const key of Object.keys(this.transformers)) {
        entry[key as keyof typeof entry] = await this.transformers[key as keyof Transformers<T>]?.(
          entry[key as keyof typeof entry] as string
        );
      }
    }
    if (closePage) await page.close();
    return res;
  }
}
