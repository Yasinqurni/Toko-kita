class walletQueries {

    constructor(Wallet) {
        this.model = Wallet
    }

    async Create(userId, saldo) {
        return this.model.create({
            user_id: userId,
            saldo: saldo,
        })
    }

    async GetAll(auth) {
        return this.model.findAll({
            where: {user_id: auth},
            // include: [
            //     { model: this.image},
            //     { model: this.category}
            // ],
        })
    }
    
    async GetById(id) {
        return this.model.findOne({
            where: {id: id}
        })
    }

    async GetByUserId(id) {
        return this.model.findOne({
            where: {user_id: id}
        })
    }

    async Delete(id) {
        return this.model.destroy({
            where: { 
                id: id,
            }
        })
    }

    async Update(id, saldo) {
        return this.model.update(
            {saldo: saldo}, 
            {
                where: { 
                    id: id,
                }
            })
    }
}

module.exports = walletQueries