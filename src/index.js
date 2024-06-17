import path from "path";
import fs from "fs";
import parse from "./parse.js";
import { types } from "util";

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const getFileFormat = (filePath) => path.extname(filePath).slice(1);

const getData = (filePath) => parse(fs.readFileSync(filePath, 'utf-8'), getFileFormat(filePath));

const genDiff = (filePath1, filePath2) => {
const fullFilePath1 = getFullPath(filePath1);
const fullFilePath2 = getFullPath(filePath2);
const data1 = getData(fullFilePath1);
const data2 = getData(fullFilePath2);

};

export default genDiff;
