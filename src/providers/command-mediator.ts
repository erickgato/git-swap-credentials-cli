import { CommandNotFoundException } from "./../exceptions/command-not-found.exception";
import { ICommand } from "../contracts/command";
import { ICommandMediator } from "../contracts/mediator";
import { tap } from "lodash";
import swapCommand from "../commands/swap";

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

  execute(name: string, params: Record<string, any>): Promise<void> {
    const command = this.commands.get(name);

    if (!command) throw new CommandNotFoundException(name);

    return command.execute(params, this);
  }
}

export default tap(new CommandMediator(), (mediator) => {
  mediator.add("swap", swapCommand);
}) as ICommandMediator;
