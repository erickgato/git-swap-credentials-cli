import { execSync } from "child_process";
import { ICommand } from "../../contracts/command";
import { ILogger } from "../../contracts/logger";
import consoleLogger from "../../providers/console-logger";
import { IParams } from "./types";

export class GitSetLocalCredentialsCommand implements ICommand<IParams> {
  constructor(protected readonly logger: ILogger) {}

  public async execute(payload: IParams) {
    execSync(`git config credential.username ${payload.username}`);
    execSync(`git config credential.email ${payload.email}`);
  }
}

export default new GitSetLocalCredentialsCommand(consoleLogger);
