import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { ApplicationError } from "@app/internal/errors";
import { StatusCodes } from "http-status-codes";
import env from "@app/config/env";

export async function loadSession(req: Request, _res: Response, next: NextFunction) {
  const authSession = req.headers.authorization;

  if (!authSession) {
    return next(new ApplicationError(StatusCodes.UNAUTHORIZED, "We could not authenticate your request"));
  }

  const [scheme, token] = authSession.split(/\s+/);

  if (scheme !== "Bearer") {
    return next(new ApplicationError(StatusCodes.UNAUTHORIZED, `${scheme} is not supported`));
  }

  try {
    const decoded = await jwt.verify(token, env.app_secret);
    req.session = decoded;

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return next(new ApplicationError(StatusCodes.UNAUTHORIZED, "Your authentication has expired", err));
    } else if (err instanceof JsonWebTokenError) {
      return next(new ApplicationError(StatusCodes.UNAUTHORIZED, "We could not verify your authentication", err));
    }

    return next(err);
  }
}
