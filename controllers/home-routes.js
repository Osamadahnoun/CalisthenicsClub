const router = require('express').Router();

router.get('/workoutLog', (req, res) => {
  res.render('homepage');
});

router.get('/', (req, res) => {
    res.render('login');
  });
  
router.get('/signup', (req, res) => {
    res.render('signup');
  });
  

module.exports = router;
