//cek saldo

const myWallet = (data) => {
    return {
        saldo: data.saldo
    }
}

const history = async (data) => {
    const array = data.map((transaksi) => {
        return {
            nominal: transaksi.nominal,
            type: transaksi.type,
            description: transaksi.description,
            date: transaksi.date
        }
        
    })
    return await Promise.all(array)
}

module.exports = {
    myWallet,
    history,
}