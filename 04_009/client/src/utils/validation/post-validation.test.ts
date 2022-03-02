import { POST_ERROR } from '@/constants/validaiton';
import { createValidation, updateValidation } from './post-validation';

describe('post validation', () => {
  describe('create', () => {
    it('should success', () => {
      const title = '제목';
      const user = '유저';
      expect(createValidation(title, user)).toBeTruthy();
    });
    it('fill titlle', () => {
      const title = '';
      const user = 'user';
      expect(createValidation(title, user)).toBe(POST_ERROR.fillTitle);
    });
    it('fill user', () => {
      const title = '제목';
      const user = '';
      expect(createValidation(title, user)).toBe(POST_ERROR.fillUser);
    });
    it('exceed max length titlle', () => {
      const title = 'sssssssssssssssssssssssssssssssssssssssssss';
      const user = 'user';
      expect(createValidation(title, user)).toBe(POST_ERROR.exceedMaxLengthTitle);
    });
    it('under min length user', () => {
      const title = '제목';
      const user = 'u';
      expect(createValidation(title, user)).toBe(POST_ERROR.underMinLengthUser);
    });
    it('exceed max length user', () => {
      const title = '제목';
      const user = 'uuuuuuuuuuuuuuuuuuuuuuuuuuuu';
      expect(createValidation(title, user)).toBe(POST_ERROR.exceedMaxLengthUser);
    });
  });

  describe('update', () => {
    it('should success', () => {
      const title = '제목';
      expect(updateValidation(title)).toBeTruthy();
    });
    it('fill titlle', () => {
      const title = '';
      expect(updateValidation(title)).toBe(POST_ERROR.fillTitle);
    });
    it('exceed max length titlle', () => {
      const title = 'sssssssssssssssssssssssssssssssssssssssssss';
      expect(updateValidation(title)).toBe(POST_ERROR.exceedMaxLengthTitle);
    });
  });
});
