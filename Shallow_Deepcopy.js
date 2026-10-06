
// let obj4 = Object.assign({}, obj1); // Shallow copy
// let obj10 = _.clone(obj1); // Shallow copy using lodash
// let obj11 = R.clone(obj1); // Shallow copy using ramda



// let obj5 = JSON.parse(JSON.stringify(obj1)); // Deep copy
// let ojb6 = structuredClone(obj1); // Deep copy
// let obj7 = _.cloneDeep(obj1); // Deep copy using lodash
// let obj8 = R.clone(obj1); // Deep copy using ramda
// let obj9 = cloneDeep(obj1); // Deep copy using lodash-es

let obj1 = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        country: 'USA'
    },
    hobbies: {
        sports: {
            cricket: true,
            football: false,
            basketball: {
                indoor: true,
                outdoor: false
            }
        }
    }
}

let obj2 = {...obj1}; // Shallow copy
let obj3 = obj1; // Reference copy

console.log(`Shallow Copy...\n`);

obj2.address.city = { value: 'ojb2' };
console.log(obj1);

console.log(`\nDeep Copy...\n`);

obj3.address.city = { value: 'obj3' };
console.log(obj1);


