import { CategoryType } from "./category";
import { TagType } from "./tagModels";

export type blogType = {
  image: string;
  title: string;
  content: string;
  category?: CategoryType;
  tags: TagType[];
  id: number;
};
