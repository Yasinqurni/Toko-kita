require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const request = require('supertest');
const app = require('../../app')
const sequelize = require('../../db/config/config')
const { Item, User, Cart, Item_cart, Order } = require('../../db/models')
const bcrypt = require('bcrypt')
const generateToken  = require('../../lib/jwt')


describe('return error checkout endpoint', () => {
    beforeAll(async () => {
        await sequelize.authenticate()
    })
        
    afterAll(async () => {
        await sequelize.close()
    })

    describe('when quantity order > quantity items', () => {
        beforeEach(async() => {
            const createUser = await User.create({
                fullname: 'Asep Surasep',
                address: 'Bandung',
                phone: '084432145166',
                email: 'asep8@gmail.com',
                password: bcrypt.hashSync('asepvsAb1', 8),
                role: 'user'
            })
            //create seller
            const createSeller = await User.create({
                fullname: 'Toko Baju Anak',
                address: 'Bandung',
                phone: '084432145166',
                email: 'toko2@gmail.com',
                password: bcrypt.hashSync('asepvsAb1', 8),
                role: 'seller'
            })
            //create item
            const createItem = await Item.create({
                name_item: "Baju kemeja Koko kecil",
                user_id: createSeller.id,
                category_id: 1,
                price: 125000,
                quantity: 20,
            })
            //create cart
            const createCart = await Cart.create({
                user_id: createUser.id,
                status_cart: 'pending'
            })
            //create item_cart
            await Item_cart.create({
                item_id: createItem.id,
                cart_id: createCart.id,
                quantity_order: 25,
                total_price: 300000
            })
        })

        afterEach(async () => {
             //delete user
        await User.destroy({where: {email: 'asep8@gmail.com'}})
        //delete seller
        await User.destroy({where: {email: 'toko2@gmail.com'}})
        //delete item
        await Item.destroy({where: {name_item: "Baju kemeja Koko kecil"}})
        //delete cart
        await Cart.destroy({where: {status_cart: 'success'}})
        //delete item_cart
        await Item_cart.destroy({where: {total_price: 300000}})
        })

        it('should error', async () => {
            
            const findUser = await User.findOne({where: { email: 'asep8@gmail.com' }})
    
            const payload = {
                id: findUser.id,
                role: findUser.role
            }
            const token = await generateToken(payload)

            const res = await request(app)
                .post(`/v1/api/order`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('authorization', token)

                console.log('response stock limit order:', res.body)
                expect(res.body.error).toBe(true)
                expect(res.body.message).toBe('stock limit')
                expect(res.status).toBe(400)
        })
    })

    describe('when item_cart not found', () => {
        beforeEach(async() => {
            const createUser = await User.create({
                fullname: 'Asep Surasep',
                address: 'Bandung',
                phone: '084432145166',
                email: 'asep5@gmail.com',
                password: bcrypt.hashSync('asepvsAb1', 8),
                role: 'user'
            })
            //create seller
            const createSeller = await User.create({
                fullname: 'Toko Baju Anak',
                address: 'Bandung',
                phone: '084432145166',
                email: 'toko1@gmail.com',
                password: bcrypt.hashSync('asepvsAb1', 8),
                role: 'seller'
            })
            //create item
            // const createItem = await Item.create({
            //     name_item: "Baju kemeja Koko kecil",
            //     user_id: createSeller.id,
            //     category_id: 1,
            //     price: 125000,
            //     quantity: 20,
            // })
            //create cart
            const createCart = await Cart.create({
                user_id: createUser.id,
                status_cart: 'pending'
            })
            //create item_cart
            // await Item_cart.create({
            //     cart_id: createCart.id,
            //     quantity_order: 25,
            //     total_price: 300000
            // })
        })

        afterEach(async () => {
             //delete user
        await User.destroy({where: {email: 'asep5@gmail.com'}})
        //delete seller
        await User.destroy({where: {email: 'toko1gmail.com'}})
        //delete item
        // await Item.destroy({where: {name_item: "Baju kemeja Koko kecil"}})
        //delete cart
        await Cart.destroy({where: {status_cart: 'pending'}})
        //delete item_cart
        // await Item_cart.destroy({where: {total_price: 300000}})
        })

        it('should error 404', async () => {
            
            const findUser = await User.findOne({where: { email: 'asep5@gmail.com' }})
    
            const payload = {
                id: findUser.id,
                role: findUser.role
            }
            const token = await generateToken(payload)

            const res = await request(app)
                .post(`/v1/api/order`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('authorization', token)

                console.log('response stock limit order:', res.body)
                expect(res.body.error).toBe(true)
                // expect(res.body.message).toBe('item_cart not found in our database',)
                expect(res.status).toBe(404)
        })
    })
})