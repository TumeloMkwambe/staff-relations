const express = require('express');
const router = express.Router();

// only define routes here, no express app middleware

router.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated());
    res.render("index", {
        'user': req.oidc.user
    });
});

module.exports = router;