import { readFileSync } from "node:fs";
import {
  Offer,
  OfferCity,
  OfferFacilities,
  OfferType,
  User,
  UserType,
} from "../../types/index.js";
import { FileReader } from "./file-reader.interface.js";

export class TSVFilerReader implements FileReader {
  private rawData = "";

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error("File was not read");
    }
  }

  private parseArrayField<T extends string>(field: string): T[] {
    return field.split(";") as T[];
  }

  private parseUser(
    firstname: string,
    email: string,
    avatarPath: string,
    password: string,
    userType: string
  ): User {
    return {
      firstname,
      email,
      avatarPath,
      password,
      userType: userType as UserType,
    };
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
      avatar,
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
      user: this.parseUser(firstname, email, avatar, password, userType),
    };
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split("\n")
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: "utf-8" });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
