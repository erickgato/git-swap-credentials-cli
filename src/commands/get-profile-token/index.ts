import { ILogger } from "./../../contracts/logger";
import { IProfileRepository } from "./../../contracts/profile-repository";
import { ICommand } from "../../contracts/command";
import localProfileRepository from "../../repositories/local-profile.repository";
import { IParams } from "./types";
import consoleLogger from "../../providers/console-logger";

export class GetProfileTokenCommand implements ICommand<IParams> {
  constructor(
    protected readonly repository: IProfileRepository,
    protected readonly logger: ILogger
  ) {}

  public async execute(payload: IParams): Promise<void> {
    const profile = await this.repository.findByKey(payload.profile);

    if (!profile) {
      this.logger.error(`Canot find profile with key: ${payload.profile}`);
      return;
    }

    console.table(profile);
  }
}

export default new GetProfileTokenCommand(
  localProfileRepository,
  consoleLogger
);
