import React from "react";
import Sidebar from "./Sidebar";

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen grid grid-cols-12">
      <aside className="col-span-3 border-r">
        <Sidebar />
      </aside>
      <main className="col-span-6">{children}</main>
      <aside className="col-span-3 border-l">Right panel</aside>
    </div>
  );
};

export default MainLayout;
