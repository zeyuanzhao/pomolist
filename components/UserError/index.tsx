export const UserError = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-ts">
      <h1 className="text-3xl font-bold">User Error</h1>
      <p className="mt-4 text-lg">Please login to access this page.</p>
      <p className="mt-2 text-sm">
        If you are already logged in, please refresh the page.
      </p>
    </div>
  );
};
