/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Imports
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
import dataCalls from "./dataCalls.js";

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
                option.innerHTML =  `${property} : ${data[property].name}`;   
                element.appendChild(option);                                // On l'ajoute au DOM
            }
        });
    },

    convertion: (amount, fromCurrencieName, toCurrencieName, fromCurrencieCode, toCurrencieCode, result, fromCurrencieNameSymbol, toCurrencieNameSymbol, rate) => {                       /// Affichage du résultat de la conversion
        let divToPush = document.querySelector("p.result");                                                 // On sélectionne la div dans leqeul on affichera le résultat
        const resulttoPush = "<span class='startedCurrencie'>" + amount + " " + fromCurrencieNameSymbol + " (" + fromCurrencieCode + ") = </span><br/>" + "<strong>" + " " + result + " " + toCurrencieNameSymbol + " (" + toCurrencieCode + ") </strong>";
        divToPush.innerHTML = resulttoPush;                                                                 // On affiche le résultat

        divToPush = document.querySelector("p.rate");                                                       // On sélectionne la div dans leqeul on affichera le résultat
        const ratetoPush = 1 + " " + fromCurrencieName + " = <br/>" + rate + " " + toCurrencieName;          // On crée le 
        divToPush.innerHTML = ratetoPush;                                                                   // On affiche le résultat
    },

    alertBanner: (message) => {                                                                             /// Affichage du message d'alerte
        let divToPush = document.getElementById("article_banner");                                                 // On sélectionne la div dans leqeul on affichera le résultat
        divToPush.innerHTML = message;                                                                      // On affiche le message
        let divToDisplay = document.getElementById("banner");
        divToDisplay.classList.remove("is-hidden");
        setTimeout(() => { divToDisplay.classList.add("is-hidden"); }, 2000);
        


    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default pushInDom;