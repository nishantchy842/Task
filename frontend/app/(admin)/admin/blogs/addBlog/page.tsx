"use client";

import { getAllCateogory } from "@/api/admin/category";
import { errorNotification, queryKeys, successNotification } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  Input,
  Select,
  Tag,
  Upload,
  type FormProps,
  message,
} from "antd";
import { Button } from "primereact/button";

import React, { useEffect, useState } from "react";
import { FaPlusMinus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import Cookies from "js-cookie";
import { createBlog } from "@/api/admin/blog";
import { blogType } from "@/models/blogModel";
import Editor from "./editor";
import { getSingleBlog } from "@/api/blog";
import { BLOG } from "@/constants/querykeys";
import { redirect, useRouter } from "next/navigation";

const { TextArea } = Input;

type FieldType = {
  title?: string;
  content?: string;
  category?: number[];
  image: any;
};

export default function AddBlog({
  searchParams: { id },
}: {
  searchParams: { id: number };
}) {
  const [form] = Form.useForm();

  const [content, setContent] = useState("write content here");

  const router = useRouter();

  const { data: categoryData } = useQuery({
    queryFn: () => getAllCateogory(),
    queryKey: queryKeys("Category").lists(),
  });

  const { data, isSuccess } = useQuery({
    queryFn: () => (id ? getSingleBlog(id) : null),
    queryKey: queryKeys(BLOG).detail(id),
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data, "data");
      form.setFieldsValue({
        title: data.title,
        category: data?.category,
        image: data?.image
          ? [
              {
                uid: 0,
                name: data?.image,
                status: "done",
                response: {
                  data: {
                    fileName: data?.image,
                  },
                },
                url: data?.image,
              },
            ]
          : [],
      });
      setContent(data.content);
    }
  }, [isSuccess, data]);

  const token = Cookies.get("token");
  const props = {
    name: "file",
    maxCount: 1,
    accept: ".png,.jpg",

    headers: {
      Authorization: `Bearer ${token}`,
    },
    action: "http://localhost:3001/api/upload",
  };

  const uploadFile = (e: any, nameField: string) => {
    let fileList = [...e.fileList];
    const { status } = fileList[0] || "";

    console.log(status, fileList, "statius");

    if (status === "error") {
      const errorResponse = message.error(
        fileList[0].response
          ? fileList[0].response.message
          : "Failed to upload, please try again"
      );
    }

    form.setFields([
      {
        name: nameField,
        value: fileList
          .filter((data) => data.status !== "error")
          .map((imageResponse) => ({
            ...imageResponse,
            url: imageResponse?.response?.image_url,
          })),
      },
    ]);

    if (Array.isArray(e)) {
      return e;
    }

    console.log(form.getFieldValue(nameField));

    return e && form.getFieldValue(nameField);
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: blogType) => {
      return await createBlog(data);
    },
    onSuccess: async (res: { message: string }) => {
      form.resetFields();
      successNotification(res.message);
      await queryClient.refetchQueries({
        queryKey: queryKeys(BLOG).all,
      });
      router.push("/admin/blogs");
    },
    onError: (err) => {
      errorNotification(err.message ?? "Failed to create");
    },
  });

  return (
    <section className="p-[60px]">
      <article className="w-[1440px] mx-auto">
        <Form form={form} layout="vertical">
          <Form.Item
            name={"title"}
            label={"Title"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <section className="grid grid-cols-2 gap-x-[30px] items-center">
            <Form.Item
              name={"category"}
              label="Select category"
              rules={[{ required: true }]}
            >
              <Select
                // mode="multiple"
                options={categoryData?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                getPopupContainer={(triggerNode) => {
                  return triggerNode.parentNode;
                }}
              ></Select>
            </Form.Item>
            <article className="flex flex-wrap">
              <div className="flex items-center gap-x-[20px] rounded-[20px] h-fit py-[5px] px-[10px] bg-slate-300">
                <p>hello</p>
                <IoCloseCircle />
              </div>
            </article>
          </section>

          <Editor setContent={setContent} content={content} />

          <Form.Item
            label="Upload"
            name={"image"}
            valuePropName="fileList"
            getValueFromEvent={(file) => uploadFile(file, "image")}
            // rules={[{ required: true }]}
          >
            <Upload {...props} listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <FaPlusMinus />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </Form>
        <Form.Item>
          <Button
            className="p-button admin-primary-btn"
            onClick={() => {
              form
                .validateFields(["title", "content", "image", "category"])
                .then((values) => {
                  console.log(values, "values");
                  values = {
                    ...values,
                    image: values?.image ? values?.image[0].url : "null",
                    content,
                    tags: [],
                  };
                  mutate(values as blogType);
                });
            }}
          >
            {id ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </article>
    </section>
  );
}
