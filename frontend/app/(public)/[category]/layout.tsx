import { getAllBlogs } from "@/api/blog";
import { BLOG } from "@/constants/querykeys";
import { withHydration } from "@/providers/withHydration";
import { queryKeys } from "@/utils";
import React, { ReactNode } from "react";

function RootLayout({
  params: { category },
  children,
}: {
  params: { category: string };
  children: ReactNode;
}) {
  return <div className="px-[60px]">{children}</div>;
}

export default withHydration(RootLayout, async (queryClient) => {
  await queryClient.prefetchQuery({
    queryKey: queryKeys(BLOG).lists(),
    queryFn: () => getAllBlogs({}),
  });
  return queryClient;
});
