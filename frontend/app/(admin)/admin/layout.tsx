import StyledComponentsRegistry from "@/providers/AntRegistrt";
import { ToastContainer } from "react-toastify";
import Header from "./component/header";
import Footer from "./component/footer";
import { ReactNode } from "react";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "react-toastify/dist/ReactToastify.css";
import "suneditor/dist/css/suneditor.min.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
            <ToastContainer />
            <Header />
            <main className=" min-h-screen">{children}</main>
            <Footer />
          </PrimeReactProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
