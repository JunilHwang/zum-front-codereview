import { Mutation, RankingContent, State } from "../types/types";

const mutations: Mutation = {
  updateBest(states: any, params: {[key: string]: Array<RankingContent>} ): State {
    states.best = params.data;
    return states;
  },
}

export default mutations;