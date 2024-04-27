import { CategoryType } from "@/models/category";
import { fetch } from "..";
import { IGetAll, IQueryParamaters } from "@/interface";

type Create = Pick<CategoryType, "name">;
export const createCategory = async (data: Create) => {
  const res = await fetch("category", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return res.data;
};

export const updateCategory = async (data: Create, id: number) => {
  const res = await fetch("category/" + id, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const getAllCateogory = async () => {
  const res = await fetch(`category`, {
    cache: "no-cache",
  });
  console.log(res, "res");
  const { data } = res;

  return data as CategoryType[];
};

export const deleteCategory = async (id: number) => {
  const res = await fetch("category/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
