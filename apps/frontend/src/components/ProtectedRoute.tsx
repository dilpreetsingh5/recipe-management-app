import type { ReactNode } from "react";
import { Protect, RedirectToSignIn } from "@clerk/clerk-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return <Protect fallback={<RedirectToSignIn />}>{children}</Protect>;
}
