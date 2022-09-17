import { execSync } from "child_process";
import { ICommand } from "../../contracts/command";
import { ILogger } from "../../contracts/logger";
import consoleLogger from "../../providers/console-logger";

export class GitStoreCredentialsCommand implements ICommand {
  constructor(protected readonly logger: ILogger) {}

  public async execute() {
    execSync("git config credential.helper store");
  }
}

export default new GitStoreCredentialsCommand(consoleLogger);
