const _ = require('lodash');

const arr = [1, 2, 3, 4];
const reversed = _.reverse([...arr]);

console.log('Original:', arr);
console.log('Reversed:', reversed);
