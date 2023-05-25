const { getTableHeadUtilityClass } = require('@mui/material');
const fetch = require('node-fetch');
const pLimit = require('p-limit');
const apiLimiter = pLimit(5);
const mockData = require('./mockdata');
const mockAPI = mockData.mockAPI;

/**
 * configClass is responsible for the generation of sites, files, configs and config values. 
 * This class is called from the cacheSubClass and never called from the API directly
*/

module.exports = class ConfigData {
    constructor() {
        this.sites = [];
        this.files = null;
        this.configs = {}
        this.data = {};
    }

    //Fetch wrapper that contains a timeout. Optionally could be changed to include a parameter for timeout in ms.
    //Replaced for test purposes to be a call to a mockAPI
    async fetchWrapper(url) {
        const res = await mockAPI(url);
        return res
    }

    /**
     * 'addSitesToObject' is responsible for getting all sites from (what would be) an API. 
     * Data is reshaped for use in the app and added to this.sites
     * @returns {object} All data in this.sites
     */

    async addSitesToObject() {
        //For example purposes, this circumvents the API. 
        //The real implementation would take a response, reshape it and then cache the results
        try {
            this.sites = mockData.configData.sites;
            console.log(this.sites);
            return this.sites;
        } catch (error) {
            console.log('site error' + error);
        }

    }

    /**
     * Adds file to this.data and this.configs for later use
     * @param {string} file - File name provided by getFiles function in cacheSubClass
     * @returns nothing, just completes
     */

    async addFile(file) {
        //Take file and add to data object
        this.configs[file] = [];
        return;
    }

    /**
     * Gets every config for each file. 
     * The real implmentation used fetch to generate the response however for example purposes this has been changed to a predetermined list.  
     * @param {string} file - File to get configs for
     * @returns 
     */

    async addConfigsByFile(file) {
        try {
            let result = mockData.configData.configs;
            console.log(result);
            this.configs[file] = [];
            let index = result.findIndex(obj => obj.key === file);
            result[index].value.forEach(config => this.configs[file].push(config));
            return
        } catch (error) {
            console.log("Error - Aborted" + error);
        }
    }

    /**
     * This function is called from 'getConfigValuesForSites'. It is responsible for getting the config for each client. 
     * @param {object} urlObj - Object originally passed in from the 'getConfigValuesForSites' endpoint
     * @returns {string} - Returns string from the config API for the provided site
     */
    async configFunction(urlObj) {
        const { file, config, client, url } = urlObj;
        try {

            //Pre-requisites

            const result = await this.fetchWrapper(url); //Get config value

            //Simulate getting config value (normally API call)
            const i = mockData.configData.sites.findIndex(site => site.name === client)
            const configIndex = mockData.configData.sites[i].configs[file].find(obj => obj.config === config);

            this.data[client] = result; //Add config value to data
            const siteToAddConfigTo = this.sites.findIndex(site => site.id === client); //Find site in this.sites
            const clientRoute = this.sites[siteToAddConfigTo]; //create route for simplicity

            //Ensure correct structure is in place site > configs > file > config

            //Add configs object
            if (!clientRoute.configs)
                clientRoute["configs"] = {};

            //Add file
            if (!clientRoute.configs[file])
                clientRoute.configs = {
                    ...clientRoute.configs,
                    [file]: [
                        {
                            config: config,
                            value: null
                        }
                    ]
                }

            //Add individual config if it doesn't exist
            const configExists = clientRoute.configs[file].find(configObject => configObject.config === config);
            if (!configExists)
                clientRoute.configs[file] =
                    [
                        ...clientRoute.configs[file],
                        {
                            config: config,
                            value: null
                        }
                    ]

            //Now that the site must have the right structure in place, add the result to the config value
            const index = clientRoute.configs[file].findIndex(configObject => configObject.config === config);
            clientRoute.configs[file][index].value = result;
            return result;

        } catch (error) {
            console.log("Error: Aborted" + error);
        }
    }

    /**
     * Generates the API URLs for each client, then calls the configFunction using pLimit to limit requests to 1 open connection
     * @param {object} dataProps - Passed in from cacheSubClass 'getData' function. Originates from the API 'data' endpoint.
     */

    async getConfigValuesForSites(dataProps) {
        let { file, config } = dataProps;
        //Create list of urls to call
        let urls = [];
        this.data = {};
        const clients = this.sites.map(site => site.id);
        for (let client of clients) {
            let url = `${client}/${file}/${config}`;
            urls.push({ file, config, client, url });
        }
        console.log("URLs = " + urls.length);

        //Call URLs
        const callMap = await Promise.all(urls.map(url => {
            let queue = apiLimiter(() => this.configFunction(url));
            return queue;
        })).then(queue => queue).then();
    }

    async filterSitesByConfig(dataProps) {
        const { file, config } = dataProps;
        let data = [];
        this.sites.forEach(site => {
            try {
                let i = site.configs[file].findIndex(configList => configList.config === config)
                data.push({
                    name: site.name,
                    businessModelType: site.businessModelType,
                    file: file,
                    config: site.configs[file][i].config,
                    value: site.configs[file][i].value
                });
            } catch (e) {
                console.log(e);
            }


        })
        return data;
    }
}



