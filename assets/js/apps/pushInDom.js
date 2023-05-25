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

    createList: async () => {

        const promise = dataCalls.getCurrenciesList();
        const list = await (promise);
        const data = list.data

        //FIXME : Dataliste semble ne pas fonctionner sur mobile ! Remplacer par autre chose ?
        const datalist = document.querySelectorAll("datalist");
        datalist.forEach(element => {   // Pour chacune des datalist
            for (const property in data) {  // Pour chaque devise, on créer une option dans la liste
                const option = document.createElement('option');    // On sélectionne l'élement qu'on va être crée
                option.value = `${property}`;   // On lui ajoute une valeur
                option.label = `${property} : ${data[property].name}`; // On lui ajoute un nom à afficher
                element.appendChild(option);    // On l'ajoute au DOM
            }
        });
    },

    convertion: (amount, name, result, symbol, rate, fromCurrencie, toCurrencie) => {
        let divToPush = document.querySelector("p.result");
        const resulttoPush = "<span class='startedCurrencie'>" + amount + " " + name + " = </span>" + "<strong>"  +" "+ result +" "+ symbol + "</strong>";
        divToPush.innerHTML = resulttoPush;

        divToPush = document.querySelector("p.rate"); 
        const ratetoPush = "Taux : " + 1 + " " + fromCurrencie + " = " + rate + " " + toCurrencie;
        divToPush.innerHTML = ratetoPush;
    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default pushInDom;