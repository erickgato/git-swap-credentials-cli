import { ICommand } from "../../contracts/command";
import { ILogger } from "../../contracts/logger";
import { ICommandMediator } from "../../contracts/mediator";
import consoleLogger from "../../providers/console-logger";
import { IParams } from "./types";

export class GitSetLocalCredentialsCommand implements ICommand<IParams> {
  constructor(protected readonly logger: ILogger) {}

  public async execute(payload: IParams, commands: ICommandMediator) {}
}

export default new GitSetLocalCredentialsCommand(consoleLogger);
