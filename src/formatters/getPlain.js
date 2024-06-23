const dataTypes = {
  added: 'was added with value: ',
  deleted: 'was removed',
  changed: 'was updated. From',
};
const getString = (value) => {
  switch (typeof value) {
    case 'object':
      return value === null ? value : '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};
const getPlain = (tree) => {
  const iter = (data, path) => {
    const result = data.map((node) => {
      const fullKey = `${path}${node.key}`;
      const { type } = node;
      switch (type) {
        case 'added':
          return `Property '${fullKey}' ${dataTypes.added}${getString(node.value)}`;
        case 'deleted':
          return `Property '${fullKey}' ${dataTypes.deleted}`;
        case 'nested':
          return iter(node.children, `${fullKey}.`);
        case 'changed':
          return `Property '${fullKey}' ${dataTypes.changed} ${getString(node.value1)} to ${getString(node.value2)}`;
        default:
          return '';
      }
    });
    return result.filter((item) => item !== '').join('\n');
  };
  return iter(tree, '');
};
export default getPlain;
