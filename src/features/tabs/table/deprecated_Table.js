import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import './table.css'
import { useDataContext } from '../../../app/appContext';


export function ConfigTable(props) {
    const data = props.data
    if (!data) {
        return (
            <p>No data found</p>
        )
    }
    if (!props.hasFailed && data) {
        return (
            <div className="tableArea">
                <TableContainer className="tableContainer" component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Site</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Config</TableCell>
                                <TableCell align="left">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                data.map(site => (
                                    <TableRow
                                        key={site.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {site.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {site.businessModelType}
                                        </TableCell>
                                        <TableCell align="left">{site.config}</TableCell>
                                        <TableCell align="left">{site.value}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}







