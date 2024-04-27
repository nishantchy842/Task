import { withHydration } from "@/providers/withHydration";
import { queryKeys } from "@/utils";
import { BLOG } from "@/constants/querykeys";
// import { getBlogByCategorySlug } from "@/api/blog";
import SingleBlog from ".";
import { getSingleBlog } from "@/api/blog";

export default withHydration(
  SingleBlog,
  async (queryClient, { params: { category, blogId } }) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys(BLOG).detail(Number(blogId)),
      queryFn: () => getSingleBlog(Number(blogId)),
    });
    return queryClient;
  }
);
