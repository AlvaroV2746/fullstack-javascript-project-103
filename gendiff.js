#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { Command } from 'commander';

const program = new Command();


program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const absPath1 = path.resolve(process.cwd(), filepath1);
    const absPath2 = path.resolve(process.cwd(), filepath2);
    const content1 = fs.readFileSync(absPath1, 'utf-8');
    const content2 = fs.readFileSync(absPath2, 'utf-8');

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