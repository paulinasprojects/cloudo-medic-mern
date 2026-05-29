import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error-handler";
import { UserRole } from "../types";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userRole: UserRole
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("No token provided. Please login", 401);
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new AppError("Invalid token format", 401);
  }

  const token = parts[1];
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error("JWT_SECRET is not defiend in the .env")
  }
  
  const decoded = jwt.verify(token, secret) as { userId: string, role: UserRole }
  req.userId = decoded.userId;
  req.userRole = decoded.role;
  
  next();
}

export const  requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.userRole !== UserRole.ADMIN) {
    throw new AppError("Admin access required", 403);
  }
  next();
};

export const requirePatient = (req: Request, res: Response, next: NextFunction) => {
  if (req.userRole !== UserRole.PATIENT) {
    throw new AppError("Patient access required", 403)
  }
  next();
}

export const requireDoctor = (req: Request, res: Response, next: NextFunction) => {
  if (req.userRole !== UserRole.DOCTOR) {
    throw new AppError("Doctor access required", 403)
  }
  next();
};