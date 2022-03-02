export const sanitize = (input: any): string => {
  const result: string = input.replace(/[\/\'<>\`\"\;\\]/g, '');
  return result;
};

export const MAGICNUM = {
  MAX_USERNAME_LENGTH: 32,
  MAX_ARTICLENAME_LENGTH: 128,
  MAX_ARTICLETEXT_LENGTH: 1048576,
  MAX_ARTICLETEXT_QUERY_LENGTH: 128,
  MAX_SAFE_QUERY_LENGTH: Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER)),
};

export const cache = new Map();
