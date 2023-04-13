const transactionRepository = require('../repositories/transaction.repository')


const transactionService = {
    addTransaction: async (amount, accountId) => {
        const id = await transactionRepository.addTransaction(amount, accountId)
        console.log(id)
        return id
    }
}

module.exports = transactionService