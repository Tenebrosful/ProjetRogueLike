import { Request, Response } from "express";

/**
 * Error 400 "Bad Request"
 */
export default function error400(req: Request, res: Response) {
  res.status(400).json({
    code: 400,
    message: `URL ${req.url} inconnue`
  });
}