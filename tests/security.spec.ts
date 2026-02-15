import { test, expect } from '../POM/fixtures/fixtures';

test.describe('Security test', () => {
  test('HTTPS protocol test', async ({ preparePricingPage, page, request, baseURL}) => {
    const response = await request.get(`${baseURL}/pricing/`);
    expect(response?.status()).toBeGreaterThanOrEqual(300);
    expect(page.url()).toContain('https://');
  });

  test('Security headers test', async ({ preparePricingPage, request, baseURL }) => {
    const response = await request.get(`${baseURL}/pricing/`);
    const headers = response.headers();

    expect(headers['strict-transport-security']).toBeDefined();
    expect(headers['x-frame-options']).toBeDefined();
    expect(headers['x-content-type-options']).toBe('nosniff');
  });
});
