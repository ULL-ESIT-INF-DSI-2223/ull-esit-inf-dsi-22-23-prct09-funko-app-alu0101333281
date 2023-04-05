# Informe Práctica 9. Aplicacion de registro de Funko Pops
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101333281/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101333281/actions/workflows/node.js.yml)
[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101333281/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101333281/actions/workflows/coveralls.yml)

## Autor
  - Cristopher Alexandro Medina Peschiutta
    - alu0101333281

## Introducción

En esta primera práctica grupal de la asignatura se ha llevado a cabo un diseño orientado a objetos del modelo de datos de un sistema de información que permita almacenar registros de Funkos.

## Tareas Previas

- Preparar el entorno virtual para que contenga:

  1. [TypeDoc](https://typedoc.org)
  2. [Mocha](https://mochajs.org)
  3. [Chai](https://www.chaijs.com)
  4. Prettier
  5. eslint
  6. [Instanbull](https://istanbul.js.org/)
  7. [Coveralls](https://coveralls.io/)
  8. [Prompt-sync](https://www.npmjs.com/package/prompt-sync)
     - `npm i prompt-sync`
     - `npm i --save-dev @types/prompt-sync`
  9. [chalk](https://www.npmjs.com/package/chalk)
  10. [yargs](https://www.npmjs.com/package/@types/yargs)
- Repasar las ["Markdown Basics"](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links)
- Tener a mano los [apuntes](https://ull-esit-inf-dsi-2223.github.io/typescript-theory/)
- Tener a mano el [guion de la practica](https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/)

## Proyecto

### fichero functions.ts

```ts
import * as fs from "fs";
import chalk from "chalk";
import { print } from "./printer.js";

export const userDir: string = "funko/";

/**
 * Creates a new Funko in the user's collection.
 * @param {string} user - The name of the user whose collection the Funko belongs to.
 * @param {number} id - The unique identifier of the Funko.
 * @param {string} name - The name of the Funko.
 * @param {string} description - A description of the Funko.
 * @param {string} type - The type of the Funko.
 * @param {string} genre - The genre of the Funko.
 * @param {string} franchise - The franchise that the Funko belongs to.
 * @param {number} number - The number of the Funko in the series.
 * @param {boolean} exclusive - A flag indicating if the Funko is exclusive.
 * @param {string} specialFeatures - A description of any special features of the Funko.
 * @param {number} marketValue - The market value of the Funko.
 * @returns {boolean} - A boolean indicating if the Funko was successfully created.
 */
export function createFunko(
  user: string,
  id: number,
  name: string,
  description: string,
  type: string,
  genre: string,
  franchise: string,
  number: number,
  exclusive: boolean,
  specialFeatures: string,
  marketValue: number
): boolean {
  let exitStatus: boolean = false;
  if (
    id === undefined ||
    name === undefined ||
    description === undefined ||
    genre === undefined ||
    franchise === undefined ||
    number === undefined ||
    exclusive === undefined ||
    specialFeatures === undefined ||
    marketValue === undefined
  ) {
    console.log(chalk.redBright(`Error. Wrong arguments.`));
  } else {
    if (!fs.existsSync(userDir + user)) {
      fs.mkdirSync(userDir + user, { recursive: true });
    }
    if (!fs.existsSync(userDir + user + "/" + name)) {
      // Validar el valor del argumento 'type' con los valores válidos de 'FunkoType'
      if (
        type === "Pop!" ||
        type === "Pop! Rides" ||
        type === "Vynil Soda" ||
        type === "Vynil Gold" ||
        genre === "Animacion" ||
        genre === "Peliculas y TV" ||
        genre === "Videojuegos" ||
        genre === "Deportes" ||
        genre === "Musica" ||
        genre === "Anime"
      ) {
        fs.writeFileSync(
          userDir + user + "/" + name,
          JSON.stringify(
            {
              user,
              id,
              name,
              description,
              type,
              genre,
              franchise,
              number,
              exclusive,
              specialFeatures,
              marketValue,
            },
            null,
            " "
          )
        );
        exitStatus = true;
      } else {
        console.log(
          chalk.redBright(
            `Error. Invalid value for 'type'. Valid values are 'Pop!', 'Pop! Rides', 'Vynil Soda' and 'Vynil Gold'.`
          )
        );
      }
    } else {
      console.log(
        chalk.redBright(`Error. Fun ko already exists at ${user} collection.`)
      );
    }
  }
  return exitStatus;
}

/**
 * Modifies an existing Funko in the user's collection.
 *
 * @param user - The username of the user's collection.
 * @param id - The id of the Funko.
 * @param name - The name of the Funko to modify.
 * @param newname - The new name for the Funko.
 * @param description - The new description for the Funko.
 * @param type - The new type for the Funko.
 * @param genre - The new genre for the Funko.
 * @param franchise - The new franchise for the Funko.
 * @param number - The new number for the Funko.
 * @param exclusive - The new exclusive status for the Funko.
 * @param specialFeatures - The new special features for the Funko.
 * @param marketValue - The new market value for the Funko.
 * @returns A boolean indicating whether the Funko was successfully modified.
 */
export function modifyFunko(
  user: string,
  id: number,
  name: string,
  newname: string,
  description: string,
  type: string,
  genre: string,
  franchise: string,
  number: number,
  exclusive: boolean,
  specialFeatures: string,
  marketValue: number
): boolean {
  let exitStatus: boolean = false;
  if (fs.existsSync(userDir + user + "/" + name)) {
    deleteFunko(name, user);
    name = newname; // Actualizamos el nombre de la nota
    fs.writeFileSync(
      userDir + user + "/" + newname,
      JSON.stringify(
        {
          user,
          id,
          name,
          description,
          type,
          genre,
          franchise,
          number,
          exclusive,
          specialFeatures,
          marketValue,
        },
        null,
        " "
      )
    );
    exitStatus = true;
  } else {
    console.log(chalk.redBright(`Error. ${name} not exists`));
  }
  return exitStatus;
}

/**

Deletes a Funko from the specified user's collection.
@param user - The name of the user.
@param name - The name of the Funko to delete.
@returns A boolean indicating whether the operation was successful or not.
*/
export function deleteFunko(user: string, name: string): boolean {
  let exitStatus: boolean = false;
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + "/" + name)) {
      fs.rmSync(userDir + user + "/" + name);
      exitStatus = true;
    } else {
      console.log(chalk.redBright(`Error. ${name} doesnt exist.`));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
  return exitStatus;
}

/**

Lists all Funkos in a user's collection, displaying their name, type, genre, and market value color-coded based on their value.
@param user The name of the user whose collection is being listed.
*/
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
      console.log(chalk.whiteBright("--- Funko List ---"));
      for (const file of files) {
        const content: string = fs.readFileSync(
          userDir + user + "/" + file,
          "utf-8"
        );
        const funko: { [key: string]: any } = JSON.parse(content);
        let color: (text: string) => string = chalk.redBright;
        if (funko.marketValue >= greenRange) {
          color = chalk.greenBright;
        } else if (funko.marketValue >= yellowRange) {
          color = chalk.yellowBright;
        } else if (funko.marketValue >= orangeRange) {
          color = chalk.hex("#FFA500"); //orange
        }
        console.log(
          `Name: ${chalk.blueBright(funko.name)}, Type: ${funko.type}, Genre: ${
            funko.genre
          }, Market Value: ${color(funko.marketValue.toString())}`
        );
      }
      console.log(chalk.whiteBright("--- End of List ---"));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
}

/**

Reads the attributes of a Funko figure and prints them to the console.
@param name - The name of the Funko figure to be read.
@param user - The name of the user who owns the Funko figure.
@returns True if the Funko figure is successfully read, false otherwise.
*/
export function readFunko(name: string, user: string): boolean {
  let exitStatus: boolean = true;
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + "/" + name)) {
      if (
        getFunkoAtributte(name, user, "name") !== undefined &&
        getFunkoAtributte(name, user, "id") !== undefined &&
        getFunkoAtributte(name, user, "description") !== undefined &&
        getFunkoAtributte(name, user, "type") !== undefined &&
        getFunkoAtributte(name, user, "genre") !== undefined &&
        getFunkoAtributte(name, user, "franchise") !== undefined &&
        getFunkoAtributte(name, user, "number") !== undefined &&
        getFunkoAtributte(name, user, "exclusive") !== undefined &&
        getFunkoAtributte(name, user, "specialFeatures") !== undefined &&
        getFunkoAtributte(name, user, "marketValue") !== undefined
      ) {
        print(
          getFunkoAtributte(name, user, "name") as string,
          getFunkoAtributte(name, user, "id") as string
        );
        print(
          getFunkoAtributte(name, user, "description") as string,
          getFunkoAtributte(name, user, "type") as string
        );
        print(
          getFunkoAtributte(name, user, "genre") as string,
          getFunkoAtributte(name, user, "franchise") as string
        );
        print(
          getFunkoAtributte(name, user, "number") as string,
          getFunkoAtributte(name, user, "exclusive") as string
        );
        print(
          getFunkoAtributte(name, user, "specialFeatures") as string,
          getFunkoAtributte(name, user, "marketValue") as string
        );
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
    console.log(
      chalk.redBright(`Error. ${userDir + user} directory not found.`)
    );
    exitStatus = false;
  }
  return exitStatus;
}

/**

This function retrieves a specific attribute of a Funko Pop! figure by name and user.
@param name - The name of the Funko Pop! figure to retrieve the attribute from.
@param user - The name of the user who owns the Funko Pop! figure.
@param attr - The name of the attribute to retrieve.
@returns The value of the specified attribute as a string or undefined if the attribute is not found.
*/
export function getFunkoAtributte(
  name: string,
  user: string,
  attr: string
): string | undefined {
  let out: string = "";
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + "/" + name)) {
      switch (attr) {
        case "name":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).name;
          break;
        case "id":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).id;
          break;
        case "description":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).description;
          break;
        case "type":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).type;
          break;
        case "genre":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).genre;
          break;
        case "franchise":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).franchise;
          break;
        case "number":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).number;
          break;
        case "exclusive":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).exclusive;
          break;
        case "specialFeatures":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).specialFeatures;
          break;
        case "marketValue":
          out = JSON.parse(
            fs.readFileSync(userDir + user + "/" + name).toString()
          ).marketValue;
          break;
      }
    } else {
      console.log(chalk.redBright(`Error. ${name} doesnt exist.`));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
  if (out !== "") {
    return out;
  } else {
    return undefined;
  }
}
```

El código presenta una serie de funciones para manejar una colección de figuras Funko. A continuación, se describe brevemente cada una de las funciones:

createFunko: Crea una nueva figura Funko en la colección de un usuario. Recibe una serie de argumentos que describen la figura, como su nombre, descripción, tipo, género, franquicia, etc. Si la figura ya existe en la colección del usuario, no la crea y devuelve false. Si se proporciona algún argumento no válido, devuelve un mensaje de error y también false.

modifyFunko: Modifica una figura Funko existente en la colección de un usuario. Recibe una serie de argumentos que describen la figura, como su nombre, descripción, tipo, género, franquicia, etc. Si la figura no existe en la colección del usuario, devuelve un mensaje de error y false. Si se proporciona algún argumento no válido, devuelve un mensaje de error y también false.

deleteFunko: Borra una figura Funko de la colección de un usuario. Recibe como argumentos el nombre de usuario y el nombre de la figura a borrar. Si la figura no existe en la colección del usuario, devuelve un mensaje de error y false.

listFunkos: Lista todas las figuras Funko de la colección de un usuario. Recibe como argumento el nombre de usuario.

El código también importa algunos módulos necesarios, como fs para trabajar con archivos del sistema, chalk para imprimir mensajes de error en colores, y print desde un archivo local printer.js que probablemente se utilice para imprimir los resultados de otras funciones. Por último, también define una constante userDir que indica el directorio en el que se almacenarán las colecciones de los usuarios (en este caso, en un subdirectorio funko/).

### fichero funko-app.ts

```ts
import * as yargs from "yargs";
import chalk from "chalk";
import * as fu from "../src/functions";

const funkoName: string = "Funko name";
const userName: string = "User name";

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
  command: "add",
  describe: "Add a new funko",
  builder: {
    user: {
      describe: userName,
      demandOption: true,
      type: "string",
    },
    name: {
      describe: funkoName,
      demandOption: true,
      type: "string",
    },
    id: {
      describe: "Funko id",
      demandOption: true,
      type: "number",
    },
    description: {
      describe: "Funko description",
      demandOption: true,
      type: "string",
    },
    type: {
      describe: "Funko type",
      demandOption: true,
      type: "string",
      choices: ["Pop!", "Pop! Rides", "Vynil Soda", "Vynil Gold"],
    },
    genre: {
      describe: "Funko genre",
      demandOption: true,
      type: "string",
      choices: [
        "Animacion",
        "Peliculas y TV",
        "Videojuegos",
        "Deportes",
        "Musica",
        "Anime",
      ],
    },
    franchise: {
      describe: "Funko franchise",
      demandOption: true,
      type: "string",
    },
    number: {
      describe: "Funko number",
      demandOption: true,
      type: "number",
    },
    exclusive: {
      describe: "Funko exclusive",
      demandOption: true,
      type: "boolean",
    },
    specialFeatures: {
      describe: "Funko specialFeatures",
      demandOption: true,
      type: "string",
    },
    marketValue: {
      describe: "Funko marketValue",
      demandOption: true,
      type: "number",
    },
  },
  handler(argv) {
    if (
      typeof argv.user === "string" &&
      typeof argv.id === "number" &&
      typeof argv.name === "string" &&
      typeof argv.description === "string" &&
      typeof argv.type === "string" &&
      typeof argv.genre === "string" &&
      typeof argv.franchise === "string" &&
      typeof argv.number === "number" &&
      typeof argv.exclusive === "boolean" &&
      typeof argv.specialFeatures === "string" &&
      typeof argv.marketValue === "number"
    ) {
      if (
        fu.createFunko(
          argv.user,
          argv.id,
          argv.name,
          argv.description,
          argv.type,
          argv.genre,
          argv.franchise,
          argv.number,
          argv.exclusive,
          argv.specialFeatures,
          argv.marketValue
        )
      ) {
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
  command: "modify",
  describe: "Modify a funko",
  builder: {
    user: {
      describe: userName,
      demandOption: true,
      type: "string",
    },
    name: {
      describe: funkoName,
      demandOption: true,
      type: "string",
    },
    newname: {
      describe: funkoName,
      demandOption: true,
      type: "string",
    },
    id: {
      describe: "Funko id",
      demandOption: true,
      type: "number",
    },
    description: {
      describe: "Funko description",
      demandOption: true,
      type: "string",
    },
    type: {
      describe: "Funko type",
      demandOption: true,
      type: "string",
      choices: ["Pop!", "Pop! Rides", "Vynil Soda", "Vynil Gold"],
    },
    genre: {
      describe: "Funko genre",
      demandOption: true,
      type: "string",
      choices: [
        "Animacion",
        "Peliculas y TV",
        "Videojuegos",
        "Deportes",
        "Musica",
        "Anime",
      ],
    },
    franchise: {
      describe: "Funko franchise",
      demandOption: true,
      type: "string",
    },
    number: {
      describe: "Funko number",
      demandOption: true,
      type: "number",
    },
    exclusive: {
      describe: "Funko exclusive",
      demandOption: true,
      type: "boolean",
    },
    specialFeatures: {
      describe: "Funko specialFeatures",
      demandOption: true,
      type: "string",
    },
    marketValue: {
      describe: "Funko marketValue",
      demandOption: true,
      type: "number",
    },
  },
  handler(argv) {
    if (
      typeof argv.user === "string" &&
      typeof argv.id === "number" &&
      typeof argv.name === "string" &&
      typeof argv.description === "string" &&
      typeof argv.type === "string" &&
      typeof argv.genre === "string" &&
      typeof argv.franchise === "string" &&
      typeof argv.number === "number" &&
      typeof argv.exclusive === "boolean" &&
      typeof argv.specialFeatures === "string" &&
      typeof argv.marketValue === "number"
    ) {
      if (
        fu.modifyFunko(
          argv.user,
          argv.id,
          argv.name,
          argv.newname,
          argv.description,
          argv.type,
          argv.genre,
          argv.franchise,
          argv.number,
          argv.exclusive,
          argv.specialFeatures,
          argv.marketValue
        )
      ) {
        console.log(
          chalk.greenBright(
            `${argv.title} modified succesfully. Now: ${argv.newtitle}`
          )
        );
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
  command: "read",
  describe: "Read a funko",
  builder: {
    name: {
      describe: userName,
      demandOption: true,
      type: "string",
    },
    user: {
      describe: funkoName,
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (typeof argv.name === "string" && typeof argv.user === "string") {
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
  command: "delete",
  describe: "Delete a funko",
  builder: {
    user: {
      describe: userName,
      demandOption: true,
      type: "string",
    },
    name: {
      describe: funkoName,
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (typeof argv.title === "string" && typeof argv.user === "string") {
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
  command: "list",
  describe: "List funko",
  builder: {
    user: {
      describe: "Users funko list",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (typeof argv.user === "string") {
      fu.listFunkos(argv.user);
    }
  },
});

/**
 * Funcion para interpretar los comandos
 */
yargs.parse();
```

El código utiliza el paquete "yargs" para crear comandos de línea de comandos. En resumen, el programa tiene dos comandos: "add" y "modify". Ambos comandos toman varios parámetros que se utilizan para crear o modificar un objeto "Funko" utilizando funciones definidas en un archivo separado llamado "functions.ts".

El programa también utiliza dos paquetes adicionales: "chalk" para imprimir texto en diferentes colores y "fu" para importar las funciones de "functions.ts".

### fichero printer.ts
```ts
import chalk from "chalk";

/**
 * Funcion que imprime una cadena de un color determinado
 * @param s cadena a imprimir por pantalla
 * @param c color deseado para imprimir s
 */
export function print(s: string, c?: string) {
  switch (c) {
    case "blue":
      console.log(chalk.blueBright(s));
      break;
    case "red":
      console.log(chalk.redBright(s));
      break;
    case "green":
      console.log(chalk.greenBright(s));
      break;
    case "white":
      console.log(chalk.whiteBright(s));
      break;
    case "yellow":
      console.log(chalk.yellowBright(s));
      break;
    default:
      console.log(chalk.whiteBright(s));
      break;
  }
}
```

Este código es una función que utiliza la biblioteca Chalk para imprimir una cadena en un color determinado en la consola. La biblioteca Chalk permite cambiar el color y el estilo de texto en la consola en Node.js y en navegadores modernos.

La función "print" toma dos parámetros: la cadena a imprimir por pantalla y un color opcional para imprimir la cadena en ese color. Si se proporciona un color válido, se utiliza el método correspondiente de la biblioteca Chalk para imprimir la cadena en ese color. Si no se proporciona ningún color, la cadena se imprime en blanco brillante por defecto.

Los colores disponibles para imprimir la cadena son azul, rojo, verde, blanco y amarillo. Si se proporciona un color no válido, la cadena se imprime en blanco brillante por defecto.

## Conclusión

Mediante el uso de los modulos chalk y yargs hemos podido realizar un codigo mas organizado y visual a la hora de generar las salidas y poder asi hacer enfasis en ciertas ocasiones los que les da una gran usabilidad. 

## Referencias

1. [Your First TypeScript Project Part 3 | by Jonathan Reeves | Medium](https://programmingwithjon.medium.com/your-first-typescript-project-part-3-8c84a6145d7e)
2. [Essential TypeScript: From Beginner to Pro](https://link.springer.com/book/10.1007/978-1-4842-4979-6)
3. https://www.npmjs.com/package/chalk
4. https://openai.com/blog/chatgpt 