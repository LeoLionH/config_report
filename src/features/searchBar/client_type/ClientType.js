import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDataContext } from '../../../app/appContext';

export function ClientTypeSelect(props) {
    const { selectedClientType } = useDataContext();
    const clientType = ["All", "type_1", "type_2"];
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="clientTypeSelect">Client Type</InputLabel>
                <Select
                    labelId="clientType"
                    id="demo-simple-select"
                    value={selectedClientType}
                    label="client type"
                    onChange={props.handleChange}
                >
                    {clientType.map((type) => {
                        return <MenuItem key={type} value={type}>{type}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}
