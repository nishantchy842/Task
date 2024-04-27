"use client";
import Image from "next/image";
import React from "react";
import logo from "@/public/updatesvglogo.svg";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Dropdown } from "antd";
import { queryKeys } from "@/utils";
import { CATEGORY } from "@/constants/querykeys";
import { usePathname } from "next/navigation";
import { getAllCateogory } from "@/api/admin/category";

export default function Header() {
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: queryKeys(CATEGORY).lists(),

    queryFn: () => getAllCateogory(),
  });

  console.log(data, "data");

  return (
    <section className="px-[60px]  w-full shadow-lg sticky top-0 bg-white z-50">
      <article className=" max-w-[1440px] mx-auto flex items-center justify-center">
        <div className="">
          <div className="relative size-[100px]">
            <Image src={logo} fill quality={100} alt="/" />
          </div>
        </div>
        <div className="sub_footer w-full flex items-end justify-end gap-x-[20px] ">
          {data?.map((item) => (
            <div key={item.name}>
              <Link href={item.id.toString()}>
                <p
                  className={`${
                    item.id.toString() === pathname.split("/")[1]
                      ? "text-[#0C62BB]"
                      : "text-[#000000]"
                  } text-[18px] font-[600] leading-[25px] hover:text-[#0C62BB]`}
                >
                  {item.name}
                </p>
              </Link>
            </div>
          ))}
          <Link href={"auth/login"}>
            <button className="admin-primary-btn text-white">Login</button>
          </Link>
        </div>
      </article>
    </section>
  );
}
