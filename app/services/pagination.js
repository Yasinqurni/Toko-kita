const pagination = (page, limit) => {
    const pageInt = Number(page)
    const limitInt = Number(limit)
    const offset = (pageInt - 1) * limitInt

    return {limitInt, offset}
}

const getPagingData = (result, page, limit) => {
    const {count: totalItems, rows: data} = result
    const currentPage = page ? +page + 1 : 0
    const totalPages = Math.ceil(totalItems / limit)

    return {totalItems, data, totalPages, currentPage}
}

module.exports = {
    pagination,
    getPagingData,
}