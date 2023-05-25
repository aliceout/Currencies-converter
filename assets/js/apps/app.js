/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Imports
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
import dataCalls from "./dataCalls.js";
import pushInDom from "./pushInDom.js";
import tools from "./tools.js";

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Défintiions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const app = {
    convert: async (event) => {
        event.preventDefault();                                                          // Désactivation du comportement par défaut au clic  

        try {
            const amount = document.getElementById("amount").value                                             // Récupération du montant à convertir
            const fromCurrencie = document.getElementById("fromCurrencie").value                               // Récupération de la devise initiale
            const toCurrencie = document.getElementById("toCurrencie").value                                    // Récupération de la devise de destination
            const currenciesList = JSON.parse(sessionStorage.getItem('currenciesList'));     // Récupération de la liste des devises dans le localStorage

            if (!amount || !fromCurrencie || !toCurrencie) {
                pushInDom.alertBanner("Please complete all fields");
                tools.reset();
            } else if (isNaN(amount)) {
                pushInDom.alertBanner("Please enter a valid amount")
            } else if (fromCurrencie.length > 3 || toCurrencie.length > 3) {
                pushInDom.alertBanner("Please enter a valid currency")
            } else if (fromCurrencie == toCurrencie) {
                pushInDom.alertBanner("Please choose two different currencies")
            } else {

                const json = await (dataCalls.getLatestRate(fromCurrencie, toCurrencie));        // Appel à l'API pour récupérer le taux de conversion 
                const rate = json.data[toCurrencie];                                             // Traitement de la réponse

                const result = tools.convertion(amount, rate);                                   // Conversion du montant

                const startCurrencie = currenciesList.data[fromCurrencie];                       // Récupération de la devise de départ
                const fromCurrencieName = startCurrencie.name                                                 // Récupération du nom de la devise de départ
                const fromCurrencieCode = startCurrencie.code                                             // Récupération du symbole de destination
                const fromCurrencieNameSymbol = startCurrencie.symbol                                             // Récupération du symbole de destination

                const finalCurrencie = currenciesList.data[toCurrencie];                         // Récupération de la devise de destination
                const toCurrencieName = finalCurrencie.name                                                 // Récupération du nom de la devise de départ
                const toCurrencieCode = finalCurrencie.code                                             // Récupération du symbole de destination
                const toCurrencieNameSymbol = finalCurrencie.symbol                                             // Récupération du symbole de destination

                const amounttoPush = tools.commafy(amount)                                       // Formatage du montant à afficher
                const resultToPush = tools.commafy(result)                                       // Formatage du resultat à afficher

                pushInDom.convertion(amounttoPush, fromCurrencieName, toCurrencieName, fromCurrencieCode, toCurrencieCode, resultToPush, fromCurrencieNameSymbol, toCurrencieNameSymbol, rate, fromCurrencie, toCurrencie);   // Affiche du resultat dans le DOM

                tools.reset();                                                                   // Reset les champs de saisie

            }
        } catch (error) {
            console.error(error);
        }
    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default app;