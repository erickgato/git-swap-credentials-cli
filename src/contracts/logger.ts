export interface ILogger {
  info(message: string): void;
  error(message: string): void;
  warning(message: string): void;
}
