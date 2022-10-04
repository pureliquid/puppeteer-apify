import fs from 'fs';
import { willhabenApify } from './willhaben-apified.service';
import { BrowserService } from '../../browser.service';

(async () => {
  await new BrowserService().setup();
  const res = await willhabenApify.getElements(
    'https://www.willhaben.at/iad/kaufen-und-verkaufen/marktplatz/computer-tablets/notebooks-5831'
  );
  fs.writeFileSync('wh.json', JSON.stringify(res, null, 2), 'utf-8');
})();
