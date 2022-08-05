import axios from "axios";
import { getKeyValue, TOKEN_DICTINARY } from "./storage-service.js";

const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTINARY.token);
    if (!token) {
        throw new Error("Не задан ключ API. Задайте его через аргумент -t [API_KEY]");
    }

    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            appid: token,
            lang: "ru",
        }
    });

    return data;
}

export { getWeather };

// 31ecc9241559c6e280c850e4f343e8a9
