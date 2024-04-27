import { ToastContainer } from "react-toastify";

import React, { ReactNode } from "react";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import StyledComponentsRegistry from "@/providers/AntRegistrt";
import { withHydration } from "@/providers/withHydration";
import { getAllCategory } from "@/api/category";
import { queryKeys } from "@/utils";
import { CATEGORY } from "@/constants/querykeys";
 function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ToastContainer />
          <Header />
          <main className=" min-h-screen">{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}


export default withHydration(Layout, async (queryClient) => {

  await queryClient.prefetchQuery({
    queryKey: queryKeys(CATEGORY).lists(),
    queryFn: () => getAllCategory({}),
  });
  
  return queryClient;
});

