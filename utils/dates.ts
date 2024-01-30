function today(isDomestic: boolean): string {
    let date = '';
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        // @ts-ignore
        dd = '0' + dd;
    }
    if (mm < 10) {
        // @ts-ignore
        mm = '0' + mm;
    }
    if (isDomestic) date = mm + '/' + dd + '/' + yyyy;
    else date = dd + '/' + mm + '/' + yyyy;

    return date;
}