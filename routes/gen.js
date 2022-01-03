const express = require(`express`);
const router = express.Router();

router.get(`/`, (req, res) => {
  res.render(`gen/index`);
});

module.exports = router;