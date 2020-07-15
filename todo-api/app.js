var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var cors = require('cors');

const mongoClient = require('mongodb').MongoClient
const url = process.env.MONGO_CONNECTION_STRING || 'mongodb://db:27017'
const dbName = 'todo'
const collectionName = 'task'

// var insertTaskRouter = require('./routes/insertTask');
// var removeTaskRouter = require('./routes/removeTask');
// var startupRouter = require('./routes/startup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'http://localhost',
//   credentials: true
// }));

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/startup', async (req, res) => {
  mongoClient.connect(url, (error, db) => {
      if (error) throw error
      const dbObj = db.db(dbName)
      dbObj.collection(collectionName).find({}).toArray((error, result) => {
          if (error) throw error
          console.log('no query records: ', result.length)
          console.log(result)
          res.json({
              data: result
            })
          db.close()
      })
  })
})


const insert = (record, callback) => {
  mongoClient.connect(url, { useUnifiedTopology: true }, (error, db) => {
      if (error) throw error
      const dbObj = db.db(dbName)
      dbObj.collection(collectionName).insertOne(record, (error) => {
        if (error) {
          return callback(error);
        }
        console.log('inserted record: ', record)
        db.close()
        return callback(null, record);
      })
  })
}

app.post('/insert', (req, res) => {
  const newRecord = req.body;
  insert(newRecord, (error, record) => {
    if (error) {
      return res.json({ success: false, message: error.toString() });
    }
    return res.json({ success: true, record });
  });
});

const remove = record => {
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

app.post('/remove', (req, res) => {
  let record = req.body
  remove(record)
  console.log(record)
  res.send(record)
})

// app.use('/insert', insertTaskRouter);
// app.use('/remove', removeTaskRouter);
// app.use('/startup', startupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
