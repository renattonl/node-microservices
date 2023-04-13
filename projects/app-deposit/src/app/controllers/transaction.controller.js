const transactionService = require('../services/transaction.services')

const addTransaction = async (req, res) => {
    const { amount, accountId } = req.body
    return res.status(200).send(await transactionService.addTransaction(amount, accountId))
}

module.exports = { addTransaction }