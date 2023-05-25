import React from 'react';
import { useDataContext } from '../../../app/appContext';
import { Summary } from './Summary';

export function SummaryParent() {
    const { tabledata } = useDataContext();
    const arrayOfObjects = []
    //let topFiveValue = null;
    let sortedArrayOfObjects = null;
    const formatData = () => {
        const uniqueValues = [...new Set(tabledata.map(obj => obj.value))]
        uniqueValues.forEach(value => {
            let count = 0
            tabledata.forEach(obj => {
                if (obj.value === value) count++
            })
            arrayOfObjects.push({
                key: value,
                count: count
            })
        })
        sortedArrayOfObjects = arrayOfObjects.sort((a, b) => (b.count - a.count));
        //topFiveValue = sortedArrayOfObjects.slice(0, 5);
    }

    if (tabledata) formatData();
    if (sortedArrayOfObjects) return (
        <div>
            <Summary data={sortedArrayOfObjects} />
        </div>
    )
}