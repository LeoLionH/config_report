import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDataContext } from '../../../app/appContext';

export function ConfigSearch(props) {
    const { configsAsyncFunction, configs, selectedFile, selectedConfig } = useDataContext();

    const filteredConfig = configs ? configs[selectedFile] : []
    console.log(configs);
    //Load configs on mount


    useEffect(() => {
        console.log("Use effect Config called");
        configsAsyncFunction();
    }, []);

    //Don't return results unless file is selected

    if (!configs) {
        return (
            <Autocomplete
                disabled
                value={selectedConfig}
                options={[]}
                disablePortal
                label="Select config"
                id="combo-box"
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Loading..." />}

            />
        )
    }

    if (!selectedFile) {
        return (
            <Autocomplete
                disabled
                value={selectedConfig}
                options={[]}
                disablePortal
                label="Select config"
                id="combo-box"
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select file..." />}

            />
        )
    }

    return (
        <Autocomplete
            onChange={(event, value) => props.handleChange(event, value)}
            disablePortal
            label="Select config"
            id="combo-box"
            value={selectedConfig}
            options={filteredConfig}
            isOptionEqualToValue={(option) => {
                if (option.value === "") {
                    return false;
                } else return true;
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select config" />}
        />
    )
}


