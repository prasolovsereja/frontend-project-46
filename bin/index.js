#!/usr/bin/env node
import { Command } from "commander";
import genDiff from "../index.js";

const program = new Command();
// console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'))
program
  .name('genDiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2)
    console.log(result);
    console.log('typeof result = ', typeof result);
  });
program.parse();