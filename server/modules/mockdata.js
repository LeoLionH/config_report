const configData = {
    sites:
        [
            {
                id: '1',
                name: 'Site_1',
                businessModelType: 'type_1',
                configs: {
                    file_1: [
                        {
                            config: "config_1",
                            value: "true"
                        },
                        {
                            config: "config_2",
                            value: "false"
                        },
                    ],
                    file_2: [
                        {
                            config: "config_3",
                            value: "true"
                        },
                        {
                            config: "config_4",
                            value: "false"
                        },
                    ]
                }
            },
            {
                id: '2',
                name: 'Site_2',
                businessModelType: 'type_2',
                configs: {
                    file_1: [
                        {
                            config: "config_1",
                            value: "true"
                        },
                        {
                            config: "config_2",
                            value: "false"
                        },
                    ],
                    file_2: [
                        {
                            config: "config_3",
                            value: "true"
                        },
                        {
                            config: "config_4",
                            value: "false"
                        },
                    ]
                }
            }
        ],
    configs: [
        {
            key: "file_1",
            value: ['config_1', 'config_2', 'config_3']
        },
        {
            key: "file_2",
            value: ['config_4', 'config_5', 'config_6']
        }
    ],
    data: {
        "1": "true"
    }
}


const json = [
    {
        "name": "site_1",
        "businessModelType": "type_1",
        "file": "File_1",
        "config": "Config_1",
        "value": "true"
    },
    {
        "name": "site_2",
        "businessModelType": "type_2",
        "file": "File_1",
        "config": "Config_1",
        "value": "true"
    }
]

async function mockAPI() {
    const randomResponse = Math.round(Math.random()) === 0 ? true : false
    console.log('randomResponse is ' + randomResponse);
    return randomResponse === 0 ? true : false
}

module.exports = { configData, json, mockAPI }