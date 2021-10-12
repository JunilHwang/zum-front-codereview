const DETAIL_API_END_POINT = "http://localhost:3000/detail"
const RANK_API_END_POINT = "http://localhost:3000/api/rank"
const LIFE_API_END_POINT = "http://localhost:3000/api/life"
const FOOD_API_END_POINT = "http://localhost:3000/api/food"
const TRAVEL_API_END_POINT = "http://localhost:3000/api/travel"
const CULTURE_API_END_POINT = "http://localhost:3000/api/culture"

export const rankRequest = async () => {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(`${RANK_API_END_POINT}`, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (!res.ok) {
            throw new Error("Server state Err")
        }
        return await res.json()
    } catch(e) {
        throw new Error(`Error ${e.message}`)
    }
}

export const lifeRequest = async () => {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(`${LIFE_API_END_POINT}`, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (!res.ok) {
            throw new Error("Server state Err")
        }
        return await res.json()
    } catch(e) {
        throw new Error(`Error ${e.message}`)
    }
}

export const foodRequest = async () => {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(`${FOOD_API_END_POINT}`, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (!res.ok) {
            throw new Error("Server state Err")
        }
        return await res.json()
    } catch(e) {
        throw new Error(`Error ${e.message}`)
    }
}

export const travelRequest = async () => {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(`${TRAVEL_API_END_POINT}`, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (!res.ok) {
            throw new Error("Server state Err")
        }
        return await res.json()
    } catch(e) {
        throw new Error(`Error ${e.message}`)
    }
}

export const cultureRequest = async () => {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(`${CULTURE_API_END_POINT}`, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (!res.ok) {
            throw new Error("Server state Err")
        }
        return await res.json()
    } catch(e) {
        throw new Error(`Error ${e.message}`)
    }
}

export const scrapRequest = async (category, id) => {
    try {
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(`${DETAIL_API_END_POINT}/${category}/${id}`)
        clearTimeout(timeoutId)

        if (!res.ok) {
            throw new Error("Server state Err")
        }
        return await res.json()
    } catch(e) {
        throw new Error(`Error ${e.message}`)
    }
}