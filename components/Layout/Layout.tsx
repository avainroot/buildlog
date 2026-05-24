import { PropsWithChildren } from "react";
import Header from "./Header/Header";
import { WorksForm } from "../Works";

const Layout = ({ children }: PropsWithChildren) => (
  <div className="container mx-auto px-4 flex flex-col min-h-screen">
    <Header />
    {children}
    <WorksForm />
  </div>
);

export default Layout;
