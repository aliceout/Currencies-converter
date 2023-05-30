/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Imports
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
import dataCalls from "./dataCalls.js";
import tools from "./tools.js";

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Défintiions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const pushInDom = {

    createList: async () => {                                               /// Création de la liste des devises convertibles

        const promise = dataCalls.getCurrenciesList();                      // On récupère les données dans l'API
        const list = await (promise);                                       // On attend la réponse
        const data = list.data                                              // On stocke la réponse

        const datalist = document.querySelectorAll(".datalist");
        datalist.forEach(element => {                                       // Pour chacune des datalist
            for (const property in data) {                                  // Pour chaque devise, on créer une option dans la liste
                const option = document.createElement('option');            // On sélectionne l'élement qu'on va être crée
                option.value = `${property}`;                               // On lui ajoute une valeur
                option.label = `${property} : ${data[property].name}`;      // On lui ajoute un nom à afficher
                option.innerHTML = `${property} : ${data[property].name}`;
                element.appendChild(option);                                // On l'ajoute au DOM
            }
        });
    },

    convertion: (amount, Cu1Name, Cu2Name, Cu1Code, Cu2Code, result, Cu1Symbol, Cu2Symbol, rate) => {       /// Affichage du résultat de la conversion
        let divToPush = document.querySelector("p.rate");                                                   // On sélectionne la div dans leqeul on affichera le résultat
        const ratetoPush = 1 + " " + Cu1Name + " = <br/>" + rate + " " + Cu2Name;                           // On crée le taux de conversion à afficher
        divToPush.innerHTML = ratetoPush;                                                                   // On affiche le résultat

        divToPush = document.querySelector("p.result");                                                     // On sélectionne la div dans leqeul on affichera le résultat
        const resulttoPush = "<span class='startedCurrencie'>" + amount + " " + Cu1Symbol + " (" + Cu1Code + ")</span><br/>" + "<strong>" + " " + result + " " + Cu2Symbol + " (" + Cu2Code + ") </strong>";    // On crée le texte de résultat à insérer
        divToPush.innerHTML = resulttoPush;                                                                 // On affiche le résultat

    },

    history: async (currencies, countryList, todayRate, dates, historyRates) => {                           /// Affichage et calcul des historiques de conversion
        for (let index = 0; index < currencies.length; index++) {   // Pour chaque devise de la liste
            const template = document.getElementById("history_row");    // On récupère le template de ligne à dupliquer
            const newRow = document.importNode(template.content, true); // On procède au clonage de ce template

            const moneyCode = currencies[index];    // Récupération du code à trois chiffres de la devise

            if (todayRate.data[moneyCode] === 1) {  // Si le taux de conversion est égale à 1 (même devise que celle sélectionnée)
                newRow.querySelector(".generated-histo").classList.add("is-hidden");    // Alors on masque la ligne au loieu de l'afficher
            }

            const flagCode = countryList[index] // ON récupére le code à deux chiffres du pays pour afficher le drapeau
            newRow.querySelector(".flag").classList.add("fi-" + flagCode.toLowerCase());

            const currenciesList = JSON.parse(sessionStorage.getItem('currenciesList'));
            newRow.querySelector(".currency_name").innerHTML = currenciesList.data[moneyCode].name;

            newRow.querySelector(".value").innerHTML = todayRate.data[moneyCode];

            for (let index = 0; index < historyRates.length; index++) {
                const date = dates[index];
                const histoIndex = historyRates[index];
                const histoDate = histoIndex[date];

                const divToPush = newRow.querySelectorAll(".fluctuation");
                const fluctuation = ((histoDate[moneyCode] - todayRate.data[moneyCode]) / histoDate[moneyCode]) * 100;
                if (fluctuation < 0) {
                    divToPush[index].style.color = "#b30021";
                } else {
                    divToPush[index].style.color = "#26ab2c";
                }
                // if (todayRate.data[moneyCode] !== 1) {
                //     newRow.classList.add("is-hidden");
                // }
                // else {
                //     console.log("equal :" + todayRate.data[moneyCode]);
                // }
                divToPush[index].innerHTML = fluctuation.toFixed(2) + " %";
            }

            const placeToPush = document.getElementById("history_base");
            placeToPush.after(newRow);
        }
    },

    alertBanner: (message) => {                                                  /// Affichage du message d'alerte
        let divToPush = document.getElementById("article_banner");               // On sélectionne la div dans leqeul on affichera le résultat
        divToPush.innerHTML = message;                                           // On affiche le message
        let divToDisplay = document.getElementById("banner");                    // On sélectionne la div dans leqeul on affichera le résultat
        divToDisplay.classList.remove("is-hidden");                              // On affiche la bannière
        setTimeout(() => { divToDisplay.classList.add("is-hidden"); }, 2000);    // Après un temps on remasque
    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default pushInDom;