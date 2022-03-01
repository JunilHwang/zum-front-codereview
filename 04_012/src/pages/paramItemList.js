const paramItemList = async (sortOption, searchOption) => {
    let listHtml = "";
    searchOption == "" ? searchOption = "null" :  searchOption

    const getData = async (sortOption, searchOption) => {
        let paramUrl = `http://localhost:1010/paramBoardData/${sortOption}/${searchOption}`          
        const res =  await fetch(paramUrl,{
            headers: {
                'Accept': 'application/json'
            },
        }).then((res)=>  {
            return res.json()
        }).then((data) => {
            return data;
        }).catch(error => console.log(error));

        return res;
    }    

    const data = await getData(sortOption, searchOption);

    if(data?.length > 0) {
        data.map((v) => {
            listHtml += `</br><div class="infoEv" id="infoEv${v.id}" value=${v.id}><li>${v.id}</li><li>${v.title}</li><li>${v.Writer}</li><li>${v.date}</li></div></br>`
        })
        return listHtml;
    } else {
        return `<p>검색어가 없습니다.</p>`
    }

    
}

export default paramItemList;