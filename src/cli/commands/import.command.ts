import { Command } from "../../shared/types/command/command.interface.js";

export class ImportCommand implements Command {
  public getName(): string {
    return "--import";
  }

  public execute(...parameters: string[]): void {}
}
