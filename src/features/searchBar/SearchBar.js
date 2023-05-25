import React from 'react';
import { ConfigSearch } from './config_search/ConfigSearch';
import { ConfigFile } from './config_file/ConfigFile';
import { ClientTypeSelect } from './client_type/ClientType';
import { useDataContext } from '../../app/appContext';
import { Button } from '@mui/material';
import './searchBar.css';

export function SearchBar() {
    console.log("search bar rendered")
    //getData function
    const {
        getData, selectedFile, setSelectedFile, selectedConfig,
        setSelectedConfig, selectedClientType } = useDataContext();

    //Submition of form to API
    const handleSubmit = (e) => {
        e.preventDefault();
        const reqProps = { selectedFile, selectedConfig, selectedClientType }
        //Data sent to API through thunk
        getData(reqProps);
    }

    //update config on select change
    const handleConfigChange = (event, value) => {
        setSelectedConfig(value);
    }

    //update file on select change
    const handleFileChange = (event, value) => {
        //Set config to null to avoid conflict with file
        setSelectedConfig(null);
        //Update file in state
        setSelectedFile(value);
    }

    //set clientType on select change
    const { setSelectedClientType } = useDataContext();
    const handleClientTypeChange = (event) => {
        let value = event.target.value;
        setSelectedClientType(value);
    }

    return (
        <div className="searchArea">
            <div className="searchContainer">
                <div className="searchBar">
                    <div data-testid="fileSearch" className="searchElement select">
                        <ConfigFile handleChange={handleFileChange} />
                    </div>
                    <div data-testid="configSearch" className="searchElement select">
                        <ConfigSearch handleChange={handleConfigChange} />
                    </div>
                    <div data-testid="clientType" className="searchElement select">
                        <ClientTypeSelect handleChange={handleClientTypeChange} />
                    </div>
                    <div data-testid="configSearch" className="searchElement btn">
                        {(!selectedConfig || !selectedFile) && <Button disabled variant="contained">Submit</Button>}
                        {(selectedConfig && selectedFile) && <Button onClick={handleSubmit} variant="contained">Submit</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}