const getSpaceAndSymbol = (depth, symbol = '') => {
  const space = ' ';
  const leftShift = 2;
  const spacesCount = 4;
  if (!symbol) {
    return `${space.repeat(depth * spacesCount)}`;
  }
  return `${space.repeat(depth * spacesCount - leftShift)}${symbol}`;
};
const stringify = (data, level) => {
  const iter = (currentValue, depth) => {
    if (typeof (currentValue) !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }
    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => `${getSpaceAndSymbol(depth + 1)}${key}: ${iter(value, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${getSpaceAndSymbol(depth)}}`,
    ].join('\n');
  };
  return iter(data, level);
};
const getStylish = (tree) => {
  const iter = (data, depth) => {
    const result = data.map((node) => {
      const { type } = node;
      switch (type) {
        case 'deleted':
          return `${getSpaceAndSymbol(depth, '- ')}${node.key}: ${stringify(node.value, depth)}`;
        case 'added':
          return `${getSpaceAndSymbol(depth, '+ ')}${node.key}: ${stringify(node.value, depth)}`;
        case 'nested':
          return `${getSpaceAndSymbol(depth, '  ')}${node.key}: ${iter(node.children, depth + 1)}`;
        case 'unchanged':
          return `${getSpaceAndSymbol(depth, '  ')}${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return `${getSpaceAndSymbol(depth, '- ')}${node.key}: ${stringify(node.value1, depth)}\n${getSpaceAndSymbol(depth, '+ ')}${node.key}: ${stringify(node.value2, depth)}`;
        default:
          throw new Error(`Unknown order state: '${type}'!`);
      }
    });
    return ['{', ...result, `${getSpaceAndSymbol(depth - 1)}}`].join('\n');
  };
  return iter(tree, 1);
};
export default getStylish;
