#!/usr/bin/env mode
import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from "./services/log-service.js";
import { getKeyValue, saveKeyValue } from "./services/storage-service.js";
import { getWeather } from "./services/api-service.js";
import dedent from "dedent-js";

async function saveKey(key, value, errmsg) {
    if (!key.length) {
        printError(errmsg);
    }
    try {
        await saveKeyValue(key, value);
        printSuccess("Данные успешно сохранены!");
    }
    catch(e) {
        printError(e);
    }
}

const getForecast = async () => {
    try {
        const data = await getWeather(process.env.CITY ?? await getKeyValue("city"));
        const { main: { temp, humidity }, weather: [{ description }], name  } = data;
        printSuccess(
            dedent(
                `
                    Город: ${name}
                    Температура: ${Math.floor(temp-273.15)}°
                    Погода: ${ description ? description : "Нет данных" }
                    Влажность: ${humidity}
                `
            )
        )
    }
    catch (e) {
        if (e?.response?.status == 400) {
            printError("Не верно указан токен или город");
        }
        else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    
    if (args.h) {
        printHelp();
    }

    if (args.s) {
        return saveKey("city" ,args.s , "Не задан город. Задайте его через аргумент -s [CITY]");
    }

    if (args.t) {
        return saveKey("token" ,args.t , "Не задан ключ API. Задайте его через аргумент -t [API_KEY]");
    }

    getForecast();

}

initCLI();
