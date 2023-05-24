/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Défintiions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const apiCalls = {

    apiEndpoint: "https://api.currencyapi.com/v3",

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

            const response = await fetch(`${apiCalls.apiEndpoint}/latest?base_currency=${fromCurrencie}&currencies=${toCurrencie}`, request);


            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const jsonObject = await response.json();
            return jsonObject;

        } catch (error) {
            console.error(`Could not get products: ${error}`);
        }
    }

    // const jsonObject = await response.json();
    // return jsonObject;
}

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default apiCalls;