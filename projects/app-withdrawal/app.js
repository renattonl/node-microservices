require('dotenv').config()
const appPromise = require('./src/app/middlewares/configprovider').appPromise
 
appPromise.then(function(app) {
  const PORT = process.env.SERVER_PORT_WITHDRAWAL || 3001
  app.use('/api', require('./src/app/routes'))
  app.listen(PORT, () => {
    console.log('Application running on port ', PORT)
  })
});