import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import format from './formatters/index.js'; // Tu selector de formatos

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    const ext1 = path.extname(filepath1);
    const ext2 = path.extname(filepath2);

    const data1 = parseData(fs.readFileSync(absolutePath1, 'utf-8'), ext1);
    const data2 = parseData(fs.readFileSync(absolutePath2, 'utf-8'), ext2);

    // Pasamos los datos directamente al formateador (que por defecto usa 'stylish')
    return format(data1, data2, formatName);
};

export default genDiff;