const fs = require('fs');
const path = require('path');

const readfile = fs.createReadStream(path.join(__dirname, 'text.txt'));

let data = "";

readfile.on('data', chunk => {
    data += chunk;
});

readfile.on('end', () => {
    console.log(data);
});