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
// http://localhost:4151/latest/base_currency/CAD/currencies/EUR%2CUSD%2CCAD

router.get('/historical', mainController.history_rates);

// router.get('/historical?currencies=:currencies&base_currency=:base_currency&date_from=:dateFrom&date_to=:dateTo', mainController.history_rates);

/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
·······  Export
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
export { router };