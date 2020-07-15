const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://todo-db:27017/'
const router = require('express').Router()
const dbName = 'todo-app'
const collectionName = 'task'

remove = record => {
    mongoClient.connect(url, { useUnifiedTopology: true }, (error, db) => {
        if (error) throw error
        const dbObj = db.db(dbName)
        dbObj.collection(collectionName).deleteOne({'key': record.key}, (error, obj) => {
            if (error) throw error
            console.log('removed record: ', record.key)
            db.close()
        })
    })
}

router.post('/', (req, res, next) => {
    let record = req.body
    remove(record)
    console.log(record)
    res.send(record)
})

module.exports = router