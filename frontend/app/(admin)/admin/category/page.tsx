"use client";
import React, { useState } from "react";
import AddCategoryModel from "./addCategoryModel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorNotification, queryKeys, successNotification } from "@/utils";
import { CATEGORY } from "@/constants/querykeys";
import { deleteCategory, getAllCateogory } from "@/api/admin/category";
import { Button, Form, Input, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { CategoryType } from "@/models/category";
import dayjs from "dayjs";
import { CiCirclePlus } from "react-icons/ci";

export default function Category() {
  const [open, setOpen] = useState(false);

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const [form] = Form.useForm();

  const [config, setConfig] = useState({
    pagination: true,
    page: 1,
    take: 5,
    order: "DESC" as const,
    name: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: queryKeys(CATEGORY).list(config),
    queryFn: () => getAllCateogory(),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (categoryId: number) => {
      await deleteCategory(categoryId);
    },
    onSuccess: async (res) => {
      successNotification("Deleted successfully");
      await queryClient.refetchQueries({
        queryKey: queryKeys(CATEGORY).all,
      });
    },
    onError: async (error) => {
      console.error("Error deleting category:", error);

      errorNotification("Failed to delete category");
    },
  });

  const columns: TableProps<CategoryType>["columns"] = [
    {
      title: "S.N",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dayjs(text).format("DD MMM, YYYY"),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setCategoryId(record.id);
              setOpen(true);
              form.setFieldsValue({
                name: record.name,
              });
            }}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure want to delete the category"
            onConfirm={() => {
              mutate(record.id);
            }}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <section className="p-[60px]">
      <AddCategoryModel
        form={form}
        isModalOpen={open}
        setOpen={setOpen}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />
      <article className="max-w-[1440px] mx-auto">
        <div className=" flex justify-end mb-[25px] gap-x-[20px]">
          <Input
            className="!w-[200px]"
            placeholder="Search category"
            onChange={(value) => {
              setConfig((prev) => ({
                ...prev,
                name: value.target.value,
              }));
            }}
          />
          <button
            className=" bg-[#AD9551] flex items-center gap-x-[5px]  px-[12px] py-[8px] rounded-[5px]"
            onClick={() => setOpen(true)}
          >
            <CiCirclePlus color="white" />

            <p className="text-white font-medium"> Add Category</p>
          </button>
        </div>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: config.take,
            total: data?.length,
            current: config.page,
            onChange: (page) => {
              setConfig((prev) => ({
                ...prev,
                page,
              }));
            },
          }}
        />
      </article>
    </section>
  );
}
