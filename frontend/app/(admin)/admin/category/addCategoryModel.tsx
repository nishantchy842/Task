import { createCategory, updateCategory } from "@/api/admin/category";
import { queryKeys, successNotification } from "@/utils";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";
import { CATEGORY } from "@/constants/querykeys";
import { CategoryType } from "@/models/category";

export default function AddCategoryModel({
  isModalOpen,
  setOpen,
  form,
  categoryId,
  setCategoryId,
}: {
  isModalOpen: boolean;
  setOpen: (open: boolean) => void;
  form: FormInstance<any>;
  categoryId: number | undefined;
  setCategoryId: (categoryId: number | undefined) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: Pick<CategoryType, "name">) => {
      if (!categoryId) {
        return await createCategory(data);
      } else {
        return await updateCategory(data, categoryId);
      }
    },
    // onSuccess: async (res: { message: string }) => {
    //   form.resetFields();
    //   successNotification(res.message);
    //   setCategoryId(undefined);
    //   await queryClient.refetchQueries({
    //     queryKey: queryKeys(CATEGORY).all,
    //   });
    //   setOpen(false);
    // },
  });

  const handleOk = () => {
    form.validateFields(["name"]).then((value) => {
      console.log(value);
      mutate(value);
    });
  };

  return (
    <Modal
      title="Add Category"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={() => setOpen(false)}
      centered
    >
      <Form layout="vertical" form={form}>
        <Form.Item name={"name"}>
          <Input placeholder="add category" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
