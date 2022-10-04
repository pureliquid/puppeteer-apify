import { BrowserService } from '../../browser.service';
import { backMarketApify } from './mackmarket-apified.service';
import fs from 'fs';
import { Page } from 'puppeteer';
import { sleepAsync } from '../utils';

(async () => {
  await new BrowserService().setup();
  // navigation options
  // backMarketApify.waitTillIdleNavigation = false;
  // backMarketApify.sleepAfterNavigation = 5000; //  only if no idle navigation
  const res = await backMarketApify.getElements(
    'https://www.backmarket.at/de-at/l/top-angebote/be9b14f4-89e2-4315-8d3b-4d7d613b562f#sort=prod_index_price_asc_de-at',
    (page: Page) => sleepAsync(5000)
  );
  fs.writeFileSync('backmarket.json', JSON.stringify(res, null, 2), 'utf-8');
})();
