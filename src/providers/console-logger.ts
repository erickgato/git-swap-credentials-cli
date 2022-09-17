import { ILogger } from "../contracts/logger";
import chalk from "chalk";

export class ConsoleLogger implements ILogger {
  info(message: string) {
    return console.log(chalk.green(message));
  }

  error(message: string) {
    return console.log(chalk.red(message));
  }

  warning(message: string) {
    return console.log(chalk.yellow(message));
  }
}

export default new ConsoleLogger() as ILogger;
