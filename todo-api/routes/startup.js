const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://todo-db:27017/'
const router = require('express').Router()
const dbName = 'todo-app'
const collectionName = 'task'

router.get('/', (req, res, next) => {
    mongoClient.connect(url, { useUnifiedTopology: true }, (error, db) => {
        if (error) throw error
        const dbObj = db.db(dbName)
        dbObj.collection(collectionName).find({}).toArray((error, result) => {
            if (error) throw error
            console.log('no query records: ', result.length)
            tasks = {data: result}
            res.send(tasks)
            db.close()
        })
    })
})

module.exports = router