import React from 'react';
import { ConfigTableSort } from './TableSort';
import { useDataContext } from '../../../app/appContext';

export function TableParent() {
    const { tabledata } = useDataContext();

    //Sort data asc / desc
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const compare = function (a, b) {
        if (order === "asc") return a[orderBy].toLowerCase() > b[orderBy].toLowerCase() ? 1 : -1;
        else return a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? 1 : -1;
    }
    const sortedData = tabledata.sort(compare);

    //Click handler for sort
    const createSortHandler = (property) => (event) => {
        clickHandler(event, property);
    };

    const clickHandler = function (event, property) {
        setOrderBy(property);
        order === 'asc' ? setOrder('desc') : setOrder('asc');
    }


    if (tabledata) {
        return (
            <div>
                <ConfigTableSort data={sortedData} clickHandler={createSortHandler} order={order} orderBy={orderBy} />
            </div>
        )
    }

}