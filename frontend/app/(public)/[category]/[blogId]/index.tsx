"use client";
import { getSingleBlog } from "@/api/blog";
import { BLOG } from "@/constants/querykeys";
import { queryKeys } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function SingleBlog({
  params: { category, blogId },
}: {
  params: { category: string; blogId: string };
}) {
  const { data } = useQuery({
    queryFn: () => getSingleBlog(Number(blogId)),
    queryKey: queryKeys(BLOG).detail(Number(blogId)),
  });

  return <div>{JSON.stringify(data)}</div>;
}
