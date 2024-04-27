"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils";
import { TODO } from "@/constants/querykeys";
import { getAllBlogs } from "@/api/blog";
import Card from "./[category]/BlogCard/card";

export default function Todo() {
  const { data: todos } = useQuery({
    queryFn: () => getAllBlogs(),
    queryKey: ["all posts"],
  });

  return (
    <div className="px-[60px] grid grid-cols-5 gap-x-[20px] mt-[60px]">
      {todos?.map((item) => (
        <Link href={`${item.category?.id}/${item.id}`} key={item.id}>
          <Card data={item} />
        </Link>
      ))}
    </div>
  );
}
