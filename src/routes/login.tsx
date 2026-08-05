import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    throw redirect({ href: "/login.html" });
  },
  component: () => null,
});
