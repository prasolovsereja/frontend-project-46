import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
test.each([
  ['json', 'stylish', readFixture('expected_stylish.txt')],
  ['yaml', 'stylish', readFixture('expected_stylish.txt')],
  ['json', 'plain', readFixture('expected_plain.txt')],
  ['yaml', 'plain', readFixture('expected_plain.txt')],
  ['json', 'json', readFixture('expected_json.txt')],
  ['yaml', 'json', readFixture('expected_json.txt')],
])('all test genDiff', (extension, format, expected) => {
  expect(genDiff(getFixturePath(`file1.${extension}`), getFixturePath(`file2.${extension}`), format)).toEqual(expected);
});
