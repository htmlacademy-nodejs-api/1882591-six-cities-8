import chalk from "chalk";
import { getErrorMessage } from "../../shared/helpers/index.js";
import { TSVFilerReader } from "../../shared/libs/file-reader/index.js";
import { Command, Offer } from "../../shared/types/index.js";

export class ImportCommand implements Command {
  public getName() {
    return "--import";
  }

  private onImportedOffer(offer: Offer): void {
    console.info(chalk.yellowBright(offer));
  }

  private onCompleteImport(count: number) {
    console.info(chalk.yellowBright(`${count} rows imported`));
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFilerReader(filename);

    fileReader.on("line", this.onImportedOffer);
    fileReader.on("end", this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }
}
