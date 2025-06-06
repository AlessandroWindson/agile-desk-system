import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';
import logger from '../config/logger.js';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    logger.info(`[${req.method}] ${req.url} - ${responseTime}ms`);
  });
  
  next();
};

export default loggerMiddleware;
