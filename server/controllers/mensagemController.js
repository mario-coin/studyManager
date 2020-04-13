const router = require("express").Router();

router.get("/hello", async (req, res) => {
  res.send({ express: 'let the games begin' });
});

module.exports = router;
