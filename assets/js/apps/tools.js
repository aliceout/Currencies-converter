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
    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default tools;