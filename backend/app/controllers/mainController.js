/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Définitions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const mainController = {
    getCurrenciesList: async (req, res) => {
        const request = {                                           // Requête
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'access-control-allow-origin': '*',
                "apikey": process.env.apiKey
            },
        };
        try {
            console.log(mainController.request);
            const response = await fetch(`${process.env.apiEndpoint}/currencies`, request);
            if (!response.ok) {                                     // Si erreur
                throw new Error(`HTTP error: ${response.status}`);  // On affiche l'erreur
            }
            // Si tout est ok
            const data = await response.json();
            res.status(200).json(data);            // On renvoie la réponse avec un code 200 : OK

        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },

    getLatestRate: async (req, res) => {
        const request = {                                           // Requête
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'access-control-allow-origin': '*',
                "apikey": process.env.apiKey
            },
        };
        try {
            const response = await fetch(`${process.env.apiEndpoint}/latest?base_currency=${req.params.fromCurrencie}&currencies=${req.params.toCurrencie}`, request);  // Fetch

            if (!response.ok) {                                     // Si erreur
                throw new Error(`HTTP error: ${response.status}`);  // On affiche l'erreur
            }
            // Si tout est ok
            const data = await response.json();
            res.status(200).json(data);            // On renvoie la réponse avec un code 200 : OK

        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },

    history_rates: async (req, res) => {
        const request = {                                           // Requête
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'access-control-allow-origin': '*',
                "apikey": process.env.apiKey
            },
        };
        try {
            const response = await fetch(`${process.env.apiEndpoint}/historical?currencies=${req.params.currencies}&base_currency=${req.params.base_currency}&date_from=${req.params.dateFrom}&date_to=${req.params.dateTo}`, request);  // Fetch 

            if (!response.ok) {                                     // Si erreur
                throw new Error(`HTTP error: ${response.status}`);  // On affiche l'erreur
            }
            // Si tout est ok
            const data = await response.json();
            res.status(200).json(data);            // On renvoie la réponse avec un code 200 : OK
            console.log("history_rates : ", data);

        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },
}

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export { mainController };