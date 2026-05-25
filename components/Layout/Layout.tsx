import { PropsWithChildren } from "react";
import Header from "./Header/Header";

const Layout = ({ children }: PropsWithChildren) => (
  <div className="container mx-auto px-4 flex flex-col min-h-screen">
    <Header />
    <div className="p-4 flex-1">{children}</div>
  </div>
);

export default Layout;
