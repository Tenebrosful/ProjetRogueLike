import { Request, Response } from "express";

/**
 * Error 501 "Not Implemented"
 */
export default function error501(req: Request, res: Response) {
  res.status(501).json({
    code: 501,
    message: "Fonctionnalité non-implémentée"
  });
}