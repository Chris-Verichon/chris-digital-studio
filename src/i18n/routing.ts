import { defineRouting } from "next-intl/routing";

// Shared routing definition consumed by the middleware, the navigation
// helpers and the request config. French is the default locale.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
});

export type Locale = (typeof routing.locales)[number];
