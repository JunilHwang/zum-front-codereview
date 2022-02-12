import { POST_ENTITY } from './entity';

export const JOI_ERROR = {
  exceedMaxLengthTitle: `제목은 ${POST_ENTITY.titleMaxLength}자를 넘길 수 없습니다`,
  fillTitle: `제목을 입력해주세요`,
  exceedMaxLengthUser: `닉네임은 ${POST_ENTITY.userMaxLength}자를 넘길 수 없습니다`,
  underMinLengthUser: `닉네임은 ${POST_ENTITY.userMinLength}자 이상 입력해야 합니다`,
  fillUser: `닉네임을 입력해주세요`,
};
