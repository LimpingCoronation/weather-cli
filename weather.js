#!/usr/bin/env mode
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
    const args = getArgs(process.argv);
    console.log(args);
}

initCLI();
