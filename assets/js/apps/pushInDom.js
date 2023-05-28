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
        const ratetoPush = 1 + " " + Cu1Name + " = <br/>" + rate + " " + Cu2Name;                           // On crée le 
        divToPush.innerHTML = ratetoPush;                                                                   // On affiche le résultat

        divToPush = document.querySelector("p.result");                                                     // On sélectionne la div dans leqeul on affichera le résultat
        const resulttoPush = "<span class='startedCurrencie'>" + amount + " " + Cu1Symbol + " (" + Cu1Code + ")</span><br/>" + "<strong>" + " " + result + " " + Cu2Symbol + " (" + Cu2Code + ") </strong>";
        divToPush.innerHTML = resulttoPush;

    },

    history: async (currencies, countryList, todayRate, dates, historyRates) => {
        for (let index = 0; index < currencies.length; index++) {
            const template = document.getElementById("history_row");
            const newRow = document.importNode(template.content, true);

            const moneyCode = currencies[index];

            const flagCode = countryList[index]
            newRow.querySelector(".flag").classList.add("fi-" + flagCode.toLowerCase());
            
            const currenciesList = JSON.parse(sessionStorage.getItem('currenciesList'));
            newRow.querySelector(".currency_name").innerHTML = currenciesList.data[moneyCode].name;

            newRow.querySelector(".value").innerHTML = todayRate.data[moneyCode];

            for (let index = 0; index < historyRates.length; index++) {
                const date = dates[index];
                const histoIndex = historyRates[index];
                const histoDate = histoIndex[date];

                const divToPush = newRow.querySelectorAll(".fluctuation");
                const fluctuation = ((histoDate[moneyCode] - todayRate.data[moneyCode]) * histoDate[moneyCode]) * 100;
                if (fluctuation < 0) {
                    divToPush[index].style.color = "#b30021";
                    } else {
                        divToPush[index].style.color = "#26ab2c";
                    }
                divToPush[index].innerHTML = fluctuation.toFixed(5);
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