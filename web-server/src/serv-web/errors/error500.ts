import { NextFunction, Request, Response } from "express";

/**
 * Error 500 "Internal Server Error"
 */
// next is unused but required to be recognised as error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function error500(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).json({
    code: 500,
    message: (process.env.NODE_ENV === "dev" ? err.message : "Erreur Serveur")
  });
}