import { Locator, expect } from "@playwright/test";

export class TableUtils {

    static async waitForTableStable(
    table: Locator,
    options?: { timeoutMs?: number; stableDurationMs?: number; minRows?: number }
  ): Promise<Locator> {
    const { timeoutMs = 30000, stableDurationMs = 500, minRows = 1 } = options ?? {};
    const rows = table.locator('tr');

    const start = Date.now();
    let previousCount = -1;

    while (Date.now() - start < timeoutMs) {
      const count = await rows.count();

      if (count >= minRows) {
        // check visibility of all rows
        let allVisible = true;
        for (let i = 0; i < count; i++) {
          if (!(await rows.nth(i).isVisible())) {
            allVisible = false;
            break;
          }
        }

        if (allVisible && count === previousCount) {
          return rows; // table fully loaded
        }
      }

      previousCount = count;
      await new Promise(r => setTimeout(r, stableDurationMs)); // poll interval
    }

    throw new Error(`Table did not stabilize within ${timeoutMs}ms`);
  }

    

    static async getRowCount(
    table: Locator,
    options?: { timeoutMs?: number; stableDurationMs?: number; minRows?: number }
  ): Promise<number> {
    const rows = await this.waitForTableStable(table, options);
    return await rows.count();
  }

   /** Get table headers (th text content) */
  static async getHeaders(table: Locator): Promise<string[]> {
    const headerCells = table.locator('thead tr th');
    const count = await headerCells.count();
    const headers: string[] = [];
    for (let i = 0; i < count; i++) {
      headers.push((await headerCells.nth(i).innerText()).trim());
    }
    return headers;
  }

  /** Get entire table data as 2D array */
  static async getTableData(table: Locator): Promise<string[][]> {
    const rows = await this.waitForTableStable(table);
    const count = await rows.count();
    const data: string[][] = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('td').allInnerTexts();
      data.push(cells.map(c => c.trim()));
    }

    return data;
  }

  /** Get a specific cell value */
  static async getCell(table: Locator, rowIndex: number, colIndex: number): Promise<string> {
    const rows = await this.waitForTableStable(table);
    const row = rows.nth(rowIndex);
    const cell = row.locator('td').nth(colIndex);
    return (await cell.innerText()).trim();
  }

  /** Convert table to array of objects using headers as keys */
  static async getTableAsObjects(table: Locator): Promise<TableRowObject[]> {
    const headers = await this.getHeaders(table);
    const data = await this.getTableData(table);
    return data.map(row =>
      Object.fromEntries(headers.map((h, i) => [h, row[i]]))
    );
  }

}
