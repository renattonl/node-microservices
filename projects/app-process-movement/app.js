require('dotenv').config()
const { Kafka } = require('kafkajs')
const MongoClient = require('mongodb').MongoClient;
const appPromise = require('./src/middlewares/configprovider').appPromise

appPromise.then(() => {
  const kafka = new Kafka({
    clientId: 'transaction-client',
    brokers: [process.env.KAFKA_SERVER],
  })
  const DB_MONGO_URI = process.env.DB_MONGO_URI
  
  async function kafka_consumer() {
    const consumer = kafka.consumer({ groupId: 'movement-subscription', allowAutoTopicCreation: true })
    await consumer.connect()
    await consumer.subscribe({ topic: 'transaction-topic', fromBeginning: true })
    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({ value: message.value.toString() })
        var jsonObj = JSON.parse(message.value.toString())
        var amountNew = 0
        if (jsonObj.type === 'withdrawal') {
          amountNew = jsonObj.amount * (-1)
        } else {
          amountNew = jsonObj.amount
        }
        const clientMongo = new MongoClient(DB_MONGO_URI);
        await clientMongo.connect();
        console.log('Connected success to server');
        const dbo = clientMongo.db(process.env.DB_MONGO_DATABASE_MOVEMENT);
        const myobj = { transactionId: jsonObj.transactionId, type: jsonObj.type, accountid: jsonObj.accountId, amount: amountNew, creationdate: jsonObj.creationDate };
        const collection = dbo.collection("movement");
        await collection.insertOne(myobj);
        console.log("1 document inserted");
  
        await consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }])
        console.log(`Commit message with accountId: 1`);

        clientMongo.close();
      },
    });
  }
  
  kafka_consumer();
}).catch(error => {
  console.log('ERROR', error);
})
