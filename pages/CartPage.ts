import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';
import { TableUtils } from '../utils/TableUtils';
import { CartProduct } from '../model/cartProduct';

export class CartPage {
  readonly page: Page;
  readonly table: Locator;
  readonly rows: Locator;
  readonly total: Locator;
  readonly homePage: HomePage

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('#tbodyid');
    this.rows = page.locator('#tbodyid tr');
    this.total = page.locator('#totalp');
    this.homePage = new HomePage(page);
  }


  async getTableCountOnceTableFullyPopulated() : Promise<number> {
    let previousRowCount: number = -1;
    let count: number = await this.rows.count();

    while (count !== previousRowCount) {
      previousRowCount = count;
      await this.page.waitForTimeout(1000);
      count = await this.rows.count();
    }

    return count;
  }

  async getCartProducts() {
    const items:CartProduct[] = [];
    await this.homePage.navigateToCartPage();

    const count = await TableUtils.getRowCount(this.table);
    console.log(`Total products in cart: ${count}`);

    for (let i = 0; i < count; i++) {
      const product = await TableUtils.getCell(this.table, i, 1);
      const price = parseInt(await TableUtils.getCell(this.table, i, 2));
      items.push({product, price});
    }
    return items;
  }

  async getDisplayedTotal(): Promise<number> {
    return parseInt(await this.total.innerText());
  }
}