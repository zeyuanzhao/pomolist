const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-screen h-screen text-s">{children}</div>
  );
};

export default AppLayout;
