/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Défintiions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const dataCalls = {

    apiEndpoint: "https://api.currencyapi.com/v3",
    currenciesList: "/data/currencies.json",

    getCurrenciesList: async () => {
        try {

            const response = await fetch(dataCalls.currenciesList);


            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            //! Si tout est ok
            const jsonObject = await response.json();
            return jsonObject;

        } catch (error) {
            console.error(`Could not get products: ${error}`);
        }
    },

    getOneCurrencie: async (currencie) => {
        try {

            const response = await fetch(dataCalls.currenciesList);


            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            //! Si tout est ok
            const jsonObject = await response.json();
            return jsonObject.data[currencie];

        } catch (error) {
            console.error(`Could not get products: ${error}`);
        }
        
    },

    getLatestRate: async (fromCurrencie, toCurrencie,) => {

        // // Envoyer les données à l'API
        const request = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'access-control-allow-origin': '*',
                "apikey": "0CtCXoxP5ANBmNjg6y9D9RdbN1h3fyQFrSRfODgW"
            },
        };

        try {

            const response = await fetch(`${dataCalls.apiEndpoint}/latest?base_currency=${fromCurrencie}&currencies=${toCurrencie}`, request);


            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            //! Si tout est ok
            const jsonObject = await response.json();
            return jsonObject;

        } catch (error) {
            console.error(`Could not get products: ${error}`);
        }
    }, 



    // const jsonObject = await response.json();
    // return jsonObject;
}

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default dataCalls;