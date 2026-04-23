import { createClerkClient, createClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
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

export const clerkMiddleware = createClerkExpressWithAuth({
  clerkClient: createClerkClient({
    secretKey,
    publishableKey,
  }),
  publishableKey,
  secretKey,
})();

export const requireClerkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedRequest = req as ClerkRequest;

  if (!authenticatedRequest.auth?.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  return next();
};
