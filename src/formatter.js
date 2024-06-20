// import _ from 'lodash';

// const stringify = (data, replacer = ' ', spacesCount = 1) => {
//   const iter = (currentValue, depth) => {
//     if (typeof (currentValue) !== 'object' || currentValue === null) {
//       return `${currentValue}`;
//     }
//     const indentSize = depth * spacesCount;
//     const currentIndent = replacer.repeat(indentSize);
//     const bracketIndent = replacer.repeat(indentSize - spacesCount);
//     const lines = Object
//       .entries(currentValue)
//       .map(([key, value]) => `${currentIndent}${key}: ${iter(value, depth + 1)}`);
//     return [
//       '{',
//       ...lines,
//       `${bracketIndent}}`,
//     ].join('\n');
//   };
//   return iter(data, 1);

// };
const formatter = (tree) => {
  const result = tree.map((node) => {
    const { type } = node;
    switch (type) {
      case 'deleted':
        return `  - ${node.key}: ${node.value}`;
      case 'added':
        return `  + ${node.key}: ${node.value}`;
      case 'unchanged':
        return `    ${node.key}: ${node.value}`;
      case 'changed':
        return `  - ${node.key}: ${node.value1}\n  + ${node.key}: ${node.value2}`;
      default:
        throw new Error(`Unknown order state: '${type}'!`);
    }
  });
  return ['{', ...result, '}'].join('\n');
};
export default formatter;
