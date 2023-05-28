

const transaction = async (data) => {
    const array = data.map((transaksi) => {
        return {
            status: transaksi.status_transaction,
            expired: transaksi.expired_at
        }
        
    })
    return await Promise.all(array)
}

module.exports = transaction