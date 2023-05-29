/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Défintiions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const tools = {

    reset: () => {                                                 /// Reset des formulaires
        document.querySelector('form').reset();                    // Recherche et reset des formulaires
    },

    convertion: (amount, rate) => {                                /// Conversion du montant dans la devise demandée
        const calc = amount * rate;                                // Conversion du montant
        const result = calc.toFixed(2);                            // Formatage du resultat (deux chiffres max après la virgule)
        return result;                                             // Retour du resultat
    },

    commafy: (num) => {                                            /// Formatage du resultat (espaces entre chaque groupe de 3 chiffres)
        const str = num.toString().split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');                                      // Retour du resultat
    },

    formatDate: (dateObj) => {                                              /// Date du jour et formatage de la date
        const day = dateObj.getDate().toString().padStart(2, "0");          //  Récupération du jour
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); //  Récupération du jmois
        const result1 = `${dateObj.getUTCFullYear()}-${month}-${day}`;      //  Formatage de la date
        return [result1];                                                   // Retour du jour
    },


    removeWeekends: (dateObj) => {
        const dayOfWeek = dateObj.getDay();
        if (dayOfWeek === 0) { // Sunday
            dateObj.setDate(dateObj.getDate() - 2);
        } else if (dayOfWeek === 6) { // Saturday
            dateObj.setDate(dateObj.getDate() - 1);
        }
    },

    dateCalculator: () => {
        const today = new Date();
        const oneDayAgo = new Date(today);
        oneDayAgo.setDate(today.getDate() - 1);
        tools.removeWeekends(oneDayAgo);

        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        tools.removeWeekends(oneWeekAgo);

        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        tools.removeWeekends(oneMonthAgo);

        const sixMonthsAgo = new Date(today);
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        tools.removeWeekends(sixMonthsAgo);

        return [
            tools.formatDate(oneDayAgo),
            tools.formatDate(oneWeekAgo),
            tools.formatDate(oneMonthAgo),
            tools.formatDate(sixMonthsAgo),
        ];
    },

    moneyCodeByCountryCode: async (countryList) => {
        const responseCodes = await fetch('/data/countryMoney.json');
        const codes = await responseCodes.json();
        const currencies = []
        for (const iterator of countryList) {
            currencies.push(codes[iterator] || null);
        }
        return currencies;
    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default tools;


