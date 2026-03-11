import fs from 'fs';
import {parse} from 'csv-parse/sync';

export class DataProvider {

    static getDataFromJson(filePath: string): any {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading JSON file at ${filePath}:`, error);
            throw error;
        }
    }

    static getDataFromCsv(filePath: string): any[] {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            return parse(data, {
                columns: true,
                skip_empty_lines: true
            });
        } catch (error) {
            console.error(`Error reading CSV file at ${filePath}:`, error);
            throw error;
        }
    }
}



