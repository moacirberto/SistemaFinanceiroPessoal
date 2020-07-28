const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findAll = async (req, res) => {
 
   try {
      const data = await TransactionModel.find({});
      if (data.length <1 )
      {
        res.status(404).send({message: "Nenhuma lançamento encontrado"});
      }
      else
      {
        res.send(data);
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || 'Erro ao listar todos os documentos' });
      logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
    }
};

const create = async (req, res) => {
    const data = new TransactionModel({
         description: req.body.description,
         value: req.body.value,
         category: req.body.category,
         year: req.body.year,
         day: req.body.day,
         yearMonth: req.body.yearMonth,
         yearMonthDay: req.body.yearMonthDay,
         type: req.body.type,
    });
    try {
      // Salva grade
      await data.save(data);
  
      res.send({message: 'Lançamento inserido com sucesso'});
      logger.info(`POST /transaction - ${JSON.stringify()}`);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
      logger.error(`POST /transaction - ${JSON.stringify(error.message)}`);
    }
 };

const update = async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: 'Dados para atualizacao vazio',
      });
    }
  
    const id = req.params.id;
      
    try {
      const data = await TransactionModel.findByIdAndUpdate({_id: id}, req.body,{new: true});
  
      if (data === null )
      {
        res.status(404).send({message: `Lancamento id: ${id} não encontrada para atualizar`});
      }
      else
      {
        res.send(data);
      }
  
      logger.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao atualizar o lancamento id: ' + id });
      logger.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
  
    try {
      const data = await TransactionModel.findByIdAndDelete({_id: id});
  
      if (data === null )
      {
        res.status(404).send({message: `Lançamento id: ${id} não encontrada para exclusão`});
      }
      else
      {
        res.send({message: 'Lançamento excluida com sucesso'});
      }
  
      logger.info(`DELETE /transaction - ${id}`);
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Nao foi possivel deletar o lançamento id: ' + id });
      logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
    }
  };

const findOne = async (req, res) => {
    const id = req.params.id;
     
    try {
      const data = await TransactionModel.findById({_id: id});
      if (data === null )
      {
        res.status(404).send({message: `Lançamento id: ${id} não encontrada`});
      }
      else
      {
        res.send(data);
      }
  
      logger.info(`GET /grade - ${id}`);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar o documento id: ' + id });
      logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
};
  
const findYearMonth = async (req, res) => {
 
  const period = req.query.period;
  var condition = period
    ? { yearMonth: { $regex: new RegExp(period), $options: 'i' } }
    : {};
  
  try {
    const data = await TransactionModel.find(condition);
    if (data.length === 0 )
    {
      res.status(404).send({message: "Nenhuma lançamento encontrado"});
    }
    else
    {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findDescription = async (req, res) => {
 
  const description = req.query.description;
  var condition = description
    ? { description: { $regex: new RegExp(description), $options: 'i' } }
    : {};
  
  try {
    const data = await TransactionModel.find(condition);
    if (data.length === 0 )
    {
      res.status(404).send({message: "Nenhuma lançamento encontrado"});
    }
    else
    {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

module.exports = { create, findAll, update, remove, findOne, findYearMonth, findDescription };