import { fetch } from ".";
import { type Todo } from "@/models/todo";
import type { IMessage, IGetAll, IQueryParamaters } from "@/interface";

export const getTodos: GetAll<
  IQueryParamaters & Partial<Pick<Todo, "title">>,
  Todo
> = async ({ pagination = true, page = 1, order = "", title = "" }) => {
  const res = await fetch(`https://dummyjson.com/products`, {
    cache: "no-store",
  });
  const { data } = res;

  const { products } = data;

  return { result: products } as IGetAll<Todo>;
};

export const getTodo: Get<number, Todo> = async (id) => {
  const res = await fetch(`/todo/${id}`, {
    cache: "no-store",
    credentials: process.env.NODE_ENV === "production" ? "include" : undefined, // credentials: 'include',
  });

  const { data } = res.data;

  return data as Todo;
};

type ICreateTodo = Omit<Todo, "id">;
export const createTodo: Post<ICreateTodo> = async (data) => {
  const res = await fetch(`https://dummyjson.com/products/add`, {
    method: "POST",
    body: JSON.stringify(data),
    // credentials: 'include',
  });

  return res.data;
};

type IUpdateTodo = Pick<Todo, "id"> & Partial<Todo>;
export const updateTodo: Patch<IUpdateTodo> = async ({ id, ...data }) => {
  const res = await fetch(`/todo/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    credentials: process.env.NODE_ENV === "production" ? "include" : undefined,
  });

  return res.data as IMessage;
};
