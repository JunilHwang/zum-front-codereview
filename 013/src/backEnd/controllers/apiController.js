import BEST from "./JSON/BEST.json";
import CULTURE from "./JSON/CULTURE.json";
import FOOD from "./JSON/FOOD.json";
import LIFE from "./JSON/LIFE.json";
import TRIP from "./JSON/TRIP.json";
import { crawler } from "../crawler";
import { RetrieveKey, StoreKey } from "../cache";

const getResultByCategory = (category) => {
    const results = { FOOD, LIFE, TRIP, CULTURE }[category];
    if (!results) return {};
    return results
}
const getIndexByIdx = (datas, idx) => {
    return datas.findIndex((data) => data["idx"] === Number(idx));
}
export const getBest = async (_, res) => {
    try {
        let result = RetrieveKey("BEST");

        if (result === undefined) {
            result = BEST;
            StoreKey("BEST", result);
        }

        return res.json(result);
    } catch (error) {
        return res.status(404).send({ message: "에러 발생", status: "404" })
    }
}

export const getContentByCategory = async (req, res) => {
    try {
        let { category } = req.params;
        category = category.toUpperCase();

        let result = RetrieveKey(category);

        if (result === undefined) {
            result = getResultByCategory(category);
            StoreKey(category, result);
        }
        return res.json(result);

    } catch (error) {
        return res.status(404).send({ message: "에러 발생", status: "404" })
    }
}
export const getContentByIdx = async (req, res) => {
    try {
        let { params: { category, idx } } = req
        category = category.toUpperCase();

        let result = RetrieveKey(category);

        if (result === undefined) {
            result = getResultByCategory(category);
            StoreKey(category, result);
        }

        const resultIdx = getIndexByIdx(result, idx);

        if (resultIdx === -1) throw Error()

        return res.json(result[resultIdx]);

    } catch (error) {
        return res.status(404).send({ message: "해당 인덱스에 해당하는 데이터가 존재하지 않습니다.", status: "404" })
    }
}
export const getDetailByUrl = async (req, res) => {
    try {
        const { url } = req.params;
        const decodeUrl = decodeURIComponent(url);
        let result = RetrieveKey(decodeUrl);

        if (result === undefined) {
            result = await crawler(decodeUrl);
            if (result["article_title"] === "") {
                throw Error();
            }
            StoreKey(decodeUrl, result);
        }

        return res.json(result);
    } catch (error) {
        return res.status(404).send({ message: "컨텐츠를 불러올 수 없습니다.", status: "404" })
    }
}
