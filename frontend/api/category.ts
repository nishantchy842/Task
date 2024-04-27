import { IGetAll, IQueryParamaters } from "@/interface";
import { CategoryType } from "@/models/category";
import { fetch } from ".";

export const getAllCategory: GetAll<
  IQueryParamaters,
  CategoryType
> = async () => {
  const res = await fetch("category", {
    cache: "no-store",
  });

  const { data } = res;

  return data as IGetAll<CategoryType>;
};

export const getSingleCategory: Get<number, CategoryType> = async (id) => {
  const res = await fetch(`category/${id}`, {
    cache: "no-cache",
  });

  const { data } = res;

  return data.data;
};
