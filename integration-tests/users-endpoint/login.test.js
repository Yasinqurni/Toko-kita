require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const request = require('supertest');
const app = require('../../app')
const sequelize = require('../../db/config/config')
const { User } = require('../../db/models')
const bcrypt = require('bcrypt')


describe('router: /v1/api/login', () => {

    beforeAll(async () => {
        await sequelize.authenticate()
    })
        
    afterAll(async () => {
        await sequelize.close()
    })

    describe('should be successful', () => {

        beforeEach( async () => {
            const createUser = await User.create({
                fullname: 'Joko Integration',
                address: 'pacitan',
                phone: '084432145166',
                email: 'joko123@gmail.com',
                password: bcrypt.hashSync('jokoIntegration', 8),
                is_verified: true,
                role: 'user'
            })

        })
        
        afterEach( async() => {
            await User.destroy({
                where: { email: "joko123@gmail.com"}
            })
        })

        it('success login', async () => {
            const resp = await request(app)
                .post('/v1/api/login')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    email: 'joko123@gmail.com',
                    password: 'jokoIntegration',
                })

            expect(resp.body).toHaveProperty('message')
            expect(resp.body.message).toBe('login success')
            expect(resp.body.data).toHaveProperty('token')
            expect(resp.status).toBe(200)
        })
        
    })
    
    describe('should be error', () => {

        describe('email is wrong', () => {
            it('email not found', async () => {
                const resp = await request(app)
                .post('/v1/api/login')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    email: 'jokosusanto@gmail.com',
                    password: 'jokoIntegration',
                })

            expect(resp.body).toHaveProperty('message')
            expect(resp.body.message).toBe('email not found in our database')
            expect(resp.body.data).not.toHaveProperty('token')
            expect(resp.status).toBe(404)
            })
        })

        describe('password is wrong', () => {

            beforeEach( async () => {
                await User.create({
                    fullname: 'Joko Integration',
                    address: 'pacitan',
                    phone: '084432145166',
                    email: 'joko123@gmail.com',
                    password: bcrypt.hashSync('jokoIntegration', 8),
                    role: 'user'
                })
            })
            
            afterEach( async() => {
                const findUser = await User.findOne({
                    where: { email: "joko123@gmail.com" }
                })
                await User.destroy({
                    where: { id: findUser.id}
                })
            })

            it('must wrong', async () => {
                const resp = await request(app)
                .post('/v1/api/login')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    email: 'joko123@gmail.com',
                    password: 'jokotidakIntegration',
                })

            expect(resp.body).toHaveProperty('message')
            expect(resp.body.message).toBe('wrong password')
            expect(resp.body.data).not.toHaveProperty('token')
            expect(resp.status).toBe(404)
            })
        })
    })
})
