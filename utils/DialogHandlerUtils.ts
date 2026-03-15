// utils/DialogHandler.ts
import { Page, Dialog } from '@playwright/test';

export class DialogHandler {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /** Automatically accepts all dialogs while the handler is active */
    async autoAcceptDialogs(): Promise<() => void> {
        const listener = (dialog: Dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        };
        this.page.on('dialog', listener);

        // Return a cleanup function to remove listener after use
        return () => this.page.removeListener('dialog', listener);
    }

    /** Handle a dialog for a specific action */
    async handleDialogFor<T>(
        action: () => Promise<T>,
        options?: {
            accept?: boolean;
            //timeoutMs?: number;
        }
    ): Promise<{ result: T; message: string }> {

        const {
            accept = true,
            //timeoutMs = 50000
        } = options ?? {};

        const [dialog, result] = await Promise.all([
            this.page.waitForEvent('dialog'),
            //this.page.waitForEvent('dialog', { timeout: timeoutMs }),
            action()
        ]);

        const message = dialog.message();
        console.log(`Dialog detected: ${message}`);

        // Handle dialog
        accept ? await dialog.accept() : await dialog.dismiss();

        return { result, message };
    }
}