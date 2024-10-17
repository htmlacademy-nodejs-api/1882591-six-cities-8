import chalk from "chalk";
import got from "got";
import { appendFile } from "node:fs/promises";
import { TSVOfferGenerator } from "../../shared/libs/offer-generator/tsv-offer-generator.js";
import { Command, MockServerData } from "../../shared/types/index.js";

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  public getName() {
    return "--generate";
  }

  private async write(filePath: string, offerCount: number) {
    const tsvOffferGenerator = new TSVOfferGenerator(this.initialData);

    for (let i = 0; i < offerCount; i++) {
      await appendFile(filePath, `${tsvOffferGenerator.generate()}\n`, "utf-8");
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
      console.info(chalk.cyanBright(`File ${filePath} was created!`));
    } catch (error) {
      console.error(chalk.red("Can't generate data"));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
