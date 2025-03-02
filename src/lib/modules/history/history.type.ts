import { TToken } from "../token/token.type";

export type THistory = {
  _id: string;
  url: string;
  totalProducts: number;
  totalPages: number;
  newProducts: number;
  updatedProducts: number;
  scrapedBy: TToken;

  createdAt: Date;
  updatedAt: Date;
};
