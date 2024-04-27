import { IGetAll, IQueryParamaters } from "@/interface";
import { blogType } from "@/models/blogModel";
import { fetch } from ".";
import { CategoryType } from "@/models/category";

export const getAllBlogs = async () => {
  const res = await fetch("post");

  const { data } = res;

  return data as blogType[];
};

export const getBlogByCategorySlug = async () => {
  const res = await fetch(`category`);
  const { data } = res;

  return data as CategoryType[];
};

export const getSingleBlog: Get<number, blogType> = async (blogId) => {
  const res = await fetch(`post/${blogId}`, {
    cache: "no-cache",
  });

  const { data } = res;

  return data;
};

export const upload = async () => {
  const res = await fetch(`upload`, {
    method: "post",
    cache: "no-cache",
  });

  const { data } = res;

  return data;
};
