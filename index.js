const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .use(express.json())
  .use(session({
    secret: 'Pretzles-smarties-BabyMonitor!',
    resave: true,
    //store: true,
    saveUninitialized: true,
  }))
  //.use(bodyParser.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function (req, res){
    ses=req.session;
    ses=registered;
    ses.player1;
    ses.player2;
  })
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT username, wins, losses, draws, points FROM players INNER JOIN record ON players.id = record.playerID ORDER BY record.points DESC');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .post('/register', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    
    var insertP = 'INSERT INTO players (username, password) VALUES($1,$2) RETURNING id';
    var insertR = 'INSERT INTO record (wins, losses, draws, points, playerID) VALUES (0,0,0,0,$1)';
    const client = await pool.connect()

    bcrypt.hash(password, 10, function(err, hash){
      client.query(insertP, [username, hash], function(err, result){
          if (!result){
            result = {success: false};
          } else {
            var playerid = result.rows[0].id;
            client.query(insertR, [playerid]);
            result = {success: true};
            client.release();
          }
          ses.registered = username;
          res.json(result);
      });
    });
  })
  .post('/p1login', async (req, response) => {
    var username = req.body.username;
    var password = req.body.password;
    var hashedpass = null;
    //var sql = 'SELECT username, password FROM players WHERE username = $1::text';
    const client = await pool.connect();

    client.query('SELECT password FROM players WHERE username = $1', [username], function(err, res){
      if(res.rows.length === 0){
        res = {success: false, message: "Login Error: User not found!"};
        response.json(res);
        console.log("Fail User doesn't match");
      }
      else {
        hashedpass = res.rows[0].password;
        bcrypt.compare(password, hashedpass, function(err, ress){
          if(!ress) {
            ress = {success: false, message: "Login Error: Password doesn't match!"};
            console.log("Fail: Password doesn't match");
          }
          else {
            ses = req.sessioin;
            ses.player1 = username;
            ress = {success: true, message: "Successful Login!"};
            console.log("Success!");
          }
          response.json(ress);
        });
      }
    });
    client.release();  
  })
  .post('/p2login', async (req, response) => {
    var username = req.body.username;
    var password = req.body.password;
    var hashedpass = null;
    var result = {success: false};
    //var sql = 'SELECT username, password FROM players WHERE username = $1::text';
    const client = await pool.connect();

    client.query('SELECT password FROM players WHERE username = $1', [username], function(err, res){
      if(res.rows.length === 0){
        res = {success: false, message: "Login Error: User not found!"};
        response.json(res);
        console.log("Fail User doesn't match");
      }
      else {
        hashedpass = res.rows[0].password;
        bcrypt.compare(password, hashedpass, function(err, ress){
          if(!ress) {
            ress = {success: false, message: "Login Error: Password doesn't match!"};
            console.log("Fail: Password doesn't match");
          }
          else {
            req.session.player2 = username;
            ress = {success: true, message: "Successful Login!"};
            console.log("Success!");
          }
          response.json(ress);
        });
      }
    });
    client.release();  
  })

  .post('/getrecord', async (req, response) => {
    var sql = 'SELECT wins, losses, draws, points FROM record WHERE playerid = $playerid;';
  })
  .post('/updateRecord', async (req, response) => {
    var sqlwinner = 'UPDATE wins';
    var sqllose;
    var sqldraw;
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))