/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Défintiions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const pushInDom = {

    createList: async () => {
        const url = "/data/currencies.json";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.warn('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function (jsonData) {
                        const data = jsonData.data
                        const datalist = document.querySelectorAll("datalist");
                        datalist.forEach(element => {   // Pour chacune des datalist
                            for (const property in data) {  // Pour chaque devise, on créer une option dans la liste
                                const option = document.createElement('option');    // On sélectionne l'élement qu'on va être crée
                                option.value = `${property}`;   // On lui ajoute une valeur
                                option.label = `${property} : ${data[property].name}`; // On lui ajoute un nom à afficher
                                element.appendChild(option);    // On l'ajoute au DOM
                            }
                        });

                    });
                }
            )
            .catch(function (err) {
                console.error('Fetch Error -', err);
            });
    },

    applyRate: (result) => {
        const divToPush = document.getElementById("article_rate");
        divToPush.innerHTML = result;
    }
}
/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export default pushInDom;