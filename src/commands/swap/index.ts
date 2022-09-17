import { ICommand } from "../../contracts/command";
import { IProfileRepository } from "../../contracts/profile-repository";
import repository from "../../repositories/local-profile.repository";
import { IParams } from "./types";

export class SwapCommand implements ICommand<IParams> {
  constructor(protected readonly profileRepository: IProfileRepository) {}

  public async execute(payload: IParams) {
    console.log(payload);
    console.log(await this.profileRepository.findAll());
  }
}

export default new SwapCommand(repository);
