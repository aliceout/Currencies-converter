/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Imports
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
import dataCalls from "./dataCalls.js";
import interactions from "./interactions.js";
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

        const rate = json.data[dataFd.get("toCurrencie")].value;

        const calc = amount / rate
        const result = calc.toFixed(2)

        promise = dataCalls.getOneCurrencie(toCurrencie)
        const finalCurrencie = await (promise);

        const symbol = finalCurrencie.symbol

        pushInDom.applyRate(result, symbol);                                    



    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default actions;