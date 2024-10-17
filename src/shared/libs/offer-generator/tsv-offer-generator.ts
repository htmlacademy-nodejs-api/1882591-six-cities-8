import { getRandomItem, getRandomItems } from "../../helpers/common.js";
import { MockServerData } from "../../types/index.js";
import { OfferGenerator } from "./index.js";

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.title);
    const description = getRandomItem(this.mockData.description);
    const postDate = getRandomItem(this.mockData.postDate);
    const city = getRandomItem(this.mockData.city);
    const previewImg = getRandomItem(this.mockData.previewImg);
    const images = getRandomItems(this.mockData.images).join(";");
    const isPremium = getRandomItem(this.mockData.isPremium);
    const isFavorite = getRandomItem(this.mockData.isFavorite);
    const rating = getRandomItem(this.mockData.rating);
    const offerType = getRandomItem(this.mockData.offerType);
    const roomQuantity = getRandomItem(this.mockData.roomQuantity);
    const guestQuantity = getRandomItem(this.mockData.guestQuantity);
    const price = getRandomItem(this.mockData.price);
    const facilities = getRandomItems(this.mockData.facilities).join(";");
    const comments = getRandomItems(this.mockData.comments).join(";");

    const firstname = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(this.mockData.userTypes);

    const longitude = getRandomItem(this.mockData.longitude);
    const latitude = getRandomItem(this.mockData.latitude);

    return [
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
      comments.length,
      longitude,
      latitude,
    ].join("\t");
  }
}
