"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import type { SearchProps } from "antd/es/input/Search";
import Search from "antd/es/input/Search";
import BlogCard from "./card";
import Link from "next/link";
import { getAllBlogs, getBlogByCategorySlug } from "@/api/blog";
import { queryKeys } from "@/utils";
import { BLOG } from "@/constants/querykeys";

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const config = {
  pagination: true,
  page: 1,
  take: 10,
  order: "DESC" as const,
  categorySlug: "",
};

export default function BlogPage() {
  const { data } = useQuery({
    queryKey: queryKeys(BLOG).lists(),
    queryFn: () => getAllBlogs(),
  });

  return (
    <section>
      <div className="flex items-center justify-between px-[60px] py-[60px]">
        <h1 className=" text-[18px] font-bold">Blogs</h1>
        <article className="flex gap-x-[20px]">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 250 }}
          />
          <Link href="blogs/addBlog">
            <button className="admin-primary-btn">Add Blog</button>
          </Link>
        </article>
      </div>
      <div className="px-[60px] grid grid-cols-2  gap-[20px] justify-between ">
        {data?.map((item) => (
          <BlogCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
}
