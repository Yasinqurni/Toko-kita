require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const request = require('supertest');
const app = require('../../app')
const sequelize = require('../../db/config/config')
const { Item, User, Cart, Item_cart, Order } = require('../../db/models')
const bcrypt = require('bcrypt')
const generateToken  = require('../../lib/jwt')

describe('this test for all endpoint of order success case', () => {
    beforeAll(async () => {
        await sequelize.authenticate()
        //create user
        const createUser = await User.create({
            fullname: 'Asep Surasep',
            address: 'Bandung',
            phone: '084432145166',
            email: 'asep3@gmail.com',
            password: bcrypt.hashSync('asepvsAb1', 8),
            role: 'user'
        })
        //create seller
        const createSeller = await User.create({
            fullname: 'Toko Baju Anak',
            address: 'Bandung',
            phone: '084432145166',
            email: 'toko@gmail.com',
            password: bcrypt.hashSync('asepvsAb1', 8),
            role: 'seller'
        })
        //create item
        const createItem = await Item.create({
            name_item: "Baju kemeja Koko",
            user_id: createSeller.id,
            category_id: 1,
            price: 125000,
            quantity: 20,
        })
        //create cart
        const createCart = await Cart.create({
            user_id: createUser.id,
            status_cart: 'process'
        })
        //create item_cart
        await Item_cart.create({
            item_id: createItem.id,
            cart_id: createCart.id,
            quantity_order: 2,
            total_price: 300000
        })

        await Order.create({
            user_id: createUser.id,
            cart_id: createCart.id,
            status_order: 'pending',
            total_price: 300000
        })
    })
        
    afterAll(async () => {
        //delete user
        await User.destroy({where: {email: 'asep3@gmail.com'}})
        //delete seller
        await User.destroy({where: {email: 'toko@gmail.com'}})
        //delete item
        await Item.destroy({where: {name_item: "Baju kemeja Koko"}})
        //delete cart
        await Cart.destroy({where: {status_cart: 'pending'}})
        //delete item_cart
        await Item_cart.destroy({where: {total_price: 300000}})

        await Order.destroy({where: {status_order: 'cancel'}})

        await sequelize.close()
    })

    describe('for cancel order', () => {

        it('should success', async () => {
            
            const findUser = await User.findOne({where: { email: 'asep3@gmail.com' }})
    
            const payload = {
                id: findUser.id,
                role: findUser.role
            }
            const token = await generateToken(payload)

            const res = await request(app)
                .delete(`/v1/api/order`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('authorization', token)

                console.log('res', res.body)
                expect(res.body.error).toBe(false)
                expect(res.body.message).toBe('cancel order success')
                expect(res.status).toBe(200)
        })
    })
})