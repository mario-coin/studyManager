const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

const { User } = require('../../database/models');

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    // console.log('########################################################');
    // console.log('----------------------------------->', req.body);
    
    await User.count({ where: {username: username }})
      .then(async c => {
        if(c == 0){
          user = await User.create(req.body);
        }
      });

    // return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: "User registration failed" });
  }
});

router.post("/authenticate", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: "Invalid password" });
    }

    return res.json({
      user,
      token: user.generateToken()
    });
  } catch (err) {
    return res.status(400).json({ error: "User authentication failed" });
  }
});

router.use(authMiddleware);

router.get("/getAll", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json({ users });
  } catch (err) {
    return res.status(400).json({ error: "Can't get user information" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const { id } = req;

    const user = await User.findById(id);

    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ error: "Can't get user information" });
  }
});

module.exports = router;
