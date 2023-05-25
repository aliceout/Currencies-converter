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
            const dataFd = new FormData(document.querySelector("#convert_section form"));    // Récupération des donnée du formulaire
            const amount = dataFd.get("amount")                                              // Récupération du montant à convertir
            const fromCurrencie = dataFd.get("fromCurrencie")                                // Récupération de la devise initiale
            const toCurrencie = dataFd.get("toCurrencie")                                    // Récupération de la devise de destination
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
                // TODO : Trouver un moyen de vérifier si les devises entrées se trouvent dans la liste
            } else {

                const json = await (dataCalls.getLatestRate(fromCurrencie, toCurrencie));        // Appel à l'API pour récupérer le taux de conversion 
                const rate = json.data[toCurrencie];                                             // Traitement de la réponse

                const result = tools.convertion(amount, rate);                                   // Conversion du montant

                const startCurrencie = currenciesList.data[fromCurrencie];                       // Récupération de la devise de départ
                const name = startCurrencie.name                                                 // Récupération du nom de la devise de départ

                const finalCurrencie = currenciesList.data[toCurrencie];                         // Récupération de la devise de destination
                const symbol = finalCurrencie.symbol                                             // Récupération du symbole de destination

                const amounttoPush = tools.commafy(amount)                                       // Formatage du montant à afficher
                const resultToPush = tools.commafy(result)                                       // Formatage du resultat à afficher

                pushInDom.convertion(amounttoPush, name, resultToPush, symbol, rate, fromCurrencie, toCurrencie);   // Affiche du resultat dans le DOM

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