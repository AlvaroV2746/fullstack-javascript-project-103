import * as yaml from 'js-yaml';

const parseData = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Formato desconocido o no soportado: '${format}'`);
  }
};

export default parseData;