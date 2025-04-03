// make a function that accepts a next request and returns a next request that contains a header with the pathname of the request

import { NextRequest } from "next/server";

export const updatePathname = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const headers = new Headers(req.headers);
  headers.set("x-next-pathname", pathname);
  const updatedReq = new NextRequest(req.url, {
    method: req.method,
    headers,
    body: req.body,
    redirect: "manual",
  });
  return updatedReq;
};
