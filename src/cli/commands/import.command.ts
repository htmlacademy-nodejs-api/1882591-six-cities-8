import chalk from "chalk";
import { TSVFilerReader } from "../../shared/libs/file-reader/index.js";
import { Command } from "../../shared/types/index.js";

export class ImportCommand implements Command {
  public getName() {
    return "--import";
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFilerReader(filename);

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${error.message}`));
    }
  }
}
