import { COMMON_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const paramsIdValidation = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required().empty(''),
  });
  const validationResult = schema.validate(req.params);
  const { error } = validationResult;
  if (error) {
    throw new CustomError({ ...COMMON_ERROR.invalidQuery });
  }

  next();
};

export default paramsIdValidation;
