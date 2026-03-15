import { defineConfig, devices } from '@playwright/test';
import { env } from 'node:process';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({
    path: `.env.${process.env.TEST_ENV || 'qa'}`,
    debug: false
});


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 30 * 1000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries: 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  workers : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'on-failure', outputFolder: '/report/html-report' }],
    ['allure-playwright', { open: 'never', outputFolder: '/report/allure-report' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: env.baseURL || 'https://www.demoblaze.com',

    //load the state of authentication before running the tests
    //storageState: "storage/auth.json",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
  },

  //grep: /@master/,

  /* Configure projects for major browsers */
  projects: [
    
    //load the state of authentication before running the tests
    {
      name: 'setup-auth',
      testMatch: /auth\.setup\.ts/,
      //testMatch: /.*\.setup\.ts/
    },

    { name: 'chromium', 
      use: 
      { ...devices['Desktop Chrome'],
        storageState: "storage/auth.json"
      },
      dependencies: ['setup-auth']},
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
