import list from './list';
import get from './get';
import post from './post';
import put from './put';
import del from './del';

const controller = {
  getList: list,
  getOne: get,
  write: post,
  edit: put,
  delete: del,
};

export default controller;
