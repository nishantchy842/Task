"use client";
import { blogType } from "@/models/blogModel";
import { Avatar, Space } from "antd";
import Image from "next/image";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { FcDeleteDatabase } from "react-icons/fc";
import BrandLogo from "@/public/updatesvglogo.svg";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteBlog } from "@/api/admin/blog";
import { errorNotification, queryKeys, successNotification } from "@/utils";
import { BLOG } from "@/constants/querykeys";

export default function BlogCard({ data }: { data: blogType }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: DeleteBlog,
    onSuccess: async (res: { message: string }) => {
      console.log(res, "res");
      successNotification("Deleted successfull");
      await queryClient.refetchQueries({
        queryKey: queryKeys(BLOG).all,
      });
    },
    onError: (err) => {
      console.log(err);
      errorNotification("Failed to delete");
    },
  });
  return (
    <section className="flex items-center gap-x-[10px] border rounded-lg p-[20px]">
      <Avatar shape="square" size={60} src={data.image ?? BrandLogo} />
      <div className="flex w-full justify-between">
        <p>{data.title}</p>
        <Space>
          <FcDeleteDatabase
            className=" cursor-pointer"
            onClick={() => {
              mutate(data.id);
            }}
          />
          <Link href={`/admin/blogs/addBlog?id=${data.id}`}>
            <BiEdit className=" cursor-pointer" />
          </Link>
        </Space>
      </div>
    </section>
  );
}
