const { Transaction } = require('../../db/models');
const { transactionQueries } = require('../queries');
const { transactionService } = require('../services');
const { transactionController } = require('../controllers');
const cron = require('node-cron');

const transactionqueries = new transactionQueries(Transaction);
const transactionservice = new transactionService(transactionqueries);
const transactioncontroller = new transactionController(transactionservice);

async function runCronJob() {
  console.log('Running cron job...');
  await transactioncontroller.updateExpTrx();
}

const cronJob = cron.schedule('0 * * * *', runCronJob);

module.exports = cronJob