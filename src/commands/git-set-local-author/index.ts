import { execSync } from "child_process";
import { ICommand } from "../../contracts/command";
import { ILogger } from "../../contracts/logger";
import { ICommandMediator } from "../../contracts/mediator";
import consoleLogger from "../../providers/console-logger";
import { IParams } from "./types";

export class GitSetLocalAuthor implements ICommand<IParams> {
  constructor(protected readonly logger: ILogger) {}

  public async execute(payload: IParams, commands: ICommandMediator) {
    execSync(`git config user.name ${payload.username}`);
    execSync(`git config user.email ${payload.email}`);
  }
}

export default new GitSetLocalAuthor(consoleLogger);
