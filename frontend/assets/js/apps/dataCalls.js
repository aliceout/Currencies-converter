/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Défintiions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const dataCalls = {

    apiEndpoint: "https://currencies.backlice.dev",                  // URL de l'API

    getCurrenciesList: async () => {                                /// Fonction pour récupérer la liste des devises
        try {
            const response = await fetch(`${dataCalls.apiEndpoint}/currencies`);  // Fetch

            if (!response.ok) {                                     // Si erreur
                throw new Error(`HTTP error: ${response.status}`);  // On affiche l'erreur
            }

            // Si tout est ok
            const jsonObject = await response.json();               // On récupère la liste des devises
            sessionStorage.setItem('currenciesList', JSON.stringify(jsonObject));   // On stocke la liste des devises dans le localStorage
            return jsonObject;                                      // On retourne la liste des devises

        } catch (error) {                                           // Si erreur
            console.error(`Could not get products: ${error}`);      // On affiche l'erreur
        }
    },

    getLatestRate: async (fromCurrencie, toCurrencie) => {         /// Fonction pour récupérer la liste des devises

        try {
            const response = await fetch(`${dataCalls.apiEndpoint}/latest/base_currency/${fromCurrencie}/currencies/${toCurrencie}`);  // Fetch

            if (!response.ok) {                                      // Si erreur
                throw new Error(`HTTP error: ${response.status}`);   // On affiche l'erreur
            }
            // Si tout est ok
            const jsonObject = await response.json();                // On récupère le taux
            sessionStorage.setItem('todayRate', JSON.stringify(jsonObject));   // On stocke la liste des devises dans le localStorage
            return jsonObject;                                       // On retourne le taux
        } catch (error) {                                            // Si erreur
            console.error(`Could not get products: ${error}`);       // On affiche l'erreur
        }
    },

    history_rates: async (base_currency, currencies, dateFrom, dateTo) => {

        try {
            const response = await fetch(`${dataCalls.apiEndpoint}/historical/currencies/${currencies}/base_currency/${base_currency}/date_from/${dateFrom}/date_to/${dateTo}`);  // Fetch  
            console.log(`${dataCalls.apiEndpoint}/historical/currencies/${currencies}/base_currency/${base_currency}/date_from/${dateFrom}/date_to/${dateTo}`);

            if (!response.ok) {                                      // Si erreur
                throw new Error(`HTTP error: ${response.status}`);   // On affiche l'erreur
            }
            // Si tout est ok
            const jsonObject = await response.json();                // On récupère le taux               
            return jsonObject;                                       // On retourne le taux

        } catch (error) {                                            // Si erreur
            console.error(`Could not get products: ${error}`);       // On affiche l'erreur
        }
    }
}

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default dataCalls;
