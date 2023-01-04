import fs from "fs";
import path from "path";
import * as process from "process";
import {exec} from 'child_process';

const fileExt = ".widget.ts";
// import tsnode from 'ts-node';
//
// tsnode.register({
//     compilerOptions: {
//         "module": "commonJS",
//         "moduleResolution": "node",
//         "preserveConstEnums": true,
//         "strict": true,
//         "target": "esnext",
//         "esModuleInterop": true,
//     },
//     "esm": true,
//     "experimentalSpecifierResolution": "node",
// });

function searchFile(currentDirPath, callback) {
    fs.readdirSync(currentDirPath, {withFileTypes: true}).forEach((dirent) => {
        const filePath = path.join(currentDirPath, dirent.name);
        if (dirent.isFile()) {
            callback(filePath, dirent);
        } else if (dirent.isDirectory()) {
            searchFile(filePath, callback);
        }
    });
}

function scanWidgets() {
    const widgets = [];
    searchFile(path.join('./src'), async function (filePath, stat) {
        if (filePath.endsWith(fileExt)) {
            console.log(filePath);
            const s = 'file://' + path.join(process.cwd(), filePath);
            console.log(s)
            // exec("ts-node " + s)
            const widget = await import(s);
            console.log(widget)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            widgets.push(widget);
        }
    });
    return widgets
}

export default scanWidgets;
