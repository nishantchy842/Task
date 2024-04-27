import { toast } from "react-toastify";

export const successNotification = (message: string) =>
  toast.success(message, {
    bodyClassName: "align-baseline",
    style: {
      fontWeight: 500,
      fontFamily: "Figtree",
    },
  });

export const errorNotification = (message: string) =>
  toast.error(message, {
    bodyClassName: "align-baseline",
    style: {
      fontWeight: 500,
      fontFamily: "Figtree",
    },
  });

export const queryKeys = (key: string) => ({
  all: [key] as const,
  lists: () => [...queryKeys(key).all, "list"] as const,
  list: (filters: object) => [...queryKeys(key).lists(), filters] as const,
  details: () => [...queryKeys(key).all, "detail"] as const,
  detail: (id: string | number) => [...queryKeys(key).details(), id] as const,
});
