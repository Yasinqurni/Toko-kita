const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')
const { cartDecoratorArray } = require('../decorators/carts-decorator')


class cartController {

    constructor(itemService, cartService, itemCartService) {
        this.itemService = itemService
        this.cartService = cartService
        this.itemCartService = itemCartService
    }
   
    async addCart(req, res) {
        try {

            //menemukan item
            const payload = req.params
            const qty = req.body.quantity_order
            if (qty == undefined) {
                return responseHendler.notFound(res, message('please insert quantity').errorMessage) 
           }
            const findItem = await this.itemService.GetById(payload)
            if(!findItem) { return responseHendler.notFound(res, message('item').notFoundResource)}

            // cek stock item
            if(findItem.quantity < qty) { return responseHendler.badRequest(res, message('stock limit').errorMessage)}
            
            // menemukan cart dengan status item:pending
            const auth = req.userId
            let cart = await this.cartService.GetByStatus('pending', auth)
           
            // bila tidak ditemukan maka akan membuat cart baru dengan status:pending
            if(!cart) {
                cart = await this.cartService.Create('pending', auth)
            } 
            
            const cartId = {}
            cartId[cart.status_cart] = cart.id

            //create item_cart
            const totalprice = qty * findItem.price

            const createItemCart = await this.itemCartService.Create(findItem.id, cartId['pending'], qty, totalprice)
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
            const findCart = await this.cartService.GetAll(auth)
            if (findCart.length == 0) { return responseHendler.notFound(res, message('cart').notFoundResource)}
            
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