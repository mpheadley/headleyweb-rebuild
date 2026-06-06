import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/profile", "/bio", "/vision"];
const ADMIN_PIN = process.env.ADMIN_PIN ?? "2426";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PROTECTED.some(p => pathname === p || pathname.startsWith(p + "/"))) {
    const token = request.cookies.get("admin_token")?.value;
    if (token !== ADMIN_PIN) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin-login";
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
