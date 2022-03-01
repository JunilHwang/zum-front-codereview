const list = async () => {
    let listHtml = "";

    const getData = async () => {
        const res =  await fetch('http://localhost:1010/boardData',{
            headers: {
                'Accept': 'application/json'
            },
        }).then((res)=>  {
            return res.json()
        }).then((data) => {
            return data;
        }).catch(error => console.log(error));

        console.log(res)
        return res;
    }    

    const data = await getData();

    if(data?.length > 0) {
        data.map((v) => {
            listHtml += `</br><div class="infoEv" id="infoEv${v.id}" value=${v.id}><li>${v.id}</li><li>${v.title}</li><li>${v.Writer}</li><li>${v.date}</li></div></br>`
        })
        return listHtml;
    }

    
}

export default list;