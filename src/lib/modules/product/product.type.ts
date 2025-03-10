export type TProduct = {
  _id: string;
  title: string;
  price: number;
  url: string;
  image: string;
  status: string;
  lastChecked: Date;
  lastModified: Date;
  done: boolean;

  createdAt: Date;
  updatedAt: Date;
};
