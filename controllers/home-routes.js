const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Log } = require('../models');
const withAuth = require('../utils/auth');

router.get('/workoutLog', withAuth, (req, res) => {
  Log.findAll({
    where: {
      user_id: req.session.user_id
    },
    order: [['created_at', 'DESC']],
    attributes: ['id','title', 'body', 'exercises', 'time', 'calories_burned', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbLogData => {

    const logs = dbLogData.map(log => log.get({ plain: true }));
    res.render('homepage', {
      logs,
      layout: 'logtemplate',
      loggedIn: req.session.loggedIn,
  });
})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
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
  
router.get('/post/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'body',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', { 
          post,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/editlog/:id', withAuth, (req, res) => {
  Log.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'body',
      'exercises',
      'time',
      'calories_burned',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbLogData => {
      if (!dbLogData) {
        res.status(404).json({ message: 'No log found with this id' });
        return;
      }

      // serialize the data
      const log = dbLogData.get({ plain: true });
      
      res.render('editlog', { 
          log,
          loggedIn: req.session.loggedIn
        });
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
