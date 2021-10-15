
const {createSlice,configureStore  } = require('@reduxjs/toolkit')

const DivRanking = document.getElementById("#contentDiv")

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    isLoading: false,
    rankingData : [],
  },
  reducers: {
    setLoading: (state, action) => {
        state.isLoading = action.payload
    },
    incremented: state => {
      state.value += 1

    },
    decremented: state => {
      state.value -= 1
    },
    getRankingData: (state) => {
        const data = getRankingata();        
    },
    setRankingData: (state, action) => {
      state.rankingData = action.payload;
      setLoading("finished")
    }
  }
})


async function getRankingata() {
  fetch("http://localhost:3000/best")
  .then(res => res.json())
  .then(res => {
    store.dispatch(setRankingData(res))
  });

  }

export const { incremented, decremented, setLoading, getRankingData, setRankingData } = counterSlice.actions

export const store = configureStore({
  reducer: counterSlice.reducer
})
 
const render = () => {
    const state = store.getState();
    if(state.rankingData.length > 0) {
      DivRanking.innerText="API DONE"
    }
}

render()

store.subscribe(render);
