import { ICommandMediator } from "./mediator";

export interface ICommand<
  Params extends Record<string, any> = Record<string, any>
> {
  execute(payload: Params, context: ICommandMediator): Promise<void>;
}
