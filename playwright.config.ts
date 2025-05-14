import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    webServer: [
        {
        command: 'npm run dev',
        cwd: './server',
        port: 8080,
        },
        {
        command: 'npm run dev',
        cwd: './client',
        port: 5173,
        },
    ],
    projects: [
        {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
        },
        {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
        },
        {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
        },
        {
        name: 'Mobile Chrome',
        use: { ...devices['Pixel 5'] },
        },
        {
        name: 'Mobile Safari',
        use: { ...devices['iPhone 12'] },
        },
        {
        name: 'Google Chrome',
        use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        },
        {
        name: 'Microsoft Edge',
        use: { ...devices['Desktop Edge'], channel: 'msedge' },
        },
    ],
});
