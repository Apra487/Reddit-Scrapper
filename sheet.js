const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet('<Goggle sheet ID>'); // ! Plase provide google sheet id
    }
    async load() {
        // * load directly from json file if not in secure environment
        await this.doc.useServiceAccountAuth(require('./credentials.json'));
        await this.doc.loadInfo(); // * loads document properties and worksheets
        return this.doc.sheetsByIndex;
    }

    async addSheets(title, headerValues){
        await this.doc.addSheet({title, headerValues});
        return this.doc.sheetsByIndex.length - 1;
    }
    async addRows(rows, i) {
        const sheet = this.doc.sheetsByIndex[i];
        await sheet.addRows(rows);
    }

    async delete(i){
        const sheet = this.doc.sheetsByIndex[i];
        await sheet.delete();
    }

    async getRows(i) {
        const sheet = this.doc.sheetsByIndex[i];
        const rows =await sheet.getRows();
        return rows;
    }
    async setHeaderRow(headerValues, i){
        const sheet = this.doc.sheetsByIndex[i];
        await sheet.setHeaderRow(headerValues);
    }


}

