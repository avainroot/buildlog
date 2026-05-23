import { PropsWithChildren } from "react";
import Header from "./Header/Header";
import { WorksForm } from "../Works";

const Layout = ({ children }: PropsWithChildren) => (
  <div className="container mx-auto px-4">
    <Header />
    {children}
    <WorksForm />
  </div>
);

export default Layout;
