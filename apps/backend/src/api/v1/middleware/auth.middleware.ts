import {
  createClerkClient,
  createClerkExpressRequireAuth,
  createClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";
import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../../lib/prisma.js";

type ClerkRequest = Request & {
  auth?: {
    userId?: string | null;
    sessionId?: string | null;
  };
};

export type AuthenticatedRequest = Request & {
  clerkUserId: string;
  userId: number;
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

export const attachUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedRequest = req as ClerkRequest;

  const clerkUserId = authenticatedRequest.auth?.userId;

  if (!clerkUserId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const user = await prisma.user.upsert({
    where: { clerkId: clerkUserId },
    update: {},
    create: { clerkId: clerkUserId },
  });

  (req as AuthenticatedRequest).clerkUserId = clerkUserId;
  (req as AuthenticatedRequest).userId = user.id;
  return next();
};
