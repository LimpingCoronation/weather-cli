#!/usr/bin/env mode
import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from "./services/log-service.js";
import { saveKeyValue, getKeyValue } from "./services/storage-service.js";

async function saveToken(key) {
    try {
        await saveKeyValue("token", key);
        printSuccess("Данные успешно сохранены!");
    }
    catch(e) {
        printError(e);
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    
    if (args.h) {
        printHelp();
    }

    if (args.t) {
        saveToken(args.t)
    }

}

initCLI();
