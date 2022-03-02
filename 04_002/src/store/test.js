// 먼저 초기 state를 가져온다.(나중에)
// state가 변경된걸 어떻게 알려주지???????

// let data = { a: 1, b: 2 };


// const selector = (newInput = {}) => { //getState()
//   // console.log("newData", newData);
//   // const newData = {a: 2, b:4};
//   const newData = {...data, ...newInput};
//   data = {...newData};
//   return data;
//   // return {...data, ...newData};
// }

// const plusFn = (payload) => {
//   let result = data.a + data.b + payload ;
//   // console.log(selector({a:result}))
//   selector({a:result});
// }

// const dispatch = (action) => {
//   // type: 하고 싶은 동작
//   // payload: 전달하고 싶은 데이터 
//   const { type, payload } = action;

//   if (type == 'plus'){
//     plusFn(payload);
//   }else{
//     console.log("안 더할게요 ");
//     return 1;
//   }
// }



// export {selector, dispatch};