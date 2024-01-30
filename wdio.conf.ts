import {startBrowserStackLocal} from "./utils/world.builder";
import treeKill = require('tree-kill');
let bsLocal;

export const config = {
    suites: {
        partner_portal: ['./tests/spreadsheet.enrollment.spec.ts'],
    },
    capabilities: [
        {
            'bstack:options': {
                debug: 'true',
                local: true,
                os: 'Windows',
                osVersion: '11',
                browserVersion: '120',
                resolution: '1920x1080',
                buildName: 'playground-build',
                projectName: 'playground-project',
            },
            browserName: 'chrome',
            acceptInsecureCerts: true,
        },
    ],
    reporters: [
        'spec'
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
    hostname: 'hub.browserstack.com',
    services: [
        [
            'browserstack',
            {
                browserStackLocal: true
            },
        ],
    ],
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESSKEY,
    mochaOpts: {
        ui: 'bdd',
        timeout: '100000',
    },
    onPrepare: async function (config, capabilities) {
        console.log('Connecting to BrowserStackLocal...');

        const isBrowserStackLocalRunning = async () => {
            return new Promise((resolve) => {
                const { exec } = require('child_process');
                exec('tasklist /FI "IMAGENAME eq BrowserStackLocal.exe" /NH', (err, stdout) => {
                    if (err) {
                        console.error(err);
                        resolve(false);
                        return;
                    }
                    console.log(stdout);
                    resolve(stdout.includes('BrowserStackLocal.exe'));
                });
            });
        };

        if (await isBrowserStackLocalRunning()) {
            console.log('BrowserStackLocal is already running. Connecting to it...');
        } else {
            try {
                // Start BrowserStackLocal and store the reference for later use
                bsLocal = await startBrowserStackLocal();
            } catch (error) {
                console.error(error.message);
                process.exit(1); // Exit the process if BrowserStackLocal fails to start
            }
        }
    },
    onComplete: async function () {
        console.log('Closing BrowserStackLocal...');

        const stopBrowserStackLocal = () => {
            return new Promise<void>((resolve, reject) => {
                if (bsLocal) {
                    treeKill(bsLocal.pid, 'SIGTERM', (err) => {
                        if (err) {
                            reject(new Error(`Error stopping BrowserStackLocal: ${err}`));
                        } else {
                            console.log('BrowserStackLocal is closed.');
                            resolve();
                        }
                    });
                } else {
                    console.log('BrowserStackLocal was not started in this session.');
                    resolve();
                }
            });
        };

        try {
            await stopBrowserStackLocal();
        } catch (error) {
            console.error(error.message);
            process.exit(1); // Exit the process if BrowserStackLocal fails to stop
        }
    },
};
