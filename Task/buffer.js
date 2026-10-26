let arr = [1, 2, 3];
let str1 = 'abs';
let str2 = 'xyz';

let bufferValues = Buffer.from(arr);
let bufferStr1 = Buffer.from(str1);
let bufferStr2 = Buffer.from(str2);

console.log(bufferValues); 
console.log(bufferStr1, bufferStr2);

let combinedBuffer = Buffer.concat([bufferStr1, bufferStr2]);
console.log(combinedBuffer);
console.log(combinedBuffer.toString());