//const { json } = require('./mockdata');
const fs = require('fs');
const path = require("path");

const jsonToCSV = async function (json) {
    const fields = Object.keys(json[0]);
    const replacer = function (key, value) {
        return value === null ? '' : value
    }
    let csv = json.map(row => {
        return fields.map(fieldName => {
            return JSON.stringify(row[fieldName], replacer)
        }).join(',')
    })
    csv.unshift(fields.join(',')) // add header column
    csv = csv.join('\r\n');
    console.log('write complete');
    return csv
}

//jsonToCSV(json);

module.exports = { jsonToCSV }