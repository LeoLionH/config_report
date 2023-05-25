import { Button } from '@mui/material';
import { useDataContext } from '../../app/appContext';
import React, { useEffect, useState } from 'react';

export const Export = function () {
    const { exportToCSV } = useDataContext();
    const [csvLink, setCSVLink] = useState(null);

    useEffect(() => {
        fetch(`/csv-data?${exportToCSV}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
            }
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(
                    blob
                );
                console.log(url);
                setCSVLink(url);
            })
    }, [exportToCSV])

    return (
        <a href={csvLink} target="_blank" rel="noopener noreferrer" download="download.csv">
            <Button variant="outlined">Export</Button>
        </a>
    )
}
