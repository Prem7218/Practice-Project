
let obj = {
    name: "Prem",
    age: 24,
    address: {
        plot: 54,
        area: {
            section: 'A',
            colony: 'Mangle_Murti'
        }
    }
}

function flatterObject(obj, parent = '') {
    let result = {};
    
    for(let key in obj) {
        let newKey = parent ? parent + '.' + key : key;

        if(typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(result, flatterObject(obj[key], newKey));
        }
        else {
            result[newKey] = obj[key];
        }
    }

    return result;
}

console.log(flatterObject(obj));