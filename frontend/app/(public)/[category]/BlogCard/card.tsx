import { blogType } from "@/models/blogModel";
import { Image, Tag } from "antd";
import React from "react";

export default function Card({ data }: { data: blogType }) {
  return (
    <section className=" relative border rounded-[5px] shadow-sm p-[10px]">
      <article className="">
        <div className="  absolute top-0 right-0 z-20">
          <Tag color="red"> {(data?.tags ?? [])[0]?.title}</Tag>
        </div>
        <div className="  w-full h-[250px] ">
          <Image
            className=" object-cover rounded-[10px] overflow-hidden"
            src={data.image && data?.image}
            fallback={"/updatesvglogo.svg"}
            alt={"/"}
            // fill={true}
            sizes="100%"
            preview={false}
            // quality={100}
          />
        </div>
        <p>{data.title}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        ></p>
      </article>
    </section>
  );
}
