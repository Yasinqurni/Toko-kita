const validator = require('validator')

const formatValidator = async (payload) => {

    const email = await validator.isEmail(payload.email)
    if (!email ) {
        return false
    }
    const phone = await validator.isMobilePhone(payload.phone,['id-ID'])
    if (!phone) {
        return false
    }
    
    return true
}


module.exports = formatValidator