export const waitForPage = async (url: string, locator?: string, timeout?: number) => {
    await browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'), {
        timeout: 60 * 1000, // 60 seconds
        timeoutMsg: 'Page is not fully loaded!',
    });

    await browser.waitUntil(
        async () => {
            const currUrl = await browser.getUrl();
            if (currUrl.includes(url)) return true;
        },
        {
            timeout: 60 * 1000,
            timeoutMsg: 'URL not matching',
        }
    );

    if (locator !== undefined && locator !== '') {
        await $(locator).waitForClickable();
    }
    // Sometimes you need a little explicit pause in your life. Use when needed, but not often.
    if (timeout !== undefined) {
        await browser.pause(timeout);
    }
}