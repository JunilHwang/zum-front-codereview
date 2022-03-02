import { POST_ERROR } from '@/constants/validaiton';
import { POST_ENTITY } from '@/constants/entity/post';

const createValidation = (title: string, user: string) => {
  if (!title) return POST_ERROR.fillTitle;
  if (title.length > POST_ENTITY.titleMaxLength) return POST_ERROR.exceedMaxLengthTitle;
  if (!user) return POST_ERROR.fillUser;
  if (user.length > POST_ENTITY.userMaxLength) return POST_ERROR.exceedMaxLengthUser;
  if (user.length < POST_ENTITY.userMinLength) return POST_ERROR.underMinLengthUser;
  return true;
};

const updateValidation = (title: string) => {
  if (!title) return POST_ERROR.fillTitle;
  if (title.length > POST_ENTITY.titleMaxLength) return POST_ERROR.exceedMaxLengthTitle;
  return true;
};

export { createValidation, updateValidation };
