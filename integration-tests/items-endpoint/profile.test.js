require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const request = require('supertest');
const app = require('../../app')
const sequelize = require('../../db/config/config')
const { User } = require('../../db/models')
const bcrypt = require('bcrypt')
const generateToken  = require('../../lib/jwt')


   
describe('router: /v1/api/profile', () => {

    beforeAll(async () => {
        await sequelize.authenticate()
    })
        
    afterAll(async () => {
        await sequelize.close()
    })



    describe('should be successfull', () => {

        beforeEach( async () => {
            await User.create({
                fullname: 'Andi safarudin',
                address: 'pacitan',
                phone: '084432145166',
                email: 'andi@gmail.com',
                password: bcrypt.hashSync('jokoIntegration', 8),
                role: 'user'
            
            })
        })

        afterEach( async() => {
            const findUser = await User.findOne({where: {email: 'andi@gmail.com'}})
            await User.destroy({
                where: {id : findUser.id}
            })
        })
        
        it('success get profile', async () => {

            const findUser = await User.findOne({where: { email: 'andi@gmail.com' }})

            const payload = {
                id: findUser.id,
                role: findUser.role
            }
            const token = await generateToken(payload)
            
            const resp = await request(app)
                .get('/v1/api/profile')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('authorization', token )

            expect(resp.body).toHaveProperty('message')
            expect(resp.body.message).toBe('profile success')
            expect(resp.status).toBe(200)
        })
    })  

    describe('should be error', () => {
        describe('if not login', () => {
            it('because the token is null', async () => {

                const token = null
                
                const resp = await request(app)
                    .get('/v1/api/profile')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('authorization', token )
    
                expect(resp.status).toBe(401)
            })
        })
    })
})