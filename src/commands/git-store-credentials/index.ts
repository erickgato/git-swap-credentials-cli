import { ICommand } from "../../contracts/command";
import { ILogger } from "../../contracts/logger";
import { ICommandMediator } from "../../contracts/mediator";
import consoleLogger from "../../providers/console-logger";

export class GitStoreCredentialsCommand implements ICommand {
  constructor(protected readonly logger: ILogger) {}

  public async execute(_: any, commands: ICommandMediator) {}
}

export default new GitStoreCredentialsCommand(consoleLogger);
