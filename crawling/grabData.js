const puppeteer = require("puppeteer"); 

module.exports.grabData = async(url) => {  
  const browser = await puppeteer.launch(); 
  const page = await browser.newPage(); 
  await page.goto(url);


  const reactHistory = await page.evaluate(() => {
    const tbodyChilds = document.querySelector(".article"); 
    return tbodyChilds.innerHTML;
  });

  await browser.close();

  return reactHistory
};

