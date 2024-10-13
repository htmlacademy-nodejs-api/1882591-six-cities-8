import { User } from "../user/user.type.js";
import { OfferCity } from "./offer-city.enum.js";
import { OfferFacilities } from "./offer-facilities.enum.js";
import { OfferType } from "./offer-type.enum.js";

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: OfferCity;
  previewImg: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  offerType: OfferType;
  roomQuantity: number;
  guestQuantity: number;
  price: number;
  facilities: OfferFacilities[];
  user: User;
  comments: number;
  longitude: number;
  latitude: number;
};
