'use strict'

const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
    db.query("SELECT * FROM client", async function(err, results, fields) {
        if (err) throw err;
        return await res.render('remote', {
            env: process.env,
            data: JSON.parse(JSON.stringify(results)),
            req: req
        });
    })
});
module.exports = router;