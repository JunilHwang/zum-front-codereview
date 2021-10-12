  const express = require("express");
const path = require("path");
const { data } = require("./data.json");
const axios = require("axios");
const cheerio = require("cheerio");


const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let jsonData = data;

const getHtml = async (url, category) => {
 
};

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);


app.get("/ranking_data", (req, res) => {
  return res.status(200).send({life : data.life.slice(0,4), food :data.food.slice(0,4), travel : data.travel.slice(0,4), culture : data.culture.slice(0,4), ranking:data.ranking });
});

app.get("/life_data", (req, res) => {
     return res.status(200).send(data.life);
   });

   app.get("/food_data", (req, res) => {
     return res.status(200).send(data.food);
   });

   app.get("/travel_data", (req, res) => {
     return res.status(200).send(data.travel);
   });

   app.get("/culture_data", (req, res) => {
     return res.status(200).send(data.culture);
   });


   app.post("/like_data", async(req, res) => {
       let result =[];
       req.body.map(el =>{
           let array = el.split('/')
        let category = array[1]
        let idx = array[2]
        let findData = data[category].find(el=> el.idx === Number(idx))
        findData.category = category
        result.push(findData)
       })
     return res.status(200).send(result);
   });


   app.post("/detail", async(req,res)=>{
     let category = req.body.category
     let idx = req.body.idx
    let filteredData = data[category].filter(el => el.idx === Number(idx))
    let $pTag = [];
    let $imgTag = [];
    try {
      return await axios.get(filteredData[0].url).then((data) => {
        const $ = cheerio.load(data.data);
        $("div.d_article>p").each((index, item) => {
          if (item.children[0] !== undefined) {
            if (item.children[0].data !== undefined) {
            $pTag.push(item.children[0].data)
            }
          }
        });
        $("table.img_block>tbody>tr>td>img").each((index, item) => {
          if (item.attribs.src !== undefined) {
              $imgTag.push(item.attribs.src);

            }else{
              $imgTag.push(item.attribs["data-src"]);

            }
        });
       
        

       filteredData[0].zumContent = $pTag
       filteredData[0].zumImg = $imgTag
       return res.status(200).send(filteredData);
      });
     
    } catch (error) {
      console.error(error);
    }
   

   })


app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});




app.listen( 8080, () => console.log("Server running..."));
