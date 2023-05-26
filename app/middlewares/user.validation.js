const validator = require('validator')

const formatValidator = async (payload) => {

    if (! await validator.isEmail(payload.email)) {
        return false
    }
    if (await validator.isMobilePhone(payload.phone,['id-ID'])) {
        return false
    }
    
    return true
}


module.exports = formatValidator