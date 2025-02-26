export type TTokenAccess = "admin" | "user";

export type TToken = {
  _id: string;
  name: string;
  access: TTokenAccess;
  token: string;
  exp: Date;

  createdAt: Date;
  updatedAt: Date;
};
