
// Import Synpress essentials instead of plain Playwright
import basicSetup from '../wallet-setup/basic.setup'; // Import our wallet setup
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';
import { mockTokenAddress,anvil1Address,anvil2Address,oneAmount } from '../test_constants';

// Create a Synpress test instance using Playwright fixtures and our setup
const test = testWithSynpress(metaMaskFixtures(basicSetup));

// Use expect from the Synpress test instance
const { expect } = test;



//-------------------------- test page has title ----------------------------------------
test('has title', async ({ page }) => {
  await page.goto('/'); // Assumes your app runs at the root path configured in playwright.config.ts
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TSender/); // Adjust "TSender" to match your Dapp's title
});


//----------------------- test please connect show ----------------------------------------

// The core test for wallet connection and UI change
test("should show the airdrop form when connected, otherwise not", async ({ page, context, metamaskPage, extensionId }) => {
  // The test function now receives Synpress/MetaMask fixtures: context, metamaskPage, extensionId
  await page.goto('/'); // load page

  // 1. Verify Initial State (Disconnected)
  // Use a specific locator like getByText or preferably getByTestId if available
  await expect(page.getByText('Please connect')).toBeVisible(); // Check for a disconnected message
  await expect(page.getByText('Token Address')).not.toBeVisible(); // Check that the form element is initially hidden
});
  
//------------------- test metamusk connects and shows the appropriate fields ------------------------
 
test('should show mock token in token box', async ({ context, page, metamaskPage, extensionId }) => {
  // Create a new MetaMask instance with the provided context, page, password, and extension ID
  const metamask = new MetaMask(context, metamaskPage, basicSetup.walletPassword, extensionId)

  // Navigate to the root page
  await page.goto('/')

  // Click the connect button to initiate the wallet connection
  await page.getByTestId('rk-connect-button').click()
  await page.getByTestId('rk-wallet-option-io.metamask').waitFor({
    state: 'visible',
    timeout: 30000
  });
  await page.getByTestId('rk-wallet-option-io.metamask').click();
  await metamask.connectToDapp();

  const customNetwork = {
    name: 'Anvil',
    rpcUrl: 'http://127.0.0.1:8545',
    chainId: 31337,
    symbol: 'ETH'
  }
  await metamask.addNetwork(customNetwork)

  await page.getByRole('textbox', { name: '0x', exact: true }).waitFor({
    state: 'visible',
    timeout: 30000
  });
  await page.getByRole('textbox', { name: '0x', exact: true }).fill(mockTokenAddress);
  await page.getByRole('textbox', { name: '0x123..., 0x456...' }).fill(anvil2Address);
  await page.getByRole('textbox', { name: '200, 300...' }).fill(oneAmount);
  await expect(page.getByText('Token Name:Mock Token')).toBeVisible();
});