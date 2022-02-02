const FS = require('fs');
const PATH = require('path');

const scan_dirs = (path = '', collected_json = {}) => {
    const dir = PATH.resolve(__dirname, 'docs', path);
    const files = FS.readdirSync(dir, { withFileTypes: true });
    let collected_files = [];
    files.forEach(file => {
        if (file.isDirectory()) {
            collected_json[file.name] = 
                scan_dirs(PATH.join(path, file.name), {});
        } else collected_files.push(file.name);
    });
    collected_json['files'] = collected_files;
    return collected_json;
};

const JS_CONTENT = Buffer.from(`const dirs=${JSON.stringify(scan_dirs())};export default dirs;`);
FS.open('./dir-structure.js', 'w', (err, fd) => {
    if (err)
        console.log(`Error encountered while opening file!\n${err.message || err.toString()}`);
    else 
        FS.write(fd, JS_CONTENT, 0, JS_CONTENT.length, null, (err, _, __) => {
            if (err)
                console.log(`Error encountered while writing file!\n${err.message || err.toString()}`);
            else 
                console.log("File written successfully!");
        });
});