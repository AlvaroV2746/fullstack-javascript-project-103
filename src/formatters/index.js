// src/formatters/index.js
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
    stylish, plain
};

const format = (data1, data2, formatName) => {
    const formatter = formatters[formatName];
    if (!formatter) {
        throw new Error(`Unknown formatter: ${formatName}`);
    }
    return formatter(data1, data2);
};

export default format;