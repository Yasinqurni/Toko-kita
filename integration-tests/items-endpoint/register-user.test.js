require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const request = require('supertest');
const app = require('../../app')
const sequelize = require('../../db/config/config')
const { User } = require('../../db/models')
const bcrypt = require('bcrypt')


describe('router: /v1/api/register/user', () => {
    beforeAll(async () => {
        await sequelize.authenticate()
    })
        
    afterAll(async () => {
        await sequelize.close()
    })

    describe('should be successful', () => {

        afterEach( async() => {
            await User.destroy({
                where: { email: "yasinal3@gmail.com"}
            })
        })

        

        it('should return success register user', async () => {

            const resp = await request(app)
                .post('/v1/api/register/user')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    fullname: "yasin alqurni",
                    address: "gg. masjid alfatah",
                    phone: "082239236521",
                    email: "yasinal3@gmail.com",
                    password: "passwordlah1"
                })

            expect(resp.body).toHaveProperty('message')
            expect(resp.body.type).toBe('success')
            expect(resp.status).toBe(200)
        })

    })
    
    describe('should be error', () => {
        describe('duplicate data',() => {
            beforeEach(async() => {
                await User.create({
                    fullname: 'Joko Integration',
                    address: 'pacitan',
                    phone: '084432145166',
                    email: 'joko1234@gmail.com',
                    password: bcrypt.hashSync('jokoIntegration', 8),
                    role: 'user'
                })
            })

            afterEach( async() => {
                const findUser = await User.findOne({
                    where: { email: 'joko1234@gmail.com' }
                })
                await User.destroy({
                    where: { id: findUser.id}
                })
            })

            it('cannot register because data duplicates', async () => {
                const resp = await request(app)
                .post('/v1/api/register/user')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    fullname: 'Joko Integration',
                    address: 'pacitan',
                    phone: '084432145166',
                    email: 'joko1234@gmail.com',
                    password: 'jokoIntegration'
                })
                
                expect(resp.body).toHaveProperty('message')
                expect(resp.body.type).toBe('duplicate_data_error')
                expect(resp.status).toBe(409)
            })
        })
        
        describe('email & phone format is wrong', () => {
            it('cannot register because email format is wrong', async () => {
                const resp = await request(app)
                .post('/v1/api/register/user')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    fullname: 'Joko Integration',
                    address: 'pacitan',
                    phone: '084432145166',
                    email: 'joko12.com',
                    password: 'jokoIntegration'
                })
                
                expect(resp.body).toHaveProperty('message')
                expect(resp.body.message).toBe('Invalid email/phone number or password')
                expect(resp.body.type).toBe('invalid_request_error')
                expect(resp.status).toBe(400)
            })

            it('cannot register because phone format is wrong', async () => {
                const resp = await request(app)
                .post('/v1/api/register/user')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    fullname: 'Joko Integration',
                    address: 'pacitan',
                    phone: '084432145',
                    email: 'joko12@gmail.com',
                    password: 'jokoIntegration'
                })
                
                expect(resp.body).toHaveProperty('message')
                expect(resp.body.message).toBe('Invalid email/phone number or password')
                expect(resp.body.type).toBe('invalid_request_error')
                expect(resp.status).toBe(400)
        })

        describe('internal server error', () => {
            it('must be internal server error', async () => {
                const resp = await request(app)
                .post('/v1/api/register/user')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    undefined
                })
                
                expect(resp.body).toHaveProperty('message')
                expect(resp.body.type).toBe('api_error')
                expect(resp.status).toBe(500)
        })
            })
        })
    })

})