import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export function ErrorMessage() {
    return (
        <div className="error">
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">API Error. Please refresh and try again</Alert>
            </Stack>
        </div>
    )
}
