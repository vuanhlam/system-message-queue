'use strict'

const mongoose = require('mongoose')

const connectString = 'mongodb://localhost:27017/shopDev'

const TestSchema = new mongoose.Schema({ name: String })
const Test = mongoose.model('Test', TestSchema)

describe('Mongoose connection', () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(connectString)
    })

    // close the connection to mongoose
    afterAll(async () => {
        await connection.disconnect()
    })

    it('should connect to mongoose', () => {
        expect(mongoose.connection.readyState).toBe(1)
    })

    it('should save a document to the database', async () => {
        const user = new Test({ name: 'Vu Anh Lam' })
        await user.save()
        expect(user.isNew).toBe(false)
    })

    it('should find a document to the database', async () => {
        const user = await Test.findOne({ name: 'Vu Anh Lam' })
        expect(user).toBeDefined()
        expect(user.name).toBe('Vu Anh Lam')
    })
})