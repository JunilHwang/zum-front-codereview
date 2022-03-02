import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { POST_ENTITY } from '@/constants/entity';
import { COMMON_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';
import { JOI_ERROR } from '@/constants/joi-error';

const createPostValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    title: Joi.string().max(POST_ENTITY.titleMaxLength).required().empty('').messages({
      'string.max': JOI_ERROR.exceedMaxLengthTitle,
      'any.required': JOI_ERROR.fillTitle,
    }),
    content: Joi.string().allow(''),
    user: Joi.string().max(POST_ENTITY.userMaxLength).min(POST_ENTITY.userMinLength).required().empty('').messages({
      'string.max': JOI_ERROR.exceedMaxLengthUser,
      'string.min': JOI_ERROR.underMinLengthUser,
      'any.required': JOI_ERROR.fillUser,
    }),
  });

  const validationResult = schema.validate(req.body);
  const { error } = validationResult;

  if (error) {
    throw new CustomError({ ...COMMON_ERROR.invalidBody, customMessage: error.message });
  }

  next();
};

export default createPostValidation;
