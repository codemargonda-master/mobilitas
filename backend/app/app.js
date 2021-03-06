const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()

app.use(bodyParser.urlencoded({extended: true})) // support x-www-form-urlencoded
app.use(bodyParser.json())


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ccc_system'
})

connection.connect(function (err) {
  if (!err) {
    console.log('Database is connected ...')
  } else {
    console.log('Error connecting database ... ')
  }
})

app.get('/', function (req, res) {
  res.send({msg: 'Hello from server!'})
})

app.post('/auth', function (req, res) {

  // get data
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  var query = 'SELECT count(*) as count FROM account WHERE email= ' + mysql.escape(data.email)

  connection.query(query, function (error, rows) {
    if (rows[0].count != 1) {
      connection.query('INSERT INTO account set ? ', data, function(error, rows) {
        if (error) {
          res.send(error)
        }
        res.status(200).json({success: true, msg: 'Insert Success'})
        console.log('Insert Success')
      })
    } else if (rows[0].count = 1) {
      res.status(401).json({success: false, msg: 'Data already exist!'})
      console.log('Data already exist!')
    } else {
      res.send(error)
    }
  })
})

app.post('/signin', function (req, res) {
  var data = {
    email: req.body.email,
    password: req.body.password
  }

  var query = 'SELECT *,count(*) as count FROM account WHERE email= ' + mysql.escape(data.email) + ' AND password= ' + mysql.escape(data.password) + ''

  connection.query(query, function (error, rows, fields) {
    if (rows[0].count != 1) {
      res.status(401).json({success: 'false', msg: 'Data invalid'})
      console.log('Data invalid!')
    } else if (rows[0].count = 1) {
      res.status(200).json({success: 'true', msg: 'User Exist', email: rows[0].email, password: rows[0].password})
      console.log('Login successfully!')
    } else {
      res.send(error)
    }
  })
})

app.post('/regis', function(req, res) {

  // get data
  var data = {
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    lasteducation: req.body.lasteducation,
    course: req.body.course,
    batch: req.body.batch
  }

  var query = 'SELECT count(*) as count FROM course_registration WHERE batch= ' + mysql.escape(data.batch) + 'AND course= ' + mysql.escape(data.course)

  connection.query(query, function(error, rows) {
    if (rows[0].count != 1) {
      connection.query('INSERT INTO course_registration set ? ', data, function(error, rows) {
        if (error) {
          res.send(error)
        }
        res.status(200).json({success: true, msg: 'Registration Success'})
        console.log('Registration Success')
      })
    } else if (rows[0].count = 1) {
      res.status(401).json({success: false, msg: 'Batch already registered!'})
      console.log('Batch already registered!')
    } else {
      res.send(error)
    }
  })

})

app.get('/course-registered', function(req, res) {

  var query = 'SELECT course, batch FROM course_registration'

  connection.query(query, function(error, rows, fields) {
    if (error) {
      res.send(error)
    }

    let datas = []
    datas = rows;
    console.log('rows', rows);

    res.status(200).send(datas)
    console.log('Data Sent!')
  })

})

app.post('/subscribe', function (req, res) {
  var data = {
    email: req.body.email
  }

  var query = 'SELECT *,count(*) as count FROM subscribe WHERE email= ' + mysql.escape(data.email) + ''

  connection.query(query, function (error, rows) {
    if (rows[0].count != 1) {
      connection.query('INSERT INTO subscribe set ? ', data, function(error, rows) {
        if (error) {
          res.send(error)
        }
        res.status(200).json({success: 'true', msg: 'Subscribe success!'})
        console.log('Subscribe success!')
      })
    } else if (rows[0].count = 1) {
      res.status(401).json({success: 'false', msg: 'Email already exist!'})
      console.log('Email already exist!')
    } else {
      res.send(error)
    }
  })
})

module.exports = app
