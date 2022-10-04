import { WillhabenApifyModel } from '../willhaben/willhaben-apified.interfaces';
import { ApifyService } from '../apify.service';
import { BackmarketApifyModel } from './backmarket-apified.interfaces';

export const backMarketApify = new ApifyService<BackmarketApifyModel>(
  'div:has(> a[data-test="product-thumb"])',
  {
    productName: 'h2',
    productPrice: '[data-qa="prices"]',
  },
  {
    productPrice: (value: string): number => {
      // € 89,99\n€ 399,00
      return parseInt(value.split('\n')[0].replace('€', '').replace(/\./, ''));
    },
  }
);
