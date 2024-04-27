import { withHydration } from "@/providers/withHydration";
import RootPage from ".";
import { queryKeys } from "@/utils";
import { BLOG } from "@/constants/querykeys";
import { getBlogByCategorySlug } from "@/api/blog";

export default withHydration(
  RootPage,
  async (queryClient, { params: { category } }) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys(BLOG).lists(),
      queryFn: () =>
        getBlogByCategorySlug({
          pagination: true,
          take: 10,
          page: 1,
          order: "DESC" as const,
          categorySlug: category,
        }),
    });
    return queryClient;
  }
);
