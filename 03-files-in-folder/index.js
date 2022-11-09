const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname,'secret-folder'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    
    files.forEach(file => {
        if(file.isFile()) 
        fs.stat(path.join(__dirname,'secret-folder', file.name), (err, stats) => {
            if (err) {
                throw err;
            }
            else {
                let fileSizeInBytes = stats.size ;
              return console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).slice(1)} - ${fileSizeInBytes + 'b'}`);
            }
        });
    });
});
