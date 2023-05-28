/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Imports
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
import dotenv from 'dotenv';                                                  // On récupère les variables d'environnement
import express from 'express';                                                // On récupère le module Express.js                        
import { router } from './router.js';                                         // On récupère les param du routeur                     

import cors from 'cors';                                             // On récupère le module cors

import { notFound } from './middlewares/index.js';                            // On récupère les middlewaresReload

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Définitions
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
dotenv.config();                                                              // On les passe en paramètres

const PORT = process.env.PORT || 3000;                                        // On définit le port à partir des variables d'environnement
const app = express();                                                        // On crée l'application

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Middlewares
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
app.use(cors('*'));

app.use(express.json());

app.use(router);

app.use("/middlewares", notFound);

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  App
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
app.listen(PORT, () => {                                                      // On lance l'application sur le port configuré
    console.log(process.env.START_SERVER + PORT || 'http://localhost:3000');  // On affiche le message de lancement (configuré dans les variables d'environnement) 
});