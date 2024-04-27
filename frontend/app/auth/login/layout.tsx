import BrandLogo from "@/common/logo";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ToastContainer />

      <main>{children}</main>
    </div>
  );
}
