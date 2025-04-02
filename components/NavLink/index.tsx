import Link from "next/link";

export const NavLink = ({
  children,
  url,
}: {
  children?: React.ReactNode;
  url?: string;
}) => {
  return (
    <Link
      href={url || ""}
      className="block p-2 hover:bg-hover w-full rounded-lg"
    >
      {children}
    </Link>
  );
};
