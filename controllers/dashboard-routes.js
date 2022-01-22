const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/forums', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'title',
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('forums', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/beginner', (req, res) => {
    res.render('beginner');
  });

  
  router.get('/intermediate', (req, res) => {
    res.render('intermediate');
  });

  
  router.get('/advanced', (req, res) => {
    res.render('advanced');
  });

  
  router.get('/veryAdvanced', (req, res) => {
    res.render('veryAdvanced');
  });
  

module.exports = router;
