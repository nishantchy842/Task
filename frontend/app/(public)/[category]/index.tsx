"use client";

import { BLOG } from "@/constants/querykeys";
import { queryKeys } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Card from "./BlogCard/card";
import Link from "next/link";
import { getSingleCategory } from "@/api/category";
import { isEmpty } from "lodash";
import { Empty } from "antd";

export default function RootPage({
  params: { category },
}: {
  params: { category: string };
}) {
  const [config, setConfig] = useState({
    pagination: true,
    take: 10,
    page: 1,
    order: "DESC" as const,
    categorySlug: category,
  });

  const { data } = useQuery({
    queryKey: queryKeys(BLOG).list(config),
    queryFn: () => getSingleCategory(+category),
  });

  console.log(data);

  if (isEmpty(data?.posts)) {
    return <Empty />;
  }

  return (
    <div className="grid grid-cols-5 gap-x-[20px] mt-[60px]">
      {data?.posts.map((item) => (
        <Link href={`${category}/${item.id}`} key={item.id}>
          <Card data={item} />
        </Link>
      ))}
    </div>
  );
}
