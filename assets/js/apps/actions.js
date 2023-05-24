
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Imports
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
import apiCalls from "./apiCalls.js";
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


        const promise = apiCalls.getLatestRate(fromCurrencie, toCurrencie);
        const json = await (promise);

        const rate = json.data[dataFd.get("toCurrencie")].value;

        const calc = amount / rate
        const result = calc.toFixed(2)

        // const symbol = jsonObject.value.data[dataFd.get("toCurrencie")].symbol


        pushInDom.applyRate(result);                                    


        interactions.reset();
    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default actions;