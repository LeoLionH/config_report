const ConfigData = require('./configClass');
const pLimit = require('p-limit');
const apiLimiter = pLimit(5);
const { files, testFiles } = require('./constants');
var cache = require('memory-cache');

/**
 * This class layer represents the entry point for all external calls. 
 * It is responsible for checking, creating and returning cache data
 * If the data doesn't exist, it calls down to the configClass layer to get it
*/

module.exports = class CacheClass extends ConfigData {
    constructor() {
        super();
    }

    /**
     * Generates the files to power the file select in the UI 
     * files is currently just an Array of files hardcoded from '/constants.js'
     * @returns {Array} Array of the file names derived from '/constants.js'
     */

    async getFiles() {
        //Get Array of files for the select from constants.js
        if (cache.get(files)) return cache.get(files);
        cache.put('files', files);
        return cache.get('files');
    }

    /**
     * Responsible for getting the configs related to each file
     * If cached will return this, else...
     ** Call getFiles and iterate through files adding the resluts to an array
     ** Run the array using pLimit to ensure open requests are limited 
     * @returns {object} - the full list of files and related configs 
     */

    async getConfigs() {
        //Check cache and return if avaialable
        const configs = cache.get('configs');
        if (configs) return configs;

        //Else get the files and create an array of calls using pLimit
        const files = await this.getFiles();
        let arr = [];
        files.forEach(file => {
            arr.push(apiLimiter(() => this.addConfigsByFile(file)));
        })

        //Then execute the array, add to cache and return the cached data
        const result = await Promise.all(arr)
        cache.put('configs', this.configs)
        return cache.get('configs');
    }

    /**
     * Checks if list of sites has been generated in the last 24 hours
     * Else generates the list of sites
     * @returns {object} - List of all sites and related properties
     */

    async getSites() {
        //Check Cache
        const DayInMs = 86400000;
        if (cache.get('sites')) {
            return cache.get('sites')
        }

        //otherwise retrieve data and cache it 
        await this.addSitesToObject();
        cache.put('sites', this.sites, DayInMs);
        console.log(this.sites);
        return cache.get('sites');
    }

    /**
     * Responsible for checking if config data values exist in which case it will return it 
     * if it's unavailable it will call the configClass to generate the data and await the response
     * @param {object} dataProps - contains the file and config passed in through the '/data' endpoint
     * @returns {object} - List of all the config values for every CPID
     */

    async getData(dataProps) {
        //Vars
        const { file, config, type } = dataProps;
        const DayInMs = 86400000;
        const dataCache = `data-${file}-${config}`;

        //Ensure prerequisites available
        if (this.sites.length < 1) await this.getSites();
        if (Object.keys(this.configs).length < 1) await this.getConfigs();

        //return cache
        if (cache.get(dataCache)) {
            const sitesFilteredByType = cache.get(dataCache).filter(site => {
                if (type === "all" || type === "All") return site;
                if (site.businessModelType.toLowerCase() === type.toLowerCase()) return site;
            })
            return sitesFilteredByType
        }

        //else
        await this.getConfigValuesForSites(dataProps);
        cache.put(dataCache, this.sites, DayInMs); //add data for later filtering
        let data = await this.filterSitesByConfig(dataProps); //Get specific config data for front-end
        cache.put(dataCache, data, DayInMs) //Add to cache
        //return cache filtered by type
        const sitesFilteredByType = cache.get(dataCache).filter(site => {
            if (type === "all" || type === "All") return site;
            if (site.businessModelType.toLowerCase() === type.toLowerCase()) return site;
        })
        return sitesFilteredByType
    }

}
