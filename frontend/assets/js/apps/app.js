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
        event.preventDefault();                                                             // Désactivation du comportement par défaut au clic  

        try {

            const amount = document.getElementById("amount").value                          // Récupération du montant à convertir
            const fromCurrencie = document.getElementById("fromCurrencie").value            // Récupération de la devise initiale
            const toCurrencie = document.getElementById("toCurrencie").value                // Récupération de la devise de destination
            const currenciesList = JSON.parse(sessionStorage.getItem('currenciesList'));    // Récupération de la liste des devises dans le localStorage

            if (!amount || !fromCurrencie || !toCurrencie) {                                // On vérifie si les champs sont vides
                pushInDom.alertBanner("Please complete all fields");                        // Si oui, on affiche un message
            } else if (isNaN(amount)) {                                                     // On vérifie qu'un nombre est bien entré dans l'espace prévue pour
                pushInDom.alertBanner("Please enter a valid amount")                        // Si non, on affiche un message
            } else if (fromCurrencie.length > 3 || toCurrencie.length > 3) {                // On vérifie que la valeur du code devise est bien de trois (standard)
                pushInDom.alertBanner("Please enter a valid currency")                      // Si non, on affiche un message
            } else if (fromCurrencie == toCurrencie) {                                      // On vérifie que les deux devises sont différentes
                pushInDom.alertBanner("Please choose two different currencies")             // Si non, on affiche un message

            } else {                                                                        // Si tout est OK
                const json = await (dataCalls.getLatestRate(fromCurrencie, toCurrencie));   // Appel à l'API pour récupérer le taux de conversion 
                const rate = json.data[toCurrencie];                                        // Traitement de la réponse

                const result = tools.convertion(amount, rate);                              // Conversion du montant

                const startCurrencie = currenciesList.data[fromCurrencie];                  // Récupération de la devise de départ
                const Cu1Name = startCurrencie.name                                         // Récupération du nom de la devise de départ
                const Cu1Code = startCurrencie.code                                         // Récupération du symbole de destination
                const Cu1NameSymbol = startCurrencie.symbol                                 // Récupération du symbole de destination

                const finalCurrencie = currenciesList.data[toCurrencie];                    // Récupération de la devise de destination
                const Cu2Name = finalCurrencie.name                                         // Récupération du nom de la devise de départ
                const Cu2Code = finalCurrencie.code                                         // Récupération du symbole de destination
                const Cu2NameSymbol = finalCurrencie.symbol                                 // Récupération du symbole de destination

                const amounttoPush = tools.commafy(amount)                                  // Formatage du montant à afficher
                const resultToPush = tools.commafy(result)                                  // Formatage du resultat à afficher

                pushInDom.convertion(amounttoPush, Cu1Name, Cu2Name, Cu1Code, Cu2Code, resultToPush, Cu1NameSymbol, Cu2NameSymbol, rate, fromCurrencie, toCurrencie);   // On active la fonction de push dans le DOM en envoyant les valeurs

                tools.reset();                                                              // Reset les champs de saisie

            }
        } catch (error) {                                                                   // Si une erreur est survenue
            console.error(error);                                                           // On affiche l'erreur
        }
    },

    history: async (event) => {
        document.querySelectorAll(".generated-histo ").forEach(element => element.remove());

        const base_currency = event.target.value;
        const countryList =  ["US","EU","CH","GB","CN","IN", "RU"]                   // Code pays en base ISO2              
        const promise = tools.moneyCodeByCountryCode(countryList);
        const currencies = await (promise);    
        const dates = tools.dateCalculator();
        const todayDate = (tools.formatDate(new Date()));

        try {
            const todayRate = await (dataCalls.getLatestRate(base_currency, currencies));
            let historyRates = [];

            for (const element of dates) {
                const history = await (dataCalls.history_rates(base_currency, currencies.toString(), element, element, element));
                historyRates.push(history.data)
            };

            pushInDom.history(currencies.reverse(), countryList.reverse(), todayRate, dates, historyRates);

        } catch (error) {                                                                   // Si une erreur est survenue
            console.error(error);                                                           // On affiche l'erreur
        }
    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default app;
