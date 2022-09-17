import { ICommand } from "../../contracts/command";
import { ILogger } from "../../contracts/logger";
import { ICommandMediator } from "../../contracts/mediator";
import consoleLogger from "../../providers/console-logger";
import { IParams } from "./types";

export class GitSetLocalAuthor implements ICommand<IParams> {
  constructor(protected readonly logger: ILogger) {}

  public async execute(payload: IParams, commands: ICommandMediator) {
    console.log(payload, commands);
    console.log(process.cwd());
    console.log(__dirname);
  }
}

export default new GitSetLocalAuthor(consoleLogger);
