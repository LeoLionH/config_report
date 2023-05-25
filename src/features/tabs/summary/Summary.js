import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export function Summary(props) {
    const data = props.data
    return (
        <div className="tableArea">
            <TableContainer className="tableContainer" component={Paper} sx={{ padding: 0 }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"
                                style={{ width: 100 }}
                            >Value</TableCell>
                            <TableCell align="left">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            data.map(value => (
                                <TableRow
                                    key={value.key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row"
                                        style={{ maxWidth: 800 }}
                                        className='textContainer'
                                    >
                                        {value.key}
                                    </TableCell>
                                    <TableCell component="th" scope="row"
                                        className='textContainer'
                                    >
                                        {value.count}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}







