const CacheClass = require("./cacheSubClass.js");

//Create object test

const testClass = new CacheClass();

beforeAll(() => {
    //Mock Fetch request for config value fetch
    jest.spyOn(CacheClass.prototype, 'fetchWrapper').mockImplementation(async () => {
        return {
            data: [{ value: "resultOne" }, { value: "resultTwo" }]
        }
    })

    //Add site data and configs
    jest.spyOn(CacheClass.prototype, 'addSitesToObject').mockImplementation(async () => {
        testClass.sites = [
            {
                id: '1',
                name: 'Complete',
                businessModelType: 'RevShare',
                configs: {
                    one: [
                        {
                            config: "configOne",
                            value: "true"
                        },
                    ]
                }
            },
            {
                id: '2',
                name: 'noFile',
                businessModelType: 'RevShare',
            }
        ]
        return testClass.sites
    })
})

test('Ensure test object is correct',
    async function () {
        //Create sites
        testClass.getSites();
        const siteOne = testClass.sites[0];
        const siteTwo = testClass.sites[1];
        //Ensure no data is recorded
        const actual = Object.keys(testClass.data).length;
        const expected = 0
        expect(actual === expected).toBeTruthy();
        expect(siteOne.configs.one.length).toEqual(1);
        expect(siteTwo.id).toEqual('2');
        expect(siteTwo.configs).toBeFalsy();
    }
)

test('1. If the config exists, replace it',
    async function () {
        const replaceExistingConfig = {
            file: "one",
            config: "configOne",
            client: '1',
            url: "www.one.com"
        }

        //Check orginal value
        const site = testClass.sites[0];
        const beforeActual = site.configs.one[0].value;
        const beforeExpected = 'true';
        expect(beforeActual).toEqual(beforeExpected);

        //Run function and check value replaced
        await testClass.configFunction(replaceExistingConfig);
        const actual = site.configs.one[0].value;
        const expected = 'resultOne';
        expect(actual).toEqual(expected);
        //Ensure array length is the same
        expect(site.configs.one.length).toEqual(1);
    }
)

test('2. If file exists but not the config, add... config', async () => {
    const addConfigToFile = {
        file: "one",
        config: "configTwo",
        client: '1',
        url: "www.one.com"
    }
    const site = testClass.sites[0];
    await testClass.configFunction(addConfigToFile);
    const actual = site.configs.one.length
    const expected = 2;
    expect(actual).toEqual(expected);
})

test('3. If configs array doesn\'t exist, add... configs array > file > config', async () => {
    const addConfigAndFile = {
        file: "two",
        config: "configThree",
        client: '2',
        url: "www.two.com"
    }
    const siteTwo = testClass.sites[1];
    await testClass.configFunction(addConfigAndFile);
    const actual = siteTwo.configs.two[0].value
    const expected = 'resultOne';
    expect(actual).toEqual(expected);
})

test('4. If configs Array exists but not the file, add file > config', async () => {
    const four = {
        file: "three",
        config: "configFour",
        client: '2',
        url: "www.two.com"
    }
    const siteTwo = testClass.sites[1];
    await testClass.configFunction(four);
    const actual = siteTwo.configs.three[0].value
    const expected = 'resultOne';
    expect(actual).toEqual(expected);
})
