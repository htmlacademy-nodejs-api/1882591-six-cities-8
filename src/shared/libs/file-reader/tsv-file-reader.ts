import EventEmitter from "node:events";
import { createReadStream } from "node:fs";
import {
  Offer,
  OfferCity,
  OfferFacilities,
  OfferType,
  UserType,
} from "../../types/index.js";
import { FileReader } from "./file-reader.interface.js";

export class TSVFilerReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly filename: string) {
    super();
  }

  private parseArrayField<T extends string>(field: string): T[] {
    return field.split(";") as T[];
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      city,
      previewImg,
      images,
      isPremium,
      isFavorite,
      rating,
      offerType,
      roomQuantity,
      guestQuantity,
      price,
      facilities,
      firstname,
      email,
      avatarPath,
      password,
      userType,
      comments,
      longitude,
      latitude,
    ] = line.split("\t");

    return {
      title,
      description,
      previewImg,
      postDate: new Date(postDate),
      city: city as OfferCity,
      offerType: offerType as OfferType,
      rating: Number(rating),
      roomQuantity: Number(roomQuantity),
      guestQuantity: Number(guestQuantity),
      price: Number(price),
      comments: Number(comments),
      longitude: Number(longitude),
      latitude: Number(latitude),
      isPremium: JSON.parse(isPremium),
      isFavorite: JSON.parse(isFavorite),
      images: this.parseArrayField(images),
      facilities: this.parseArrayField<OfferFacilities>(facilities),
      user: {
        firstname,
        email,
        avatarPath,
        password,
        userType: userType as UserType,
      },
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: "utf-8",
    });

    let remainingData = "";
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf("\n")) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);

        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit("line", parsedOffer);
      }
    }

    this.emit("end", importedRowCount);
  }
}
