import { ICommand } from "./command";

export interface ICommandMediator {
  add(name: string, executor: ICommand<Record<string, any>>): ICommandMediator;
  execute(name: string, params: Record<string, any>): Promise<void>;
}
