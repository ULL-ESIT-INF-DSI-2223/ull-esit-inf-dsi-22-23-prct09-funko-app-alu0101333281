import * as yargs from 'yargs';
import chalk from 'chalk';
import * as fu from '../src/functions';

const funkoName: string = 'Funko name';
const userName: string = 'User name';


/**
 * Funcion para implementar el comando add.
 * Añade una nota
 * @param user propietario de la nota
 * @param title titulo de la nota
 * @param body cuerpo de la nota
 * @param color de la nota
 */
yargs.command({
  command: 'add',
  describe: 'Add a new funko',
  builder: {
    user: {
      describe: userName,
      demandOption: true,
      type: 'string',
    },
    name: {
      describe: funkoName,
      demandOption: true,
      type: 'string',
    },
    id: {
      describe: 'Funko id',
      demandOption: true,
      type: 'number',
    },
    description: {
      describe: 'Funko description',
      demandOption: true,
      type: 'string',
    },
    type: {
        describe: 'Funko type',
        demandOption: true,
        type: 'string',
        choices: ['Pop!', 'Pop! Rides', 'Vynil Soda', 'Vynil Gold'],
    },
    genre: {
        describe: 'Funko genre',
        demandOption: true,
        type: 'string',
        choices: ['Animacion', 'Peliculas y TV', 'Videojuegos', 'Deportes', 'Musica', 'Anime'],
    },
    franchise: {
        describe: 'Funko franchise',
        demandOption: true,
        type: 'string',
    },
    number: {
        describe: 'Funko number',
        demandOption: true,
        type: 'number',
      },
    exclusive: {
        describe: 'Funko exclusive',
        demandOption: true,
        type: 'boolean',
    },
    specialFeatures: {
        describe: 'Funko specialFeatures',
        demandOption: true,
        type: 'string',
    },
    marketValue: {
        describe: 'Funko marketValue',
        demandOption: true,
        type: 'number',
    }
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.id === 'number' &&
        typeof argv.name === 'string' && typeof argv.description === 'string' &&
        typeof argv.type === 'string' && typeof argv.genre === 'string' && 
        typeof argv.franchise === 'string' && typeof argv.number === 'number' && 
        typeof argv.exclusive === 'boolean' && typeof argv.specialFeatures === 'string' && typeof argv.marketValue === 'number') {
      if (fu.createFunko(argv.user, argv.id, argv.name, argv.description, argv.type, argv.genre, argv.franchise, argv.number, argv.exclusive, argv.specialFeatures, argv.marketValue,)) {
        console.log(chalk.greenBright(`${argv.name} created succesfully`));
      }
    }
  },
});

/**
 * Funcion para implementar el comando modify.
 * Modifica una nota existente
 * @param user propietario de la nota
 * @param title titulo de la nota a modificar
 * @param newtitle nuevo titulo de la nota
 * @param body nuevo cuerpo de la nota
 * @param color nuevo color de la nota
 */
yargs.command({
  command: 'modify',
  describe: 'Modify a note',
  builder: {
    user: {
      describe: userName,
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: noteTittle,
      demandOption: true,
      type: 'string',
    },
    newtitle: {
      describe: noteTittle,
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'New note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'New note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string' &&
        typeof argv.newtitle === 'string') {
      if (fu.modifyFunko(argv.title, argv.newtitle, argv.body, argv.user, argv.color)) {
        console.log(chalk.greenBright(`${argv.title} modified succesfully. Now: ${argv.newtitle}`));
      }
    }
  },
});

/**
 * Funcion para implementar el comando read.
 * Lee una nota determinada de un usuario
 * @param user propietario de la nota
 * @param title titulo de la nota
 */
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: userName,
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: noteTittle,
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      fu.readNote(argv.title, argv.user);
    }
  },
});

/**
 * Funcion para implementar el comando delete.
 * Borra una nota determinada de un usuario
 * @param user propietario de la nota
 * @param title titulo de la nota
 */
yargs.command({
  command: 'delete',
  describe: 'Delete a note',
  builder: {
    user: {
      describe: userName,
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: noteTittle,
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      if (fu.deleteNote(argv.title, argv.user)) {
        console.log(chalk.yellowBright(`${argv.title} deleted suscessfully`));
      }
    }
  },
});

/**
 * Funcion para implementar el comando list.
 * Lista las notas de un usuario
 * @param user usuario selecionado para listar sus notas
 * @param ot OnlyTitles flag para determinar si se imprimen solo los titulos o no
 *           Si se expresa --ot entonces solo se mostraran los titulos, en otro
 *           caso, se mostraran las notas completas.
 */
yargs.command({
  command: 'list',
  describe: 'List user notes',
  builder: {
    user: {
      describe: 'Users note list',
      demandOption: true,
      type: 'string',
    },
    ot: {
      describe: 'Only titles',
      demandOption: false,
      boolean: true,
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      if (argv.ot) {
        fu.listNoteTitles(argv.user);
      } else {
        fu.listNotes(argv.user);
      }
    }
  },
});

/**
 * Funcion para interpretar los comandos
 */
yargs.parse();
