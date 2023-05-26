
const cartDecorator = async (cart) => {

    const mappingItem = cart.item_carts.map((itemCart) => {
        return {
            name_item: itemCart.item.name_item,
            quantity_order: itemCart.quantity_order,
            total_price: itemCart.total_price
        }
    })
    const mapCarts = {
        cart_id: cart.id,
        status_cart: cart.status_cart,
        address: cart.user.address,
        items: mappingItem
    }

    return mapCarts
}


const cartDecoratorArray = async (cart) => {

    const mapCarts = cart.map((data) => {
        return {
            cart_id: data.id,
            status_cart: data.status_cart,
            address: data.user.address,
            items: data.item_carts.map((itemCart) => {
                return {
                    name_item: itemCart.item.name_item,
                    quantity_order: itemCart.quantity_order,
                    total_price: itemCart.total_price
                }
            })
        }
        
    })
    return await Promise.all(mapCarts)
}

module.exports = {
    cartDecorator,
    cartDecoratorArray,
}