export default class APIs{

    async getData(uri){
        try{
            const getData=await fetch(uri);
            const data=await getData.json();
            return data;
        }catch(error){
            alert("Data load failure");
            return console.log(error);
        }
    }

    async getDataText(uri){
        try{
            const getData=await fetch(uri);
            const data=await getData.text();
            return data;
        }catch(error){
            return console.log(error);
        }
    }
}