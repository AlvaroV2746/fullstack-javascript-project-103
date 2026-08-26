import { test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../index'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResult = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8').trim().replace(/\r\n/g, '\n');
const expectedResult2 = fs.readFileSync(getFixturePath('expected2.txt'), 'utf-8').trim().replace(/\r\n/g, '\n');


// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff with JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2)).toEqual(expectedResult);
});

test('genDiff with YAML files (.yml)', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(gendiff(file1, file2)).toEqual(expectedResult);
});

test('genDiff with JSON2 files', () => {
  const file1 = getFixturePath('file3.json');
  const file2 = getFixturePath('file4.json');
  expect(gendiff(file1, file2)).toEqual(expectedResult2);
});