import fs from 'fs';
import { willhabenApify } from './willhaben-apified.service';
import { BrowserService } from '../../browser.service';

const load = async () => {
  const r = await willhabenApify.getElements(
    'https://www.willhaben.at/iad/kaufen-und-verkaufen/marktplatz/computer-tablets/notebooks-5831',
    'networkidle0'
  );
  fs.writeFileSync(
    'wh.json',
    JSON.stringify(
      r.sort((e1, e2) => {
        const p1 = e1.productPrice as number;
        const p2 = e2.productPrice as number;
        return p1 > p2 ? 1 : -1;
      }),
      null,
      2
    ),
    'utf-8'
  );
  return r;
};

(async () => {
  await new BrowserService().setup();
  console.log((await load())[0]);

  setInterval(async () => {
    console.log((await load())[0]);
  }, 60000);
})();
