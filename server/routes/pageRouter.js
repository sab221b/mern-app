var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
//   res.setHeader('user_id', Number(req.session.user_id));
//   req.params.id = req.session.user_id;
//   const userData = await greetUser(req, res);
  res.status(200).render('index', { title: 'Sab Pro' });
});

module.exports = router;