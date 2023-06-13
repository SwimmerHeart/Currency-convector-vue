const baseUrl = 'https://www.cbr-xml-daily.ru/daily_json.js'

export const getExchangeRate = async () => {
    try {
        // const response = await fetch(`/api/daily_json.js`)
        const response = await fetch(baseUrl)
        return await response.json()
    }
    catch (e) {
        console.warn('Ошибка запроса к API', e)
    }
}