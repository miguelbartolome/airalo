import { Locator, Page } from '@playwright/test';

export enum SimDetailInfoItem {
    COVERAGE = 'COVERAGE',
    DATA = 'DATA',
    VALIDITY = 'VALIDITY',
    PRICE = 'PRICE'
}

export class CountryPage {
    readonly page: Page;
    readonly firstBuyNowBtn: Locator;
    readonly operatorTitle: Locator;
    readonly infoList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstBuyNowBtn = page.getByRole('button', { name: "BUY NOW" }).nth(0);
        this.operatorTitle = page.getByTestId('sim-detail-operator-title');
        this.infoList = page.getByTestId('sim-detail-info-list');
    }
 
    private getItemBaseLocator(item: SimDetailInfoItem): Locator {
        return this.infoList.locator(`li:has([data-testid="${item}-row"])`);
    }

    getItemLocator(item: SimDetailInfoItem): Locator {
        return this.getItemBaseLocator(item).locator(`[data-testid="${item}-row"]`);
    }

    getItemValueLocator(item: SimDetailInfoItem): Locator {
        return this.getItemBaseLocator(item).locator(`[data-testid="${item}-value"]`);
    }
}