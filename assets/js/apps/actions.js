/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Imports
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
import dataCalls from "./dataCalls.js";
import pushInDom from "./pushInDom.js";

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Défintiions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const actions = {
    convert: async (event) => {
        event.preventDefault();

        const dataFd = new FormData(document.querySelector("#convert_section form"));

        const amount = dataFd.get("amount")
        const fromCurrencie = dataFd.get("fromCurrencie")
        const toCurrencie = dataFd.get("toCurrencie")

        let promise = dataCalls.getLatestRate(fromCurrencie, toCurrencie);
        const json = await (promise);

        const rate = json.data[dataFd.get("toCurrencie")];

        const calc = amount * rate
        const result = calc.toFixed(2)

        promise = dataCalls.getOneCurrencie(fromCurrencie)
        const startCurrencie = await (promise);
        const name = startCurrencie.name

        promise = dataCalls.getOneCurrencie(toCurrencie)
        const finalCurrencie = await (promise);
        const symbol = finalCurrencie.symbol

        const amounttoDisplay = actions.commafy(amount)
        const resultToDisplay = actions.commafy(result)

        pushInDom.convertion(amounttoDisplay, name, resultToDisplay, symbol, rate, fromCurrencie, toCurrencie);                                    
    },

    commafy: ( num ) => {
        const str = num.toString().split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default actions;