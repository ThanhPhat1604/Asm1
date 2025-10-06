export interface Product {
  _id?: string; // từ MongoDB
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  createdAt?: string;
}
