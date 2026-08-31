import _ from 'lodash';

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const stringify = (currentValue, depth) => {
    if (!isObject(currentValue)) {
        return currentValue;
    }
    const indentSize = depth * 4;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 4);

    const lines = Object.entries(currentValue).map(([key, val]) => {
        return `${currentIndent}${key}: ${stringify(val, depth + 1)}`;
    });

    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const stylish = (data1, data2) => {
    const iter = (obj1, obj2, depth = 1) => {
        const indentSize = depth * 4;
        const currentIndent = ' '.repeat(indentSize - 2); 
        const bracketIndent = ' '.repeat(indentSize - 4); 

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        const keysMerged = _.union(keys1, keys2).sort();

        const compare = keysMerged.map((key) => {
            const value1 = obj1[key];
            const value2 = obj2[key];

            const inFirst = keys1.includes(key);
            const inSecond = keys2.includes(key);

            if (isObject(value1) && isObject(value2)) {
                const childrenDiff = iter(value1, value2, depth + 1);
                const currentBracketIndent = ' '.repeat(indentSize);
                return `${currentIndent}  ${key}: {\n${childrenDiff}\n${currentBracketIndent}}`;
            }
            
            if (inFirst && !inSecond) {
                const formattedValue = stringify(value1, depth + 1);
                return `${currentIndent}- ${key}: ${formattedValue}`;
            }

            if (!inFirst && inSecond) {
                const formattedValue = stringify(value2, depth + 1);
                return `${currentIndent}+ ${key}: ${formattedValue}`;
            }

            if (value1 === value2) {
                const formattedValue = stringify(value1, depth + 1);
                return `${currentIndent}  ${key}: ${formattedValue}`;
            }

            const formattedValue1 = stringify(value1, depth + 1);
            const formattedValue2 = stringify(value2, depth + 1);
            return `${currentIndent}- ${key}: ${formattedValue1}\n${currentIndent}+ ${key}: ${formattedValue2}`;
        });

        return compare.join('\n');
    };

    const result = iter(data1, data2, 1);
    return `{\n${result}\n}`;
};

export default stylish;