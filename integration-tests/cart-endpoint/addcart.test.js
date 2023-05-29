require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const request = require('supertest');
const app = require('../../app')
const sequelize = require('../../db/config/config')
const { User, Item } = require('../../db/models')
const bcrypt = require('bcrypt')
const generateToken  = require('../../lib/jwt')

describe('endpoint: /v1/api/cart/:id', () => {

    beforeAll(async () => {
        await sequelize.authenticate()
    })
        
    afterAll(async () => {
        await sequelize.close()
    })
    
    describe('should be successful', () => {
        beforeEach(async() => {
            await User.create({
                fullname: 'Putri Amanda',
                address: 'Bandung',
                phone: '084432145166',
                email: 'putri@gmail.com',
                password: bcrypt.hashSync('asepvsAb1', 8),
                role: 'user'
            })

            await Item.create({
                name_item: "Mainan anak",
                category_id: 1,
                price: 3500,
                quantity: 20,
            })
        })
        
        afterEach(async() => {
            await User.destroy({where: { email: 'putri@gmail.com'}})
            await Item.destroy({where: { name_item: "Mainan anak"}})
        })

        it('for endpoint: post /v1/api/cart/:id', async () => {
            const findUser = await User.findOne({where: { email: 'putri@gmail.com' }})

            const payload = {
                id: findUser.id,
                role: findUser.role
            }
            const token = await generateToken(payload)

            const findItem = await Item.findOne({ where: {name_item: "Mainan anak"} })
            const pathParams = findItem.id

            const res = await request(app)
                .post(`/v1/api/cart/${pathParams}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                    quantity_order: 2
                })
        
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe(`add to cart success`)
                expect(res.status).toBe(200)
        })

    })

    describe('this error', () => {

        beforeEach(async() => {
            await User.create({
                fullname: 'Mahalini',
                address: 'Bandung',
                phone: '084432145166',
                email: 'mahalini@gmail.com',
                password: bcrypt.hashSync('asepvsAb1', 8),
                role: 'user'
            })

            await Item.create({
                name_item: "Mainan anak cewek",
                category_id: 1,
                price: 3500,
                quantity: 20,
            })

        })
        
        afterEach(async() => {
            await User.destroy({where: { email: 'mahalini@gmail.com'}})
            await Item.destroy({where: { name_item: 'Mainan anak cewek'}})
        })

        it('when order quantity is overload', async () => {
            
            const findUser = await User.findOne({where: { email: 'mahalini@gmail.com' }})
    
            const payload = {
                id: findUser.id,
                role: findUser.role
            }
            const token = await generateToken(payload)

            const findItem = await Item.findOne({where: {name_item: 'Mainan anak cewek' }})
            const pathParams = findItem.id

            const res = await request(app)
                .post(`/v1/api/cart/${pathParams}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                    quantity_order: 21
                })
        
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe(`stock limit`)
                expect(res.status).toBe(400)
        })
    })

    describe('this error', () => {

        beforeEach(async() => {
            await User.create({
                fullname: 'Mahalini',
                address: 'Bandung',
                phone: '084432145166',
                email: 'mahalini1@gmail.com',
                password: bcrypt.hashSync('asepvsAb1', 8),
                role: 'user'
            })

        })

        afterEach(async() => {
            await User.destroy({where: { email: 'mahalini1@gmail.com'}})
        })

        it('should error api', async () => {
            
            const findUser = await User.findOne({where: { email: 'mahalini1@gmail.com' }})
    
            const payload = {
                id: findUser.id,
                role: findUser.role
            }
            const token = await generateToken(payload)

            const pathParams = null

            const res = await request(app)
                .post(`/v1/api/cart/${pathParams}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                    quantity_order: 21
                })
                
                expect(res.body.error).toBe(true)
                expect(res.body.message).toBe('invalid input syntax for type integer: "null"')
                expect(res.body.type).toBe('api_error')
                expect(res.status).toBe(500)
        })
    })
})