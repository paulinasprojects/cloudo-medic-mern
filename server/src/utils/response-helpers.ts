import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

export const SendSuccess = <T>(
  res: Response,
  data: T,
  message: string = "success",
  statusCode: number = 200
) => {
  const response: ApiResponse<T>= {
    success: true,
    data,
    message
  };

  res.status(statusCode).json(response);
};

export const asynHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};