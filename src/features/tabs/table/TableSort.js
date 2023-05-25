import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from '@mui/material/Paper';


const headCells = [
    {
        id: "name",
        label: "Site"
    },
    {
        id: "businessModelType",
        label: "Type"
    },
    {
        id: "value",
        label: "Value"
    }
]

export function ConfigTableSort(props) {

    const { data, clickHandler, order, orderBy } = props;

    //Sort data asc / desc


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
                                {
                                    headCells.map(headCell => (
                                        <TableCell
                                            key={headCell.id}
                                            align="left"

                                            sortDirection={orderBy === headCell.id ? order : false}
                                            onClick={clickHandler(headCell.id)}
                                        >

                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : "asc"}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                data.map(site => (
                                    <TableRow
                                        key={site.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row"
                                            style={{ maxWidth: "50px" }}
                                            className='textContainer'
                                        >
                                            {site.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row"
                                            style={{ maxWidth: "50px" }}
                                            className='textContainer'
                                        >
                                            {site.businessModelType}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            className='textContainer'
                                            style={{
                                                maxWidth: "400px",
                                            }}
                                        >
                                            {site.value}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}







