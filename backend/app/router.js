/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Paramètres
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
import express from 'express';                                       // Import du module ExpressJS 
const router = express.Router();                                     // Import du module routeur d'ExpressJS

// Import des controllers
import { mainController } from './controllers/mainController.js';    // Import du controller des listes

/*
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  2- Definition des routes
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

router.get('/currencies', mainController.getCurrenciesList);         // récupérer la liste des devises

router.get('/latest/base_currency/:fromCurrencie/currencies/:toCurrencie', mainController.getLatestRate); 

router.get('/historical/currencies/:currencies/base_currency/:base_currency/date_from/:dateFrom/date_to/:dateTo', mainController.history_rates); 

// /historical/currencies/USD,EUR,CHF,GBP,CNY,INR,RUB/base_currency/HRK/date_from/2023-05-26/date_to/2023-05-26


/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export { router };