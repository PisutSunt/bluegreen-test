const mongoClient = require('mongodb').MongoClient
const url = (process.env.MONGO_CONNECTION || 'mongodb://todo-db:27017/')
const router = require('express').Router()
const dbName = 'todo-app'
const collectionName = 'task'

insert = record => {
    mongoClient.connect(url, { useUnifiedTopology: true }, (error, db) => {
        if (error) throw error
        const dbObj = db.db(dbName)
        dbObj.collection(collectionName).insertOne(record, (error) => {
            if (error) throw error
            console.log('inserted record: ', record)
            db.close()
        })
    })
}

router.post('/', (req, res, next) => {
    let record = req.body
    insert(record)
})

module.exports = router