const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

    fs.writeFile(
        path.join(__dirname, 'mynotes.txt'),
        '',
        (err) => {
            if (err) throw err;
        }
    );
    stdout.write('Привет! Введи содержимое файла:\n');
    stdin.on('data', data => {
        const dataStringified = data.toString().trim();
        if (dataStringified === 'exit'){
            console.log('Прощай :(');
            process.exit();
        }
        else stdout.write('Добавить что-нибудь еще?\n');

        fs.appendFile(
            path.join(__dirname, 'mynotes.txt'),
            dataStringified + '\n' ,
            err => {
                if (err) throw err;
            }
        );

    });
    process.on('SIGINT', () =>{
        console.log('Прощай :(');
        process.exit();
      });
 

