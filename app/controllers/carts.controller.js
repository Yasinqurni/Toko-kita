const { itemQueries, cartQueries, itemCartQueries } = require('../queries')
const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')
const { cartDecorator, cartDecoratorArray } = require('../decorators/carts-decorator')


class cartController {
   
    async addCart(req, res) {
        try {

            //menemukan item
            const payload = req.params
            const qty = req.body.quantity_order

            const findItem = await itemQueries.findById(payload)
            if(!findItem) { return responseHendler.notFound(res, message('item').notFoundResource)}

            // cek stock item
            if(findItem.quantity < qty) { return responseHendler.badRequest(res, message('stock limit').errorMessage)}
            
            // menemukan cart dengan status item:pending
            const auth = req.userId
            let cart = await cartQueries.findOneCart('pending', auth)
           
            // bila tidak ditemukan maka akan membuat cart baru dengan status:pending
            if(!cart) {
                cart = await cartQueries.createCart('pending', auth)
            } 
            
            const cartId = {}
            cartId[cart.status_cart] = cart.id

            //create item_cart
            const totalprice = qty * findItem.price

            const createItemCart = await itemCartQueries.createItemCart(findItem.id, cartId['pending'], qty, totalprice)
            if(!createItemCart) { return responseHendler.badRequest(res, message().invalidFormat)}
            
            return responseHendler.ok(res, message('add to cart').success)

        }
        catch(err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }  
    }

    async showCart(req, res) {
       
        try {

            const auth = req.userId
            const findCart = await cartQueries.findAllCart(auth)
            if (!findCart) { return responseHendler.notFound(res, message('cart').notFoundResource)}
            
            const data = await cartDecoratorArray(findCart)
            return responseHendler.ok(res, message('get cart').success, data)
 
        }
        catch(err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }  
        
    }


}

module.exports = cartController