import { IProfileRepository } from "./../../contracts/profile-repository";
import { ICommand } from "../../contracts/command";
import localProfileRepository from "../../repositories/local-profile.repository";
import { ICommandMediator } from "../../contracts/mediator";

export class ListProfilesCommand implements ICommand {
  constructor(protected readonly repository: IProfileRepository) {}

  public async execute(
    payload: Record<string, any>,
    context: ICommandMediator
  ): Promise<void> {
    console.table(
      await this.repository.findAll(["email", "username", "email"])
    );
  }
}

export default new ListProfilesCommand(localProfileRepository);
