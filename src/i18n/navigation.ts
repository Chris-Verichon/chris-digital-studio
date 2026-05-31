import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation primitives. Using these instead of next/link and
// next/navigation keeps the active locale in the URL automatically.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
