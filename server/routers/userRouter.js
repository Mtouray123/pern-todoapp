const router = require('express').Router();
const authService = require('../service/authService');

const handleAsync = (callback) => async (req, res) => {
  try {
    const result = await callback(req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.post('/register', handleAsync(authService.register));
router.post('/login', handleAsync(authService.login));

module.exports = router;
