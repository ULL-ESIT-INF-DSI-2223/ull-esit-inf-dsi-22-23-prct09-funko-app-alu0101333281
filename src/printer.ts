import chalk from 'chalk';

/**
 * Funcion que imprime una cadena de un color determinado
 * @param s cadena a imprimir por pantalla
 * @param c color deseado para imprimir s
 */
export function print(s: string, c?: string) {
  switch (c) {
    case 'blue':
      console.log(chalk.blueBright(s));
      break;
    case 'red':
      console.log(chalk.redBright(s));
      break;
    case 'green':
      console.log(chalk.greenBright(s));
      break;
    case 'white':
      console.log(chalk.whiteBright(s));
      break;
    case 'yellow':
      console.log(chalk.yellowBright(s));
      break;
    default:
      console.log(chalk.whiteBright(s));
      break;
  }
}