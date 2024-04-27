"use client";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import StyledComponentsRegistry from "@/providers/AntRegistrt";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorNotification, queryKeys, successNotification } from "@/utils";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { AUTH } from "@/constants/querykeys";
import { getLoginApi } from "@/api/login";
import BrandLogo from "@/common/logo";
import "react-toastify/dist/ReactToastify.css";

import styles from "./style.module.scss";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: getLoginApi,
    onSuccess: async (data) => {
      console.log(data, "on suceess");
      successNotification("Login Successful");
      Cookie.set("token", data?.token);
      router.push("/admin/dashboard");
    },
    onError: (err: FetchError) => errorNotification(err?.message),
  });

  return (
    <div
      className={`${styles.login_page} w-full h-screen flex items-center justify-center bg-[#F3F7FB]`}
    >
      <section className=" px-[60px] w-[723px] py-[60px] bg-[#FFFFFF] border-[#E6EDEF] rounded-lg flex flex-col items-center justify-center">
        <div className="flex items-center justify-center font-bold">
          <BrandLogo width={150} height={150} />
        </div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(value) => {
            mutate(value);

            // getLoginApi(value);
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};
export default Login;
