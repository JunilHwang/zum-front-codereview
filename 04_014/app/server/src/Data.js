const ref = [0, 31, 59, 90, 120, 151, 182]
const  setData = (dataLength = 30) => {
  return new Array(dataLength).fill(0).map((ele, idx) => {
    let day = idx + 1 
    const mon = day <= 31 ? 1 : day <= 59 ? 2 : day <= 90 
      ? 3 : day <= 120 ? 4 : day <= 151 ? 5 : day <= 182 ? 6 : 7
    return {
      id : idx+1, 
      title : `title${idx+1}`,
      writer : `name${idx+1}`,
      content : `content${idx+1}`,
      date : `2021-${mon}-${day-ref[mon-1]}`
    }
  })
}
let totData = setData(200)

module.exports = totData

  

