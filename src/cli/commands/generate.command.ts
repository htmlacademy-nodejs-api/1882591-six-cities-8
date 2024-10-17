import chalk from "chalk";
import got from "got";
import { getErrorMessage } from "../../shared/helpers/index.js";
import { TSVFileWriter } from "../../shared/libs/file-writer/tsv-file-writer.js";
import { TSVOfferGenerator } from "../../shared/libs/offer-generator/tsv-offer-generator.js";
import { Command, MockServerData } from "../../shared/types/index.js";

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  public getName() {
    return "--generate";
  }

  private async write(filePath: string, offerCount: number) {
    const tsvOffferGenerator = new TSVOfferGenerator(this.initialData);
    const fileWriter = new TSVFileWriter(filePath);

    for (let i = 0; i < offerCount; i++) {
      await fileWriter.write(tsvOffferGenerator.generate());
    }
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filePath, offerCount);
      console.info(
        `File ${chalk.cyanBright(filePath)} was ${chalk.greenBright(
          "created!"
        )}`
      );
    } catch (error) {
      console.error(chalk.red("Can't generate data"));

      getErrorMessage(error);
    }
  }
}
