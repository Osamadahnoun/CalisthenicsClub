const router = require('express').Router();

router.get('/workoutLog', (req, res) => {
  console.log(req.session)
  res.render('homepage');
});

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/workoutLog');
        return;
      }

    res.render('login');
  });
  
router.get('/signup', (req, res) => {
    res.render('signup');
  });
  

module.exports = router;
