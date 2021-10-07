const express = require('express');
const router = express.Router();
//Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/');
    }
});
router.get('/', (req, res) => {
    res.render("home.ejs");
});
module.exports = router;