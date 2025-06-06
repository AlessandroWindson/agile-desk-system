import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';
import logger from '../config/logger.js';

interface ApiError extends Error {
  statusCode?: number;
  details?: string;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err instanceof Error ? 500 : 400;
  const message = err instanceof Error ? err.message : 'Internal Server Error';

  logger.error(`[${req.method} ${req.path}] Error ${statusCode}: ${message}`);

  res.status(statusCode).json({
    status: 'error',
    message,
    timestamp: new Date().toISOString()
  });
};

export default errorHandler;
