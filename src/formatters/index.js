import getPlain from './getPlain.js';
import getStylish from './getStylish.js';

const formatter = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return getStylish(tree);
    case 'plain':
      return getPlain(tree);
    default:
      throw new Error(`Unknown order state '${formatName}'!`);
  }
};
export default formatter;
