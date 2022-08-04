import chalk from "chalk";
import dedent from "dedent-js";

function printError(error) {
    console.log(chalk.bgRed("ERROR") + " " + error);
}

function printSuccess(msg) {
    console.log(chalk.bgGreen("SUCCESS") + " " + msg);
}

function printHelp() {
    console.log(
        dedent(`
        ${ chalk.bgCyan("HELP") }
        Без параметров - вывод погоды
        -h для вывода помощи
        -s [SITY] для установки города
        -t [API_KEY] для сохранения токена
        `)
    );
}

export { printError, printSuccess, printHelp };

