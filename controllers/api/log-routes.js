const router = require('express').Router();
const { Log, User } = require('../../models');

router.get('/', (req, res) => {
    Log.findAll({
      attributes: ['id','title', 'body', 'exercises', 'time', 'calories_burned'],
      include: [
        {
          model: User,
          attributes: ['username', 'id']
        }
      ]
    })
      .then(dbLogData => res.json(dbLogData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Log.findAll({
      where: {
        user_id: req.params.id
      },
      attributes: ['id', 'title', 'body', 'exercises', 'time', 'calories_burned', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username', 'id']
        }
      ]
    })
      .then(dbLogData => {
        if (!dbLogData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbLogData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', (req, res) => {
    Log.create({
      title: req.body.title,
      body: req.body.body,
      exercises: req.body.exercises,
      time: req.body.time,
      calories_burned: req.body.calories_burned,
      user_id: req.body.user_id
    })
      .then(dbLogData => res.json(dbLogData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router