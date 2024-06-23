import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
describe('stylish', () => {
  test('genDiff stylish', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFixture('expected_stylish.txt'));
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(readFixture('expected_stylish.txt'));
  });
});
describe('plain', () => {
  test('genDiff plain', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFixture('expected_plain.txt'));
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(readFixture('expected_plain.txt'));
  });
});
describe('json', () => {
  test('genDiff json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(readFixture('expected_json.txt'));
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toEqual(readFixture('expected_json.txt'));
  });
});
