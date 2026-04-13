import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  hasLocale,
  LOCALE_HEADER,
  type Locale,
} from "@/lib/i18n/config";

function localeFromPathname(pathname: string): Locale | null {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg && hasLocale(seg) ? seg : null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/studio" ||
    pathname.startsWith("/studio/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const found = localeFromPathname(pathname);

  if (found) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, found);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/"
      ? `/${defaultLocale}`
      : `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"],
};
