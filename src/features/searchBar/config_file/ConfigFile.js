import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDataContext } from '../../../app/appContext';

export function ConfigFile(props) {

    //Load files on mount
    const { filesAsyncFunction, files } = useDataContext();
    useEffect(() => {
        console.log("Use effect file called");
        filesAsyncFunction();
    }, []);

    if (!files) {
        return (
            <Autocomplete
                disabled
                id="combo-box"
                disablePortal
                sx={{ width: 300 }}
                renderInput={(params) =>
                    <TextField {...params} label="Loading..." />}
            />)

    }

    return (
        <Autocomplete
            onChange={(event, value) => props.handleChange(event, value)}
            disablePortal
            id="combo-box"
            options={files}
            sx={{ width: 300 }}
            renderInput={(params) =>
                <TextField {...params} label="Select file"
                />}
        />
    )
}

