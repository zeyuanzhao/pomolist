const PomodoroPage = () => {
  return (
    <div className="bg-bgp flex flex-col flex-1 text-p ">
      <div className="border text-p h-16">Top Bar</div>
      <div className="h-72 border flex flex-col items-center">
        <p className="text-[180px] leading-none">32:45</p>
        <div className="border w-[400px] h-16">Control Bar</div>
      </div>
      <div className="border flex-1">Todo List</div>
    </div>
  );
};

export default PomodoroPage;
