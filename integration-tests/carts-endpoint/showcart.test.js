require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const request = require('supertest');
const app = require('../../app')
const sequelize = require('../../db/config/config')
const { User, Item, Cart } = require('../../db/models')
const bcrypt = require('bcrypt')
const generateToken  = require('../../lib/jwt')

describe('endpoint: v1/api/cart', () => {

    beforeAll(async () => {
        await sequelize.authenticate()
    })
        
    afterAll(async () => {
        await sequelize.close()
    })

    describe('should be successful', () => {
        beforeEach(async() => {
            const createUser = await User.create({
                fullname: 'Putri Amanda',
                address: 'Bandung',
                phone: '084432145166',
                email: 'putri1@gmail.com',
                password: bcrypt.hashSync('asepvsAb1', 8),
                role: 'user'
            })
    
            await Cart.create({
                user_id: createUser.id,
                status_cart: 'pending'
            })
        })
        
        afterEach(async() => {
            await User.destroy({where: { email: 'putri1@gmail.com'}})
            await Cart.destroy({where: { status_cart: "pending"}})
        })
        it('return get cart success', async () => {
            const findUser = await User.findOne({where: { email: 'putri1@gmail.com' }})
    
            const payload = {
                id: findUser.id,
                role: findUser.role
            }
            const token = await generateToken(payload)
    
            const res = await request(app)
                .get(`/v1/api/cart`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('authorization', token)
    
                console.log(res.body)
                expect(res.body).toHaveProperty("data")
                expect(res.body.message).toBe(`get cart success`)
                expect(res.status).toBe(200)
        })
    })
    
})