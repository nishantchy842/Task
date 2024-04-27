import { withHydration } from "@/providers/withHydration";
import Image from "next/image";
import Todo from ".";
import { getTodos } from "@/api/todo";
import { todoConfig } from "./config";
import { queryKeys } from "@/utils";
import { TODO } from "@/constants/querykeys";
import { getAllCategory } from "@/api/category";

export default withHydration(Todo, async (queryClient) => {
  await queryClient.prefetchQuery({
    queryFn: () => getTodos(todoConfig),
    queryKey: queryKeys(TODO).list(todoConfig),
  });
  await queryClient.prefetchQuery({
    queryKey: ["header"],
    queryFn: () => getAllCategory({}),
  });
  
  return queryClient;
});
