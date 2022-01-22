const router = require('express').Router();

router.get('/workoutLog', (req, res) => {
  res.render('homepage');
});

module.exports = router;
