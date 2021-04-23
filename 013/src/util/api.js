const BASIC_URL = "http://localhost:8000/api"
const BEST = "BEST"

const fetchWithTimeout = async (resource) => {
    const timeout = 50000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...timeout,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
}

const request = async url => {
    try {
        const response = await fetchWithTimeout(url);
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            const errorData = await response.json();
            throw errorData;
        }
    } catch (error) {
        throw {
            message: error.message,
            status: error.status
        }
    }
}
const fetchAllItem = async () => {
    const tempDatas = []
    for (const keyword of ["LIFE", "FOOD", "TRIP", "CULTURE"]) {
        const data = await request(`${BASIC_URL}/content/${keyword}`)
        tempDatas.push(...data);
    }
    const bestData = await request(`${BASIC_URL}/${BEST}`)
    tempDatas.push(...bestData);

    return tempDatas;
}
const api = {
    getContentByUrl: async (url) => {
        try {
            const contents = await request(`${BASIC_URL}/detail/${url}`);
            return {
                isError: false,
                data: contents
            }
        } catch (error) {
            return {
                isError: true,
                data: error
            }
        }
    },
    getDataByIdxs: async (items) => {
        const datas = [];
        let isSearchHomeDatas = false
        let tempDatas = []
        try {
            for (const item of items) {
                const { idx, link = "home" } = item;
                if (link === "home") {
                    if (!isSearchHomeDatas) {
                        tempDatas = await fetchAllItem();
                        isSearchHomeDatas = true;
                    }
                    const findIdx = tempDatas.findIndex((data) => data["idx"] === Number(idx));
                    datas.push(tempDatas[findIdx]);
                } else {
                    const data = await request(`${BASIC_URL}/content/${link}/${idx}`);
                    datas.push(data);

                }
            }
            return {
                isError: false,
                data: datas
            }
        } catch (error) {
            return {
                isError: true,
                data: error
            }
        }
    },
    getDatasByCategory: async keyword => {
        try {
            const datas = await request(`${BASIC_URL}/content/${keyword}`);
            return {
                isError: false,
                data: datas
            }
        } catch (error) {
            return {
                isError: true,
                data: error
            }
        }
    },
    getMainDatas: async () => {
        const datas = [];
        try {
            for (const keyword of ["LIFE", "FOOD", "TRIP", "CULTURE"]) {
                const data = await request(`${BASIC_URL}/content/${keyword}`)
                const result = data.splice(0, 4);
                datas.push(...result);
            }
            return {
                isError: false,
                data: datas
            }
        } catch (error) {
            return {
                isError: true,
                data: error
            }
        }
    },
    getBestDatas: async () => {
        const datas = [];

        try {
            const data = await request(`${BASIC_URL}/${BEST}`)
            const result = data.splice(0, 12);
            datas.push(...result);

            return {
                isError: false,
                data: datas
            }
        } catch (error) {
            return {
                isError: true,
                data: error
            }
        }
    }
};

export default api;