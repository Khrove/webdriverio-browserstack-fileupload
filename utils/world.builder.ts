import { exec } from "child_process";

export const startBrowserStackLocal = () => {
    return new Promise((resolve, reject) => {
        const bsLocal = exec(`${process.env.INIT_CWD}/browserstack/BrowserStackLocal.exe --key ${process.env.BROWSERSTACK_ACCESSKEY}`);

        bsLocal.stdout.on('data', function (data) {
            if (data.includes('You can now access your local server(s)')) {
                console.log('BrowserStackLocal is ready!');
                resolve(bsLocal);
            }
        });

        bsLocal.stderr.on('data', function (data) {
            reject(new Error(`Error starting BrowserStackLocal: ${data}`));
        });
    });
};