const movementService = require('../services/movement.service')

const getMovementByAccountId = async (req, res) => {
    const accountId = parseInt(req.params.accountId)
    return res.send(await movementService.getMovementByAccountId(accountId))
}


module.exports = { getMovementByAccountId }