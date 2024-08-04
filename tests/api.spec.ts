import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('should create and retrieve eSIMs and verify correctness', async ({ request }) => {
  const clientId = process.env.CLIENT_ID || '';
  const clientSecret = process.env.CLIENT_SECRET || '';

  if (!clientId || !clientSecret) {
    throw new Error('CLIENT_ID and CLIENT_SECRET environment variables must be defined');
  }

  // Step 1: Obtain the access token
  const tokenResponse = await request.post('https://sandbox-partners-api.airalo.com/v2/token', {
    headers: { 'Accept': 'application/json' },
    form: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials'
    }
  });

  expect(tokenResponse.ok()).toBeTruthy();
  const { data: { access_token } } = await tokenResponse.json();

  // Step 2: Create a new order and retrieve simIds
  const orderResponse = await request.post('https://sandbox-partners-api.airalo.com/v2/orders', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    form: {
      quantity: '6',
      package_id: 'merhaba-7days-1gb',
      type: 'sim',
      description: '6 merhaba',
    }
  });

  expect(orderResponse.ok()).toBeTruthy();
  const orderData = await orderResponse.json();

  // Verify package_id, quantity, and number of sims in the order response
  expect(orderData.data.package_id).toBe('merhaba-7days-1gb');
  expect(orderData.data.quantity).toBe(6);
  expect(orderData.data.sims.length).toBe(6);

  // Extract simIds from the order response
  const simIds = orderData.data.sims.map(sim => sim.id);

  // Step 3: Send the GET request to retrieve the list of eSIMs
  const esimsResponse = await request.get('https://sandbox-partners-api.airalo.com/v2/sims?include=order', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  });

  expect(esimsResponse.ok()).toBeTruthy();
  const esimListResponse = await esimsResponse.json();

  // Step 4: Filter the eSIMs that match the simIds
  const matchingEsims = esimListResponse.data.filter(esim => simIds.includes(esim.id));

  // Step 5: Verify that all simIds are found in the eSIMs response
  expect(matchingEsims.length).toBe(simIds.length);

  matchingEsims.forEach(esim => {
    // Verify the package_id and quantity in the eSIMs response
    expect(esim.simable.package_id).toBe('merhaba-7days-1gb');
    expect(esim.simable.quantity).toBe(6);
  });
});