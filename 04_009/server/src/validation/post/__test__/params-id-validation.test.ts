import httpMocks from 'node-mocks-http';
import { NextFunction } from 'express';
import CustomError from '@/error/custom-error';
import { COMMON_ERROR } from '@/constants/error';
import paramsIdValidation from '../params-id-validation';

const next = jest.fn() as unknown as NextFunction;

describe('parmas id validation', () => {
  it('fill id', () => {
    const req = httpMocks.createRequest({ params: { id: '' } });
    const res = httpMocks.createResponse();
    try {
      paramsIdValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
      } else throw new Error('check joi test');
    }
  });
  it('id is not number', () => {
    const req = httpMocks.createRequest({ params: { id: 'a' } });
    const res = httpMocks.createResponse();
    try {
      paramsIdValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
      } else throw new Error('check joi test');
    }
  });
  it('id is not integer', () => {
    const req = httpMocks.createRequest({ params: { id: '1.1' } });
    const res = httpMocks.createResponse();
    try {
      paramsIdValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
      } else throw new Error('check joi test');
    }
  });
  it('id is not positive', () => {
    const req = httpMocks.createRequest({ params: { id: '-1' } });
    const res = httpMocks.createResponse();
    try {
      paramsIdValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
      } else throw new Error('check joi test');
    }
  });
});
