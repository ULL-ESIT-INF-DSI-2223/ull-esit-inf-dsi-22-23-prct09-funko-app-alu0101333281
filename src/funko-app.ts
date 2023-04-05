import * as yargs from 'yargs';
import chalk from 'chalk';
import * as fu from '../src/functions';

const funkoName: string = 'Funko name';
const userName: string = 'User name';


/**
 * Funcion para implementar el comando add.
 * añade un funko 
 * @param user propietario del funko
 * @param name nombre del funko a añadir
 * @param id  identificador del funko
 * @param description description del funko
 * @param type tipo del funko
 * @param genre genero del funko
 * @param franchise franquicia en la que pertenece el funko
 * @param number numero del funko
 * @param exclusive si el funko es exclusivo 
 * @param specialFeatures si presenta caracteristicas especiales 
 * @param marketValue valor en el mercado 
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
 * @param user propietario del funko
 * @param name nombre del funko a modificar
 * @param newName nombre del funko modificado
 * @param id  identificador del funko
 * @param description description del funko
 * @param type tipo del funko
 * @param genre genero del funko
 * @param franchise franquicia en la que pertenece el funko
 * @param number numero del funko
 * @param exclusive si el funko es exclusivo 
 * @param specialFeatures si presenta caracteristicas especiales 
 * @param marketValue valor en el mercado 
 */
yargs.command({
  command: 'modify',
  describe: 'Modify a funko',
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
      newname: {
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
      if (fu.modifyFunko(argv.user, argv.id, argv.name, argv.newname,argv.description, argv.type, argv.genre, argv.franchise, argv.number, argv.exclusive, argv.specialFeatures, argv.marketValue)) {
        console.log(chalk.greenBright(`${argv.title} modified succesfully. Now: ${argv.newtitle}`));
      }
    }
  },
});



/**
 * Funcion para implementar el comando read.
 * lee un funko existente
 * @param user propietario del funko
 * @param name nombre del funko  
 */
yargs.command({
  command: 'read',
  describe: 'Read a funko',
  builder: {
    name: {
      describe: userName,
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: funkoName,
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.name === 'string' && typeof argv.user === 'string') {
      fu.readFunko(argv.name, argv.user);
    }
  },
});

/**
 * Funcion para implementar el comando delete.
 * Borra un funko determinado de un usuario
 * @param user propietariol funko
 * @param name nombre del funko
 */
yargs.command({
  command: 'delete',
  describe: 'Delete a funko',
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
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      if (fu.deleteFunko(argv.title, argv.user)) {
        console.log(chalk.yellowBright(`${argv.title} deleted suscessfully`));
      }
    }
  },
});

/**
 * Funcion para implementar el comando list.
 * Lista los funkos de un usuario
 * @param user usuario selecionado para listar sus funko
 */
yargs.command({
  command: 'list',
  describe: 'List funko',
  builder: {
    user: {
      describe: 'Users funko list',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
        fu.listFunkos(argv.user);
    }
  },
});

/**
 * Funcion para interpretar los comandos
 */
yargs.parse();
