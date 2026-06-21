import { test, expect } from '@playwright/test';

test.describe('Page Loading & Performance Diagnostics', () => {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Live Music', path: '/live' },
    { name: 'Publications', path: '/publications' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Info / Services', path: '/info' }
  ];

  for (const pageInfo of pages) {
    test(`Measure load times and asset integrity for ${pageInfo.name}`, async ({ page }) => {
      // Monitor network requests for errors (broken assets)
      const failedRequests: string[] = [];
      page.on('requestfailed', request => {
        failedRequests.push(`${request.url()}: ${request.failure()?.errorText}`);
      });
      page.on('response', response => {
        const status = response.status();
        // Ignore Google Analytics or external connections that fail locally
        if (status >= 400 && !response.url().includes('google') && !response.url().includes('analytics')) {
          failedRequests.push(`${response.url()}: Status ${status}`);
        }
      });

      const startTime = Date.now();
      await page.goto(pageInfo.path, { waitUntil: 'load' });
      const loadTime = Date.now() - startTime;

      // Extract Navigation Timing metrics from the browser
      const timingJson = await page.evaluate(() => {
        const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (!nav) return null;
        return {
          dnsLookup: nav.domainLookupEnd - nav.domainLookupStart,
          tcpHandshake: nav.connectEnd - nav.connectStart,
          timeToFirstByte: nav.responseStart - nav.requestStart,
          domContentLoaded: nav.domContentLoadedEventEnd - nav.fetchStart,
          fullyLoaded: nav.loadEventEnd - nav.fetchStart,
        };
      });

      console.log(`\n=== Performance Report: ${pageInfo.name} ===`);
      console.log(`Path: ${pageInfo.path}`);
      console.log(`Simple Load Time: ${loadTime}ms`);
      if (timingJson) {
        console.log(`DNS Lookup: ${timingJson.dnsLookup.toFixed(2)}ms`);
        console.log(`TCP Connection: ${timingJson.tcpHandshake.toFixed(2)}ms`);
        console.log(`Time to First Byte (TTFB): ${timingJson.timeToFirstByte.toFixed(2)}ms`);
        console.log(`DOM Content Loaded: ${timingJson.domContentLoaded.toFixed(2)}ms`);
        console.log(`Page Fully Loaded: ${timingJson.fullyLoaded.toFixed(2)}ms`);
      }
      
      console.log(`Broken Assets Detected: ${failedRequests.length}`);
      if (failedRequests.length > 0) {
        console.log('Failed Requests:', failedRequests);
      }

      // Assertions
      expect(failedRequests.length).toBe(0);
      if (timingJson) {
        expect(timingJson.timeToFirstByte).toBeLessThan(3500); // Allow JIT compiler overhead locally
      }
    });
  }
});
