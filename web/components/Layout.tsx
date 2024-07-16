import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import CategoryCard from "./sidebar/CategoryCard";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  showSidebar = true,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
      <div className="flex flex-1 mt-16">
        <main className={`flex-1 p-4 ${showSidebar ? "mr-64" : ""}`}>
          {children}
        </main>
        {showSidebar && (
          <aside className="w-64 p-4">
            <CategoryCard />
            {/* 添加其他侧边栏组件 */}
          </aside>
        )}
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
