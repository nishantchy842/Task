import { type Key } from "react";
// import { type User } from "@/models/admin/user";

// export type IAuthContext = {
//   authUser?: User;
// };

export type IGetAll<T> = {
  result: T[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

export type IQueryParamaters = {
  pagination?: boolean;
  page?: number;
  take?: number;
  // sort?: Key | readonly Key[];
  order?: "ASC" | "DESC";
};

export type IMessage = {
  message: string;
};

declare global {
  type Get<T, V> = (args: T) => Promise<V>;

  type GetAll<T, V> = (args: T) => Promise<IGetAll<V>>;

  type Post<T> = (args: T) => Promise<IMessage>;

  type Patch<T> = (args: T) => Promise<IMessage>;

  type Delete<T> = (args: T) => Promise<IMessage>;

  type FetchError = { message: string; status: number };
}
