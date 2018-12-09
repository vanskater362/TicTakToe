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
    resave: false,
    saveUninitialized: true,
  }))
  //.use(bodyParser.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('./public/home.html'))
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
    var result = {success: false};
    
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
          res.json(result);
      });
    });
  })
  .post('/p1login', async (req, response) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);
    var result = {success: false};
    var check = 'SELECT username, password FROM players WHERE username = $1 AND password = $2';
    const client = await pool.connect();

    client.query(check, [username, password], function(err, res){
      if(!res){
        console.log("Fail User doesn't match");
      }
      else {
        /*bcrypt.compare(password, result[0].password, function(err, res){
          if(!res) {
            response.json({success: false});
            console.log("Fail: Password doesn't match");
          }
          else {
            req.session.user = req.body.username;
            response.json({success: true});
          }
        });*/
        result = {success: true};
        console.log("res");
        console.log("Success!");
      }
      response.json(result);
    });
    client.release();  
  })
  .get('/p2login', async (req, res) => {
    var username = req.body.player2;
    var password = req.body.p2pass;
    console.log("the user name is " + username);
    console.log("the password is " + password);
    const client = await pool.connect()
    const result = await client.query({text: 'SELECT username, password FROM players WHERE username = $1 AND password = $2', values: [username, password]});
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))