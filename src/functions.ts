import * as fs from 'fs';
import chalk from 'chalk';
import {print} from './printer';


const userDir: string = 'funko/';


type FunkoType = 'Pop!' | 'Pop! Rides' | 'Vynil Soda' | 'Vynil Gold';
type FunkoGenre = 'Animacion' | 'Peliculas y TV' | 'Videojuegos' | 'Deportes' | 'Musica' | 'Anime';


export function createFunko(user: string, id: number, name: string, description: string, type: string, genre: string, franchise: string, number: number, exclusive: boolean, specialFeatures: string, marketValue: number): boolean {
  let exitStatus: boolean = false;
  if (id === undefined || name === undefined ||
      description === undefined || genre === undefined ||
      franchise === undefined || number === undefined ||
      exclusive === undefined || specialFeatures === undefined ||
      marketValue === undefined) {
    console.log(chalk.redBright(`Error. Wrong arguments.`));
  } else {
    if (!fs.existsSync(userDir + user)) {
      fs.mkdirSync(userDir + user, {recursive: true});
    }
    if (!fs.existsSync(userDir + user + '/' + name)) {
      // Validar el valor del argumento 'type' con los valores válidos de 'FunkoType'
      if (type === 'Pop!' || type === 'Pop! Rides' || type === 'Vynil Soda' || type === 'Vynil Gold' || 
      genre === 'Animacion' || genre === 'Peliculas y TV' || genre === 'Videojuegos' || genre === 'Deportes' || 
      genre === 'Musica' || genre === 'Anime' ) {
        fs.writeFileSync(userDir + user + '/' + name, JSON.stringify({user, id, name, description, type, genre, franchise, number, exclusive, specialFeatures, marketValue}, null, ' '));
        exitStatus = true;
      } else {
        console.log(chalk.redBright(`Error. Invalid value for 'type'. Valid values are 'Pop!', 'Pop! Rides', 'Vynil Soda' and 'Vynil Gold'.`));
      }
    } else {
      console.log(chalk.redBright(`Error. Funko already exists at ${user} collection.`));
    }
  }
  return exitStatus;
}


export function modifyFunko(user: string, id: number, name: string, newname: string,description: string, type: FunkoType, genre: FunkoGenre, franchise: string, number: number, exclusive: boolean, specialFeatures: string, marketValue: number): boolean {
  let exitStatus: boolean = false;
  if (fs.existsSync(userDir + user + '/' + name)) {
    deleteFunko(name, user);
    name = newname; // Actualizamos el nombre de la nota
    fs.writeFileSync(userDir + user + '/' + newname, JSON.stringify({user, id, name, description, type, genre, franchise, number, exclusive, specialFeatures, marketValue}, null, ' '));
    exitStatus = true;
  } else {
    console.log(chalk.redBright(`Error. ${name} not exists`));
  }
  return exitStatus;
}


export function deleteFunko(user: string, name: string): boolean {
  let exitStatus: boolean = false;
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + '/' + name)) {
      fs.rmSync(userDir + user + '/' + name);
      exitStatus = true;
    } else {
      console.log(chalk.redBright(`Error. ${name} doesnt exist.`));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
  return exitStatus;
}

export function listFunkos(user: string): void {
  const greenRange: number = 100;
  const yellowRange: number = 50;
  const orangeRange: number = 20;
  const redRange: number = 0;
  
  if (fs.existsSync(userDir + user)) {
    const files: string[] = fs.readdirSync(userDir + user);
    if (files.length === 0) {
      console.log(chalk.yellowBright(`No Funkos found in ${user} collection.`));
    } else {
      console.log(chalk.whiteBright('--- Funko List ---'));
      for (const file of files) {
        const content: string = fs.readFileSync(userDir + user + '/' + file, 'utf-8');
        const funko: {[key: string]: any} = JSON.parse(content);
        let color: (text: string) => string = chalk.redBright;
        if (funko.marketValue >= greenRange) {
          color = chalk.greenBright;
        } else if (funko.marketValue >= yellowRange) {
          color = chalk.yellowBright;
        } else if (funko.marketValue >= orangeRange) {
          color = chalk.hex('#FFA500');; //orange
        }
        console.log(`Name: ${chalk.blueBright(funko.name)}, Type: ${funko.type}, Genre: ${funko.genre}, Market Value: ${color(funko.marketValue.toString())}`);
      }
      console.log(chalk.whiteBright('--- End of List ---'));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
}

/**
 * Lee una nota determinada de un usuario
 * Si hay algun error en el proceso muestra por pantalla los
 * detalles del error.
 * @param user propietario de la nota
 * @param title titulo de la nota
*/
export function readFunko(name: string, user: string): boolean {
  let exitStatus: boolean = true;
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + '/' + name)) {
      if (getFunkoAtributte(name, user, 'name') !== undefined && getFunkoAtributte(name, user, 'id') !== undefined &&
          getFunkoAtributte(name, user, 'description') !== undefined && getFunkoAtributte(name, user, 'type') !== undefined && 
          getFunkoAtributte(name, user, 'genre') !== undefined && getFunkoAtributte(name, user, 'franchise') !== undefined && 
          getFunkoAtributte(name, user, 'number') !== undefined && getFunkoAtributte(name, user, 'exclusive') !== undefined && 
          getFunkoAtributte(name, user, 'specialFeatures') !== undefined && getFunkoAtributte(name, user, 'marketValue') !== undefined) {
        print(getFunkoAtributte(name, user, 'name') as string, getFunkoAtributte(name, user, 'id') as string);
        print(getFunkoAtributte(name, user, 'description') as string, getFunkoAtributte(name, user, 'type') as string);
        print(getFunkoAtributte(name, user, 'genre') as string, getFunkoAtributte(name, user, 'franchise') as string);
        print(getFunkoAtributte(name, user, 'number') as string, getFunkoAtributte(name, user, 'exclusive') as string);
        print(getFunkoAtributte(name, user, 'specialFeatures') as string, getFunkoAtributte(name, user, 'marketValue') as string);
      } else {
        console.log(chalk.redBright(`Error. Accesing ${name} atributes.`));
        exitStatus = false;
      }
      console.log();
    } else {
      console.log(chalk.redBright(`Error. ${name} does not exist.`));
      exitStatus = false;
    }
  } else {
    console.log(chalk.redBright(`Error. ${userDir + user} directory not found.`));
    exitStatus = false;
  }
  return exitStatus;
}


export function getFunkoAtributte(name: string, user: string, attr: string): string | undefined {
  let out: string = '';
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + '/' + name)) {
      switch (attr) {
        case 'name':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).name;
          break;
        case 'id':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).id;
          break;
        case 'description':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).description;
          break;
        case 'type':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).type;
          break;
        case 'genre':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).genre;
          break;
        case 'franchise':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).franchise;
          break;
        case 'number':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).number;
          break;
        case 'exclusive':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).exclusive;
          break;
        case 'specialFeatures':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).specialFeatures;
          break;
        case 'marketValue':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + name).toString()).marketValue;
          break;
      }
    } else {
      console.log(chalk.redBright(`Error. ${name} doesnt exist.`));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
  if (out !== '') {
    return out;
  } else {
    return undefined;
  }
}
  