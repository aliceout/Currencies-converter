/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Définitions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
const mainController = {
    getCurrenciesList: async (req, res) => {
        try {
            const pokemons = await dataMapper.getAllPokemon();
            res.render('list', {
                pokemons,
                title: 'Pokedex - Accueil',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },

    getLatestRate: async (req, res) => {
        try {
            const pokemons = await dataMapper.getAllPokemon();
            res.render('list', {
                pokemons,
                title: 'Pokedex - Accueil',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },

    history_rates: async (req, res) => {
        try {
            const pokemons = await dataMapper.getAllPokemon();
            res.render('list', {
                pokemons,
                title: 'Pokedex - Accueil',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    }
}

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export { mainController };