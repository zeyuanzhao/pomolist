import { SideBar } from "@/components/Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row w-screen h-screen">
      <SideBar />
      {children}
    </div>
  );
};

export default AppLayout;
