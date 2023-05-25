const express = require('express');
const path = require("path");
const CacheClass = require('./modules/cacheSubClass');
const app = express();
const port = process.env.PORT || 3001;
const timeout = require('connect-timeout');
app.use(timeout(40000, { "respond": true }));
app.disable('etag');
const { jsonToCSV } = require('./modules/jsonToCSV');

//Initialise configClass used to get CPIDs, files, config names and values
const fileData = new CacheClass();

//Returns the build files for the React app. Used in production to serve the app. 
app.use(express.static(path.resolve(
    __dirname, '../build')));


//Returns the files from the configClass. Used to generate the file select. 
app.get('/files', async (req, res) => {
    const result = await fileData.getFiles();
    res.send(result);
})

//Returns the configs contained within a file from configClass. Used to generate the config select. 
app.get('/configs', async (req, res) => {
    const result = await fileData.getConfigs();
    res.send(result);
})

//Returns the sites and config values related to the file and config passed in

app.get('/data', async (req, res) => {
    const file = req.query.file;
    const config = req.query.config;
    const type = req.query.type;
    const dataProps = { file, config, type }
    if (!file || !config || !type) {
        res.status(400);
        res.send({ message: "Incorrect information supplied" })
    }
    const result = await fileData.getData(dataProps);
    if (!req.timedout)
        res.send(result);
})

//end-point to return data as CSV
app.get('/csv-data', async (req, res) => {
    const file = req.query.file;
    const config = req.query.config;
    const type = req.query.type;
    const dataProps = { file, config, type }
    if (!file || !config || !type) {
        res.status(400);
        res.send({ message: "Incorrect information supplied" })
    }
    const result = await fileData.getData(dataProps);
    const csv = await jsonToCSV(result);
    if (!req.timedout) {
        console.log(__dirname);
        res.send(csv);
        console.log('file sent by endpoint');
    }
})

app.get('/healthcheck/', (req, res) => {
    res.send({ message: "ok" })
})

//Catches any other URLs
app.get('*', (req, res) => {
    if (!req.timedout)
        res.sendFile(path.resolve(__dirname,
            '../build', 'index.html'));
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function haltOnTimeout(err, req, res, next) {
    if (req.timedout === true) {
        res.status(504);
        res.send({ message: "timeout" });
    }
    else {
        next();
    }
};

app.use(haltOnTimeout);




