export const config = {
    suites: {
        partner_portal: ['./tests/spreadsheet.enrollment.spec.ts'],
    },
    capabilities: [
        {
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                args: ['--window-size=1920,1080', 'disable-notifications', '--disable-save-password-bubble'],
            },
            'goog:loggingPrefs': {
                browser: 'ALL',
            },
        },
    ],
    maxInstances: 2,
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true,
        },
    },
    logLevel: 'warn',
    waitforTimeout: 20000,
    connectionRetryTimeout: 40000,
    connectionRetryCount: 3,
    framework: 'mocha',
    outputDir: '/wdio/logs',
    services: ['chromedriver'],
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: '100000',
    },
};
