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

        //FIXME : Dataliste semble ne pas fonctionner sur mobile ! Remplacer par autre chose ?
        const datalist = document.querySelectorAll("datalist");
        datalist.forEach(element => {                                       // Pour chacune des datalist
            for (const property in data) {                                  // Pour chaque devise, on créer une option dans la liste
                const option = document.createElement('option');            // On sélectionne l'élement qu'on va être crée
                option.value = `${property}`;                               // On lui ajoute une valeur
                option.label = `${property} : ${data[property].name}`;      // On lui ajoute un nom à afficher
                element.appendChild(option);                                // On l'ajoute au DOM
            }
        });
    },

    convertion: (amount, name, result, symbol, rate, fromCurrencie, toCurrencie) => {                       /// Affichage du résultat de la conversion
        let divToPush = document.querySelector("p.result");                                                 // On sélectionne la div dans leqeul on affichera le résultat
        const resulttoPush = "<span class='startedCurrencie'>" + amount + " " + name + " = </span>" + "<strong>" + " " + result + " " + symbol + "</strong>";
        divToPush.innerHTML = resulttoPush;                                                                 // On affiche le résultat

        divToPush = document.querySelector("p.rate");                                                       // On sélectionne la div dans leqeul on affichera le résultat
        const ratetoPush = "Taux : " + 1 + " " + fromCurrencie + " = " + rate + " " + toCurrencie;          // On crée le 
        divToPush.innerHTML = ratetoPush;                                                                   // On affiche le résultat
    },

    alertBanner: (message) => {                                                                             /// Affichage du message d'alerte
        let divToPush = document.querySelector("p.result");                                                 // On sélectionne la div dans leqeul on affichera le résultat
        divToPush.innerHTML = message;                                                                      // On affiche le message
        document.querySelector("p.rate").innerHTML = "";                                                    // On efface le taux 

    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default pushInDom;