import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CountryPage, SimDetailInfoItem } from '../pages/CountryPage';

test.describe('Local E-Sim Tests', () => {
    let homePage: HomePage;
    let countryPage: CountryPage;

    // Common setup for all local e-Sim tests
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        countryPage = new CountryPage(page);

        await homePage.navigateTo();
        await homePage.handleInitialPopups();
    });

    test.describe('Japan E-Sim Tests', () => {
        // Specific setup for Japan tests
        test.beforeEach(async ({ page }) => {
            await homePage.searchByCountry("Japan");
            await expect(page).toHaveURL("https://www.airalo.com/japan-esim");
        });

        test('should display correct package details', async ({ page }) => {
            await countryPage.firstBuyNowBtn.click();
            await expect(countryPage.operatorTitle).toHaveText("Moshi Moshi");

            await verifyEsimDetails(countryPage, "Japan", "1 GB", "7 Days", "$4.50 USD");
        });
    });
});

async function verifyEsimDetails(countryPage: CountryPage, expectedCoverage: string, expectedData: string, expectedValidity: string, expectedPrice: string): Promise<void> {
  await expect(countryPage.getItemLocator(SimDetailInfoItem.COVERAGE)).toHaveText("COVERAGE");
  await expect(countryPage.getItemValueLocator(SimDetailInfoItem.COVERAGE)).toHaveText(expectedCoverage);

  await expect(countryPage.getItemLocator(SimDetailInfoItem.DATA)).toHaveText("DATA");
  await expect(countryPage.getItemValueLocator(SimDetailInfoItem.DATA)).toHaveText(expectedData);

  await expect(countryPage.getItemLocator(SimDetailInfoItem.VALIDITY)).toHaveText("VALIDITY");
  await expect(countryPage.getItemValueLocator(SimDetailInfoItem.VALIDITY)).toHaveText(expectedValidity);

  await expect(countryPage.getItemLocator(SimDetailInfoItem.PRICE)).toHaveText("PRICE");
  await expect(countryPage.getItemValueLocator(SimDetailInfoItem.PRICE)).toHaveText(expectedPrice);
}