"use client";
import BrandLogo from "@/common/logo";
import { type Menutype } from "@/models/menuModel";
import { Popconfirm, Space } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Cookie from "js-cookie";

export default function Header() {
  const pathname = usePathname();

  const activekey = pathname.split("/")[2];

  const router = useRouter();

  const navData: Menutype[] = [
    { title: "Dashboard", key: "dashboard", url: "/admin/dashboard" },
    {
      title: "Blogs",
      key: "blogs",
      url: "/admin/blogs",
    },
    {
      title: "Categories",
      key: "category",
      url: "/admin/category",
    },
    {
      title: "Users",
      key: "users",
      url: "/admin/users",
    },
    {
      title: (
        <Popconfirm
          title="Want to logout?"
          onConfirm={async () => {
            Cookie.remove("token");
            Cookie.remove("role");
            await router.push("/auth/login");
          }}
        >
          Logout
        </Popconfirm>
      ),
      key: "logout",
      url: "",
    },
  ];
  return (
    <header className="sticky top-0 bg-white px-[60px] z-50 shadow-lg py-[5px]">
      <header className=" max-w-[1440px] mx-auto flex items-center justify-between  ">
        <div className="flex items-center  gap-x-[10px] ">
          <BrandLogo width={80} height={80} />
        </div>
        <section className=" flex items-center justify-end ">
          <article className="flex items-center justify-between gap-x-[50px]  text-[16px] font-[700]">
            {navData.map((item, id) => (
              <Link href={item.url} key={item.key}>
                <p
                  style={{
                    color: item?.key === activekey ? "#FF8800" : "#808080",
                  }}
                >
                  {item.title}
                </p>
              </Link>
            ))}
          </article>
        </section>
      </header>
    </header>
  );
}
