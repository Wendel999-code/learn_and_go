import { Role } from "@prisma/client";
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "ENROLLEE" | "ADMIN";
      };
    }
  }
}
