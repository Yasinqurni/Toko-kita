//cek saldo

const myWallet = (data) => {
    return {
        saldo: data.saldo
    }
}

const history = async (data) => {
    
    const array = data.map((transaksi) => {
        let no = 1
        no++
        return {
            no : no,
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