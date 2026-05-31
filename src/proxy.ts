import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Detects the locale, redirects "/" to the localized route and rewrites
// requests so the [locale] segment is always present.
export default createMiddleware(routing);

export const config = {
  // Skip Next.js internals and static assets.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
