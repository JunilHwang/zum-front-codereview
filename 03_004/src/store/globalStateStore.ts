import Store from "../core/store";
import states from './states';
import mutations from './mutations';

const gss = new Store({
  states,
  mutations,
});

export default gss;