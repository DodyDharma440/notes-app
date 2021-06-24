import React from "react";
import { AppBar } from "components/index";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div
      id="container"
      className="bg-gray-100 min-h-screen flex justify-center"
    >
      <AppBar />
      <div id="content" className="max-w-md w-full min-h-screen pt-16 px-2">
        {children}
      </div>
    </div>
  );
};

export default Layout;
