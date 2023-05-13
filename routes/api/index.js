const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');


//http://localhost:3001/api/users
//http://localhost:3001/api/thoughts
router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;