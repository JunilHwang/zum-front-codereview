import httpMocks from 'node-mocks-http';
import { NextFunction } from 'express';
import CustomError from '@/error/custom-error';
import { COMMON_ERROR } from '@/constants/error';
import { JOI_ERROR } from '@/constants/joi-error';
import createPostValidation from '../create-post-validation';

const next = jest.fn() as unknown as NextFunction;

describe('create post validation', () => {
  it('fill title', () => {
    const req = httpMocks.createRequest({ body: { title: '', content: '', user: '' } });
    const res = httpMocks.createResponse();
    try {
      createPostValidation(req, res, next);
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
    const req = httpMocks.createRequest({
      body: { title: 'ttttttttttttttttttttttttttttttttt', content: '', user: '닉네임' },
    });
    const res = httpMocks.createResponse();
    try {
      createPostValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage, customMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
        expect(customMessage).toBe(JOI_ERROR.exceedMaxLengthTitle);
      } else throw new Error('check joi test');
    }
  });
  it('fill user', () => {
    const req = httpMocks.createRequest({ body: { title: '제목', content: '', user: '' } });
    const res = httpMocks.createResponse();
    try {
      createPostValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage, customMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
        expect(customMessage).toBe(JOI_ERROR.fillUser);
      } else throw new Error('check joi test');
    }
  });
  it('max user', () => {
    const req = httpMocks.createRequest({ body: { title: '제목', content: '', user: 'uuuuuuuuuuuuuuuuuuuuuuuuu' } });
    const res = httpMocks.createResponse();
    try {
      createPostValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage, customMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
        expect(customMessage).toBe(JOI_ERROR.exceedMaxLengthUser);
      } else throw new Error('check joi test');
    }
  });
  it('min user', () => {
    const req = httpMocks.createRequest({ body: { title: '제목', content: '', user: 'u' } });
    const res = httpMocks.createResponse();
    try {
      createPostValidation(req, res, next);
    } catch (err) {
      if (err instanceof CustomError) {
        const { status, errorMessage, customMessage } = err;
        expect(status).toBe(400);
        expect(errorMessage).toBe(COMMON_ERROR.invalidBody.errorMessage);
        expect(customMessage).toBe(JOI_ERROR.underMinLengthUser);
      } else throw new Error('check joi test');
    }
  });
});
