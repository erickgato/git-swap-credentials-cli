import { CommandNotFoundException } from "./../exceptions/command-not-found.exception";
import { ICommand } from "../contracts/command";
import { ICommandMediator } from "../contracts/mediator";
import { tap } from "lodash";
import swapCommand from "../commands/swap";
import { Command } from "../constants/commands";
import gitSetLocalAuthor from "../commands/git-set-local-author";
import gitSetLocalCredentials from "../commands/git-set-local-credentials";
import gitStoreCredentials from "../commands/git-store-credentials";
import listProfiles from "../commands/list-profiles";
import getProfileToken from "../commands/get-profile-token";

export class CommandMediator implements ICommandMediator {
  constructor(
    protected readonly commands: Map<
      string,
      ICommand<Record<string, any>>
    > = new Map()
  ) {}

  public add(name: string, executor: ICommand<Record<string, any>>) {
    this.commands.set(name, executor);

    return this;
  }

  execute(name: string, params?: Record<string, any>): Promise<void> {
    const command = this.commands.get(name);

    if (!command) throw new CommandNotFoundException(name);

    return command.execute(params || {}, this);
  }
}

export default tap(new CommandMediator(), (mediator) => {
  mediator.add(Command.SWAP, swapCommand);
  mediator.add(Command.GIT_SET_LOCAL_AUTHOR, gitSetLocalAuthor);
  mediator.add(Command.GIT_SET_LOCAL_CREDENTIALS, gitSetLocalCredentials);
  mediator.add(Command.GIT_STORE_CREDENTIALS, gitStoreCredentials);
  mediator.add(Command.LIST_PROFILES, listProfiles);
  mediator.add(Command.GET_PROFILE_TOKEN, getProfileToken);
}) as ICommandMediator;
