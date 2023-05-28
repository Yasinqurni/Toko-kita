const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')


class transactionController{

    constructor(transactionService) {
        this.transactionService = transactionService
    }

    //cek expired
    async updateExpTrx() {

        try {

            const getTransaction = await this.transactionService.GetAll('waiting');
            if (getTransaction.length === 0) {
                console.info('transaction is empty');
                
            }

            for (const transaction of getTransaction) {
                if (transaction.expired_at < new Date()) {
                await this.transactionService.Update(transaction.id, 'expired');
                console.info(`berhasil terupdate jam: ${new Date()}`);
                }
            }

            console.info('update transaction')
        } 
        catch (error) {
            console.error(error)
        }
    } 

    //get transaction
    
    //update status
    //
}

module.exports = transactionController