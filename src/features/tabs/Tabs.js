import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TableParent } from './table/TableParent';
import { SummaryParent } from './summary/SummaryParent';
import { Export } from '../export/Export';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <>

            <div

                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                orientation="vertical"
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        </>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="tableAll" sx={{ width: '100%' }}>
            <div className="exportBtnRow">
                <div className="exportBtn">
                    <Export />
                </div>
            </div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Summary" {...a11yProps(0)} />
                    <Tab label="List of sites" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <div className='panelDiv'>
                <TabPanel sx={{ padding: 0 }} value={value} index={0}>
                    <SummaryParent />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableParent />
                </TabPanel>
            </div>
        </div>
    );
}