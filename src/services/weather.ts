import axios from 'axios'
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from '../../config'

const weatherDetails = async (zip: string) => {
    const { data } = await axios.get(`${OPEN_WEATHER_BASE_URL}`, {
        params: {
            appid: OPEN_WEATHER_API_KEY,
            zip,
            units: 'imperial'
        },
        headers: {
        }
    })
    return data
}

export { weatherDetails }