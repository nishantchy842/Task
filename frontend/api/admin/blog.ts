import { IGetAll, IMessage, IQueryParamaters } from "@/interface";
import { blogType } from "@/models/blogModel";
import { fetch } from "..";
import Cookies from "js-cookie";

export const getAllBlogs: GetAll<IQueryParamaters, blogType> = async () => {
  const data = [
    {
      title: "Technology",
      content: "technology",
      category: "",
      id: 1,
      image:
        "https://res.cloudinary.com/dgil1ngmu/image/upload/v1709054971/mclfvgkexqqyhfu13lw5.jpg",
    },
  ];

  return { result: data } as unknown as IGetAll<blogType>;
};

type ICreateBlog = Omit<blogType, "id">;
export const createBlog: Post<ICreateBlog> = async (values) => {
  const res = await fetch(`post`, {
    method: "POST",
    body: JSON.stringify(values),
    // credentials: 'include',
    headers: {
      ["Authorization"]: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
  });

  const { data } = res;

  return data;
};

export const UpdateBlog: Patch<ICreateBlog & { id: number }> = async ({
  id,
  ...data
}) => {
  const res = await fetch(`post/${id}`, {
    body: JSON.stringify(data),
    method: "PATCH",
    headers: {
      ["Authorization"]: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
  });

  return res.data as IMessage;
};

export const DeleteBlog = async (id: number) => {
  const res = await fetch(`post/${id}`, {
    method: "DELETE",
    headers: {
      ["Authorization"]: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
  });

  return res.data as IMessage;
};
