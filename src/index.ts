import { BrowserService } from './browser.service';
// import { ExtensionLoaderService } from './extension-loader.service';
import './apify/willhaben/index';
const fn = async () => {
  // const extensionLoaderService = new ExtensionLoaderService();
  process.exit(1);
  const browserService: BrowserService = new BrowserService();
  await browserService.setup();
  const p = await browserService.browser.newPage();
};
