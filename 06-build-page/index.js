const fs = require('fs');
const path = require('path');
const {rm, mkdir, readFile, writeFile, copyFile} = require('fs/promises');
const pathProject = path.join(__dirname, 'project-dist');

async function buildPage() {
    const fsPromises = fs.promises;
    const pathAssets = path.join(__dirname, 'assets');
    const pathCopyAssets = path.join(__dirname, 'project-dist/assets');
    await rm(pathProject, { recursive: true, force: true });
    await mkdir(pathProject);
    let template = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
    const tags = template.match(/{{\s*(\w+)\s*}}/g);
    await copyFile(path.join(__dirname, 'template.html'), path.join(pathProject, 'index.html'));

    for (const tag of tags) {
        let fileName = tag.replace(/[{}]/g, '') + '.html';
        let fileContent = await readFile(path.join(__dirname, 'components', fileName), 'utf-8');
        template = template.replace(tag, fileContent);
      }

    await writeFile(path.join(pathProject, 'index.html'), template);

    const writeStream = fs.createWriteStream (path.join(__dirname, 'project-dist', 'style.css'));
    
    await fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        else files.forEach(file => {
          const filepath = path.join(path.join(__dirname, 'styles'), file.name);
          const read = fs.createReadStream(filepath, 'utf8');
      
          if(file.isFile() && path.extname(file.name) == '.css')
            read.pipe(writeStream);
        });
    });

    async function copyAssets(pathAssets, pathCopyAssets){
      try{
        await mkdir(pathCopyAssets, { recursive: true });
        const files = await fsPromises.readdir(pathAssets, {withFileTypes: true});
            files.forEach(file => {        
                const pathAssetsFile = path.join(pathAssets, file.name);
                const pathCopyAssetsFile = path.join(pathCopyAssets, file.name);
                if(file.isDirectory()){
                copyAssets(pathAssetsFile,pathCopyAssetsFile);
                 } 
                 else {
                fsPromises.copyFile(pathAssetsFile, pathCopyAssetsFile);
                } 
            });
         }
        catch(err){
        console.err(err);
      }
    }
    copyAssets(pathAssets, pathCopyAssets);
  }
  buildPage();