import React, { useEffect, useState } from 'react';
//const fetch = require('node-fetch');



export const filesAsyncFunction = async function () {
    const res = await fetch('/files');
    const json = await res.json();
    setFilesAsync(json);
}

export const configsAsync = async function () {
    const res = await fetch('http://localhost:3001/configs');
    const json = await res.json();
    return json
}
