import _ from 'lodash';

const treeBuilder = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: treeBuilder(data1[key], data2[key]) };
    }
    if (!_.has(data1, key)) return { key, value: data2[key], type: 'added' };
    if (!_.has(data2, key)) return { key, value: data1[key], type: 'deleted' };
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        value1: data1[key],
        value2: data2[key],
        type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });
};
export default treeBuilder;
