import React, { useState, createContext, useContext } from 'react';

export const Context = createContext();
export default function ContextProvider({ children }) {

    //Error handling
    const [isFileError, setFileIsError] = useState(false);
    const [isConfigError, setIsConfigError] = useState(false);
    const [isDataError, setIsDataError] = useState(false)

    //tableData State
    const [tabledata, setTabledata] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [exportToCSV, setExportToCSV] = useState(null)
    const getData = async function (reqProps) {
        setIsLoading(true);
        const { selectedFile, selectedConfig, selectedClientType } = reqProps;
        const res = await fetch(`/data?file=${selectedFile}&config=${selectedConfig}&type=${selectedClientType}`);

        if (!res.ok) {
            if (!isDataError) setIsDataError(true);
            setIsLoading(false);
            return Promise.reject(res)
        }

        if (res.ok) {
            const json = await res.json();
            setTabledata(json);
            if (isDataError) setIsDataError(false);
            setIsLoading(false);
            setExportToCSV(`file=${selectedFile}&config=${selectedConfig}&type=${selectedClientType}`)
        }
    }

    //File related state data
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState(null);
    const filesAsyncFunction = async function () {
        console.log("File context function called");

        //Files already exist in state
        if (files && files.length > 1) {
            if (isFileError) setFileIsError(false);
            return
        }

        //else fetch data, then update state or catch error
        const res = await fetch('/files')
        if (!res.ok) {
            console.log("File API Error");
            setFileIsError(true);
            return Promise.reject(res);
        }
        if (res.ok) {
            if (isFileError) setFileIsError(false);
            const json = await res.json();
            setFiles(json);
        }

    }



    //Config

    const [selectedConfig, setSelectedConfig] = useState(null);
    const [configs, setConfigs] = useState(null);


    const configsAsyncFunction = async function () {
        console.log("appContext Config called");

        //Check is configs exist in state
        if (configs && Object.keys(configs).length > 1) {
            if (isConfigError) setFileIsError(false);
            return
        }

        //else fetch data, then update state or catch error
        const res = await (fetch(`/configs`))
        if (!res.ok) {
            console.log("bad response");
            if (!isConfigError)
                setIsConfigError(true);
            return Promise.reject(res);
        }
        if (res.ok) {
            console.log("Res of config = " + res.ok);
            const json = await res.json();
            if (isConfigError)
                setIsConfigError(false);
            setConfigs(json);
        }
        else return
    }

    //sClientType

    const [selectedClientType, setSelectedClientType] = useState("All");

    const contextValues = {
        tabledata,
        setTabledata,
        getData,
        selectedFile,
        setSelectedFile,
        files,
        setFiles,
        selectedConfig,
        setSelectedConfig,
        configs,
        setConfigs,
        selectedClientType,
        setSelectedClientType,
        isLoading,
        setIsLoading,
        filesAsyncFunction,
        configsAsyncFunction,
        isFileError,
        isConfigError,
        isDataError,
        exportToCSV
    };

    return (
        <Context.Provider value={contextValues}>
            {children}
        </Context.Provider>
    )
}

export function useDataContext() {
    return useContext(Context);
}