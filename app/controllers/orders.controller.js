const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')

class orderController {

    constructor(cartService, orderService, itemCartService, itemQueries) {
        
        this.cartService = cartService
        this.orderService = orderService
        this.itemCartService = itemCartService
        this.itemQueries = itemQueries

    }

    async checkout(req, res) {

        try {
            //find cart with status_cart pending
            const auth = req.userId

            const findCart = await this.cartService.GetByStatus('pending', auth)
            if (!findCart) { return responseHendler.notFound(res, message('cart').notFoundResource) }

            //create order
            const findItemCart = await this.itemCartService.GetById(findCart)
            if (findItemCart.length == 0) { return responseHendler.notFound(res, message('item_cart').notFoundResource) }

            for (const item of findItemCart) {
                const findItem = await this.itemService.GetByPayload(item.item_id)

                //cek stock item
                if (item.quantity_order > findItem.quantity) {
                    return responseHendler.badRequest(res, message('stock limit').errorMessage)
                }

                const qty = findItem.quantity - item.quantity_order
                const updateQty = await this.itemService.UpdateQty(item.item_id, qty)
                if (!updateQty) { return responseHendler.badRequest(res, message('update item').invalidCreateResource) }
            }

            let cartPrice = {}
            let totalPrice = 0;
            findItemCart.forEach((item) => {
                cartPrice[item.id] = item.total_price
                totalPrice = totalPrice + item.total_price
            })

            const createOrder = await this.orderService.Create(findCart, 'pending', totalPrice)
            if (!createOrder) { return responseHendler.badRequest(res, message('order').invalidCreateResource) }

            //update status cart
            const updateCart = await this.cartService.Update('process', findCart)
            if (!updateCart) { return responseHendler.badRequest(res, message('cart').invalidCreateResource) }

            //update 


            return responseHendler.ok(res, message('checkout').success)

        }

        catch (err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

    async confirmPayment(req, res) {
        //update order status dari pending menjadi success
        //update cart status dari process menjadi success 
        try {
            //update order
            const auth = req.userId
            const findOrder = await this.orderService.GetByStatus(auth, 'pending')
            if (!findOrder) { return responseHendler.notFound(res, message('order').notFoundResource) }

            const updateOrder = await this.orderService.Update(findOrder, 'success')
            if (!updateOrder) { return responseHendler.badRequest(res, message('order').invalidCreateResource) }

            // Update cart
            const findCart = await this.cartService.GetByStatus('process', findOrder.user_id)
            if (!findCart) { return responseHendler.notFound(res, message('cart').notFoundResource) }

            const updateCart = await this.cartService.Update('success', findCart)
            if (!updateCart) { return responseHendler.badRequest(res, message('cart').invalidCreateResource) }

            return responseHendler.ok(res, message('confirm payment').success)

        }

        catch (err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }

    }

    async cancelOrder(req, res) {

        try {
            //find order dengan status pending
            const auth = req.userId
            const findOrder = await this.orderService.GetByStatus(auth, 'pending')
            if (!findOrder) { return responseHendler.notFound(res, message('order').notFoundResource) }

            //delete order
            const deleteOrder = await this.orderService.Delete(findOrder)
            if (!deleteOrder) { return responseHendler.badRequest(res, message('delete order').invalidCreateResource) }

            //merubah status cart dari process menjadi pending
            const findCart = await this.cartService.GetByStatus('process', findOrder.user_id)
            if (!findCart) { return responseHendler.notFound(res, message('cart').notFoundResource) }

            const cartUpdate = await this.cartService.Update('pending', findCart)
            if (!cartUpdate) { return responseHendler.badRequest(res, message('update cart').invalidCreateResource) }

            //update stock barang
            const findItemCart = await this.itemCartService.GetAll(findCart)
            if (!findItemCart) { return responseHendler.notFound(res, message('item_cart').notFoundResource) }

            for (let item of findItemCart) {
                const findItem = await this.itemService.GetByPayload(item.item_id)
                if (!findItem) { return responseHendler.notFound(res, message('item').notFoundResource) }

                let qty = findItem.quantity + item.quantity_order
                const itemUpdate = await this.itemService.UpdateQty(qty, item.item_id)
                if (!itemUpdate) { return responseHendler.badRequest(res, message('update item').invalidCreateResource) }
            }

            return responseHendler.ok(res, message('cancel order').success)

        }

        catch (err) {
            console.log(err)
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }


}

module.exports = orderController 