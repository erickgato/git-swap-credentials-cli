export class CommandNotFoundException extends Error {
  constructor(protected readonly commandName: string) {
    super(`Command ${commandName} not found`);
  }
}
