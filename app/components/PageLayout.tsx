import { PageLayoutProps } from "@/lib/types";
import React from "react";

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, className }) => (
  <div className={`w-full mx-auto bg-gray-900 rounded-xl shadow-lg p-4 sm:p-8 border border-gray-800 ${className ?? ''}`}>
    <h1 className="text-xl sm:text-3xl font-bold mb-4 text-white">{title}</h1>
    <div className="mt-4">
      {children}
    </div>
  </div>
);

export default PageLayout;
