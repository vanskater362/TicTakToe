const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT username, wins, losses, draws, points FROM players INNER JOIN record ON players.id = record.playerID ORDER BY record.points DESC');
      //const result = await client.query('SELECT username FROM players');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/register', register)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  function register () {
    var username = request.query.username 
    var pass = request.query.password
    
    var options = {username: username, pass: pass};

    res.render('pages/results', options);
  }