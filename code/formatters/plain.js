import _ from 'lodash';

const stringifyValue = (value) => {
    if (value !== null && typeof value === 'object') {
        return '[complex value]';
    }
    return typeof value === 'string' ? `'${value}'` : value;
};

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const plain = (data1, data2) => {
    const iter = (obj1, obj2, currentPath = '') => {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        const keysMerged = _.union(keys1, keys2).sort();

        const compare = keysMerged.flatMap((key) => {
            const value1 = obj1[key];
            const value2 = obj2[key];

            const propertyPath = currentPath ? `${currentPath}.${key}` : key;

            const inFirst = keys1.includes(key);
            const inSecond = keys2.includes(key);

            if (isObject(value1) && isObject(value2)) {
                return iter(value1, value2, propertyPath);
            }
            
            if (inFirst && !inSecond) {
                return `Property '${propertyPath}' was removed`;
            }

            if (!inFirst && inSecond) {
                return `Property '${propertyPath}' was added with value: ${stringifyValue(value2)}`;
            }

            if (value1 === value2) {
                return []; 
            }

            return `Property '${propertyPath}' was updated. From ${stringifyValue(value1)} to ${stringifyValue(value2)}`;
        });

        return compare.join('\n');
    };

    return iter(data1, data2);
};

export default plain;