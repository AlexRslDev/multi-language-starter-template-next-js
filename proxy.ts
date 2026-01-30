import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const url = request.nextUrl;

  const isBot = /Googlebot|Bingbot|Slurp|DuckDuckBot|Yandex|facebookexternalhit|Twitterbot/i.test(userAgent);

  if (isBot && url.pathname === "/") {
    const newUrl = new URL("/es", request.url);
    return NextResponse.redirect(newUrl, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|es)/:path*"],
};
