import { blogType } from "./blogModel";

export type CategoryType = {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  posts: blogType[];
};
