const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/details/:id', (req, res) => {
  const id = req.params.id
  const sqlText = `SELECT name FROM "genres" as g
  JOIN movies_genres as mg ON mg."genre_id" = g."id"
  JOIN movies as m ON  m."id" = mg."movie_id"
  WHERE m.id= $1 ;`
  pool.query(sqlText, [id]).then((response) => {
    console.log(response.rows)
    res.send(response.rows)
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500)
  })
});

router.get('/', (req, res) => {
  const query = `SELECT * FROM genres`
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      res.sendStatus(500);
    })
});

module.exports = router;