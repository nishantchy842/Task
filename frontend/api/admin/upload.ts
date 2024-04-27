import { BASE_URL } from "@/constants/config";
import { fetch } from "..";
import Cookie from "js-cookie";

type UploadImage = (
  data: FormData
) => Promise<{ message: string; image_url: string }>;

export const UploadApi: UploadImage = async (data) => {
  const res = await fetch("upload", {
    method: "POST",
    headers: {
      ["Authorization"]: `Bearer ${Cookie.get("token")}`,
    },
    body: data,
  });
  console.log(res, "res");

  return res.data as {
    message: string;
    image_url: string;
  };
};
