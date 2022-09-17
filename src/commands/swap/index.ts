import { Command } from "../../constants/commands";
import { ICommand } from "../../contracts/command";
import { ILogger } from "../../contracts/logger";
import { ICommandMediator } from "../../contracts/mediator";
import { IProfileRepository } from "../../contracts/profile-repository";
import consoleLogger from "../../providers/console-logger";
import repository from "../../repositories/local-profile.repository";
import { IParams } from "./types";

export class SwapCommand implements ICommand<IParams> {
  constructor(
    protected readonly profileRepository: IProfileRepository,
    protected readonly logger: ILogger
  ) {}

  public async execute(payload: IParams, commands: ICommandMediator) {
    const profile = await this.profileRepository.findByKey(payload.profile);
    console.log(payload, commands);
    console.log(process.cwd());
    console.log(__dirname);
    if (!profile) {
      this.logger.error(`Profile: ${payload.profile} was not found :(`);
      return;
    }

    const credentialsData = {
      username: profile.username,
      email: profile.email,
    };
    this.logger.info(`Changing git store mode...`);
    commands.execute(Command.GIT_STORE_CREDENTIALS);
    this.logger.info(`Changing repository credentials...`);
    commands.execute(Command.GIT_SET_LOCAL_CREDENTIALS, credentialsData);
    this.logger.info(`Changing repository author...`);
    commands.execute(Command.GIT_SET_LOCAL_AUTHOR, credentialsData);

    this.logger.info(`Changed sucessfuly`);
    console.table(credentialsData);
  }
}

export default new SwapCommand(repository, consoleLogger);
