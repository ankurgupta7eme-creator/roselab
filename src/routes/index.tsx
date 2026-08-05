import { createFileRoute, redirect } from "@tanstack/react-router";

// The Rose Laboratories site is a static multi-page site served from /public.
// The framework reserves "index.html", so the home page lives at /home.html
// and the app root redirects to it.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/home.html" });
  },
  component: () => null,
});
