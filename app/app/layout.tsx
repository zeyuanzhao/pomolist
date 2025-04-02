import { SideBar } from "@/components/SideBar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row w-screen h-screen text-ts">
      <SideBar />
      {children}
    </div>
  );
};

export default AppLayout;
