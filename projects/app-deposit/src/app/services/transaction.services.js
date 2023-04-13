const transactionRepository = require('../repositories/transaction.repository')
const messagesAsync = require('../middlewares/messagesasync')
 
const transactionService = {
  addTransaction: async (amount, accountId) => {
    const message = await transactionRepository.addTransaction(amount, accountId);
    messagesAsync.send(message.id, accountId, amount, 'deposit');
    console.log(message);
    return message;
  }
};
 
module.exports = transactionService;