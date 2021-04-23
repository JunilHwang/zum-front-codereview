import axios from "axios"
import cheerio from "cheerio"

export const crawler = async (url) => {
    try {
        return await axios.get(url).then(html => {
            const $ = cheerio.load(html.data);
            const article_title = $(".article_title_wrap .main_title").text();
            const media_title = $(".article_title_wrap #btn_media").text();
            const content = $(".article_wrap .d_article").html();

            return { article_title, media_title, content }
        })

    } catch (error) {
        console.log(error);
        return error
    }
}