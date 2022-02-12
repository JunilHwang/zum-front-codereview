import httpMocks from 'node-mocks-http';
import { NextFunction } from 'express';
import CustomError from '@/error/custom-error';
import { COMMON_ERROR } from '@/constants/error';
import { JOI_ERROR } from '@/constants/joi-error';
import updatePostValidation from '../update-post-validation';

const next = jest.fn() as unknown as NextFunction;

describe('update post validation', () => {
  it('fill title', () => {
    const req = httpMocks.createRequest({ body: { title: '', content: '' } });
    const res = httpMocks.createResponse();
    try {
      updatePostValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage, customMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
        expect(customMessage).toBe(JOI_ERROR.fillTitle);
      } else throw new Error('check joi test');
    }
  });
  it('max title', () => {
    const req = httpMocks.createRequest({ body: { title: 'tttttttttttttttttttttttttttttttttttttttttt', content: '' } });
    const res = httpMocks.createResponse();
    try {
      updatePostValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage, customMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
        expect(customMessage).toBe(JOI_ERROR.exceedMaxLengthTitle);
      } else throw new Error('check joi test');
    }
  });
});
