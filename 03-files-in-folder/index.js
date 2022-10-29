const path = require('path');
console.log(path.basename(__filename)) // index.js - имя файла на Windows, полный путь к файлу на POSIX-системах
console.log(path.dirname(__filename)) // C:\Users\Admin\Desktop\nodejs-basic - название папки
console.log(path.extname(__filename)) // .js - расширение файла
console.log(path.parse(__filename));