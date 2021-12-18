import { NextFunction, Request, Response } from "express";

/**
 * Log every requests
 */
export default function logger(req: Request, res: Response, next: NextFunction) {
  const now = new Date;
  console.log(`[${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}] ${req.method} ${req.originalUrl}`);
  next();
}