const uniqueArray = arr => [...new Set(arr)];
const propArray = (data, value) => data.map( node => node[value]);
const uniqueObj = (data, value) => uniqueArray(propArray(data,value));

export { uniqueArray, propArray, uniqueObj };
