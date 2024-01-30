import {waitForPage} from "../utils/util-functions";
import * as path from "path";

describe('Spreadsheet Enrollment test', () => {
    it('Should login and navigate to the spreadsheet enrollment page', async () => {
        await browser.url('https://preflightpartner.roamright.com/router');
        await waitForPage('/router', 'input[id*="AgencyCode"]', 1000);
        await $('input[id*="AgencyCode"]').setValue('FlyMeAwayOnAFlamingo');
        await $('input[id*="btnGotoLoginPage"]').click();
        await waitForPage('/login?', '#UserName', 1000);
        await $('#UserName').setValue('partneradmin@archqa.com');
        await $('#Password').setValue('Travel01!');
        await $('#btnLogin').click();
        await waitForPage('/', '#sidebar [href="/admin/rosterimport"]', 1000);
        await $('#sidebar [href="/admin/rosterimport"]').click();
        await waitForPage('/admin/rosterimport', '[ng-click="$ctrl.uploadRoster()"]', 1000);

        const filePath = path.join(process.cwd(), '/downloads/flamigos_1_29.xlsx');
        await $('#spreadsheetUpload').setValue(filePath);

        await browser.pause(3000);
    });
});