import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    throw redirect({ href: "/register.html" });
  },
  component: () => null,
});
