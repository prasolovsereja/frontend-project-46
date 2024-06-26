const dataTypes = {
  added: 'was added with value: ',
  deleted: 'was removed',
  changed: 'was updated. From',
};
const formString = (value) => {
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
          return `Property '${fullKey}' ${dataTypes.added}${formString(node.value)}`;
        case 'deleted':
          return `Property '${fullKey}' ${dataTypes.deleted}`;
        case 'nested':
          return iter(node.children, `${fullKey}.`);
        case 'changed':
          return `Property '${fullKey}' ${dataTypes.changed} ${formString(node.value1)} to ${formString(node.value2)}`;
        default:
          return null;
      }
    });
    return result.filter((item) => item !== null).join('\n');
  };
  return iter(tree, '');
};
export default getPlain;
