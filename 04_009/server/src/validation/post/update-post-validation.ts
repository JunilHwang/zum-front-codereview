import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { POST_ENTITY } from '@/constants/entity';
import { COMMON_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';
import { JOI_ERROR } from '@/constants/joi-error';

const updatePostValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    title: Joi.string().max(POST_ENTITY.titleMaxLength).required().empty('').messages({
      'string.max': JOI_ERROR.exceedMaxLengthTitle,
      'any.required': JOI_ERROR.fillTitle,
    }),
    content: Joi.string().allow(''),
  });

  const validationResult = schema.validate(req.body);
  const { error } = validationResult;

  if (error) {
    throw new CustomError({ ...COMMON_ERROR.invalidBody, customMessage: error.message });
  }

  next();
};

export default updatePostValidation;
