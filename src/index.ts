import { BrowserService } from './browser.service';
// import { ExtensionLoaderService } from './extension-loader.service';
import './apify/willhaben/index';
const fn = async () => {
  // const extensionLoaderService = new ExtensionLoaderService();
  process.exit(1);
  const browserService: BrowserService = new BrowserService();
  await browserService.setup();
  const p = await browserService.browser.newPage();
  /*await browserService.awaitNavigation(p, 'http://192.168.8.1/html/home.html');
  await p.evaluate(() => {
    document?.querySelector<HTMLSpanElement>('span#logout_span')?.click();
    (document?.querySelector<HTMLInputElement>('input#password.input') as HTMLInputElement).value = 'sK24!12$';
    document.querySelector<HTMLInputElement>('input#pop_login.button_dialog')?.click();
    return;
  });

  [...document.querySelectorAll('.user_add_line')[0].querySelectorAll('td')].map(col => col.innerText)

  await p.waitFor(2000);
  await browserService.awaitNavigation(p, 'http://192.168.8.1/html/virtualserver.html');*/
};
