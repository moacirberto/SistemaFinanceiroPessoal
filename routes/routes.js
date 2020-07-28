const express = require('express');
const transactionService = require('../services/transactionService.js');

const transactionRouter = express.Router();
module.exports = transactionRouter;

transactionRouter.get('/',transactionService.findAll);
transactionRouter.get('/:id',transactionService.findOne);
transactionRouter.get('/findYearMonth/search',transactionService.findYearMonth);
transactionRouter.get('/findDescription/search',transactionService.findDescription);
transactionRouter.post('/',transactionService.create);
transactionRouter.put('/:id',transactionService.update);
transactionRouter.delete('/:id',transactionService.remove);






