#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { Command } from "commander";
import { log } from "console";
import _ from "lodash";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .option("-f, --format <type>", "output format")
  .action((filepath1, filepath2, options) => {
    const absPath1 = path.resolve(process.cwd(), filepath1);
    const absPath2 = path.resolve(process.cwd(), filepath2);
    const content1 = JSON.parse(fs.readFileSync(absPath1, "utf-8"));
    const content2 = JSON.parse(fs.readFileSync(absPath2, "utf-8"));
    const keys1 = Object.keys(content1);
    const keys2 = Object.keys(content2);
    const keysMerged = _.union(keys1, keys2).sort();

    const compare = keysMerged.map((key) => {
      const value1 = content1[key];
      const value2 = content2[key];

      const inFirst = keys1.includes(key);
      const inSecond = keys2.includes(key);
      if (inFirst && inSecond) {
        if (value1 === value2) {
          return `  ${key}: ${value1}`;
        }
        return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
      }

      if (inFirst) {

        return `  - ${key}: ${value1}`;
      }

      return `  + ${key}: ${value2}`;
    });

    return `{\n${compare.join('\n')}\n}`;

  });


program.parse(process.argv);

//   .option('-g, --gritar', 'Imprime el saludo en mayúsculas');

//   const options = program.opts();

//   if (options.nombre) {
//   let saludo = `Hola, ${options.nombre}. ¡Qué bueno verte!`;

//   if (options.gritar) {
//     saludo = saludo.toUpperCase() + ' 📢';
//   }

//   console.log(saludo);
// } else {
//   console.log('No me pasaste ningún nombre. Intenta usar --help');
// }
