import SideBar from "@/components/sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <SideBar />
    </div>
  );
};

export default AppLayout;
