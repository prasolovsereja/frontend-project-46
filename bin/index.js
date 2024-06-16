#!/usr/bin/env node
import { Command } from "commander";
import genDiff from "../index.js";

const program = new Command();

program
  .name('genDiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format');

program.parse();