import {
  createClerkClient,
  createClerkExpressRequireAuth,
  createClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";
import type { NextFunction, Request, Response } from "express";

type ClerkRequest = Request & {
  auth?: {
    userId?: string | null;
    sessionId?: string | null;
  };
};

const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;

if (!publishableKey || !secretKey) {
  throw new Error("Missing Clerk backend environment variables");
}

const clerkClient = createClerkClient({
  secretKey,
  publishableKey,
});

export const clerkMiddleware = createClerkExpressWithAuth({
  clerkClient,
  publishableKey,
  secretKey,
})();

export const requireClerkAuth = createClerkExpressRequireAuth({
  clerkClient,
  publishableKey,
  secretKey,
})();

export const attachUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedRequest = req as ClerkRequest;

  const userId = authenticatedRequest.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  (req as Request & { userId: string }).userId = userId;
  return next();
};
