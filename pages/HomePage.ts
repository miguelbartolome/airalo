import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    readonly acceptBtn: Locator;
    readonly cancelNotifBtn: Locator;
    readonly viewEsimStoreBtn: Locator;

    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;

        this.acceptBtn = page.locator('#onetrust-accept-btn-handler');
        this.cancelNotifBtn = page.locator('#wzrk-cancel');
        this.viewEsimStoreBtn = page.getByRole('button', { name: "VIEW eSIM STORE" });

        this.searchInput = page.getByTestId('search-input');
    }

    getCountryLink(countryName: string): Locator {
        return this.page.getByTestId(`${countryName}-name`);
    }

    async navigateTo(): Promise<void> {
        await this.page.goto('https://www.airalo.com');
    }

    async handleInitialPopups(): Promise<void> {
        if (await this.acceptBtn.isVisible()) {
            await this.acceptBtn.click();
        }
        if (await this.cancelNotifBtn.isVisible()) {
            await this.cancelNotifBtn.click();
        }
        await this.viewEsimStoreBtn.click();
    }

    async searchByCountry(country: string): Promise<void> {
        await this.searchInput.click();
        await this.searchInput.fill(country);
    
        const countryLink = this.getCountryLink(country);
        await countryLink.waitFor({ state: 'visible', timeout: 5000 });
        await countryLink.click();
    }
}