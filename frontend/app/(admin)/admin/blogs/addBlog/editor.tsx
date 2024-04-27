import dynamic from "next/dynamic";
import React from "react";
import katex from "katex";
import {
  UploadBeforeHandler,
  UploadBeforeReturn,
} from "suneditor-react/dist/types/upload";
import { UploadApi } from "@/api/admin/upload";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

export default function Editor({
  setContent,
  content,
}: {
  setContent: (data: string) => void;
  content: string;
}) {
  function onImageUploadBefore(
    files: File[],
    _info: object,
    uploadHandler: UploadBeforeHandler
  ): UploadBeforeReturn {
    const formData = new FormData();

    console.log(files, "filse");

    formData.append("file", files[0], files[0]?.name);

    UploadApi(formData)
      .then((res) => {
        uploadHandler({
          result: [
            {
              url: res.image_url,
              name: files[0]?.name,
              size: files[0]?.size,
            },
          ],
        });
      })
      .catch((err) => console.log(err, "error"));

    return undefined;
  }
  return (
    <SunEditor
      defaultValue={content}
      height="450px"
      onImageUploadBefore={onImageUploadBefore}
      placeholder="Type your content here..."
      onChange={(value) => setContent(value)}
      setOptions={{
        katex,
        buttonList: [
          ["undo", "redo"],
          [
            ":p-More Paragraph-default.more_paragraph",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
          ],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["removeFormat"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          ["-right", "image", "table", "math"],
        ],
        imageUrlInput: false,
      }}
    />
  );
}
