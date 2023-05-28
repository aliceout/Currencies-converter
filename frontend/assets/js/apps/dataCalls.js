/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Défintiions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const dataCalls = {

    apiEndpoint: "https://api.freecurrencyapi.com/v1",              // URL de l'API
    apiKey: "gCgc4awk0mnQccYJLCQxSGndImP2ie8EKdGTFrb5",             // Clé API

    getCurrenciesList: async () => {                                /// Fonction pour récupérer la liste des devises

        const request = {                                           // Requête
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'access-control-allow-origin': '*',
                "apikey": dataCalls.apiKey
            },
        };
        try {
            const response = await fetch(`${dataCalls.apiEndpoint}/currencies`, request);  // Fetch

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


    getLatestRate: async (fromCurrencie, toCurrencie,) => {         /// Fonction pour récupérer la liste des devises

        const request = {                                           // Requête
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'access-control-allow-origin': '*',
                "apikey": dataCalls.apiKey
            },
        };
        try {
            const response = await fetch(`${dataCalls.apiEndpoint}/latest?base_currency=${fromCurrencie}&currencies=${toCurrencie}`, request);  // Fetch

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


    history_rates: async (base_currency, currencies, dateFrom, dateTo, localStoName) => {
        const request = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'access-control-allow-origin': '*',
                "apikey": dataCalls.apiKey
            },
        };
        try {
            const response = await fetch(`${dataCalls.apiEndpoint}/historical?currencies=${currencies}&base_currency=${base_currency}&date_from=${dateFrom}&date_to=${dateTo}`, request);  // Fetch  

            if (!response.ok) {                                      // Si erreur
                throw new Error(`HTTP error: ${response.status}`);   // On affiche l'erreur
            }
            // Si tout est ok
            const jsonObject = await response.json();                // On récupère le taux               
            return jsonObject;

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