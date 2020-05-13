const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

const { User } = require('../../database/models');

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // console.log('########################################################');
    // console.log('----------------------------------->', req.body);
    
    let count = await User.count({ where: {username: username }});
    if(count == 0){
      user = await User.create(req.body);
    }
    else{
      return res.status(400).json("User already exists");
    }
    
    return res.status(200).json();
  } catch (err) {
    return res.status(400).json("User registration failed");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    
    if (!user) {
      return res.status(400).json("User not found");
    }
    
    if (!(await user.compareHash(password))) {
      return res.status(400).json("Invalid password");
    }
    
    return res.json(user.generateToken());
  } catch (err) {
    return res.status(400).json("User authentication failed");
  }
});

router.use(authMiddleware);

router.get("/getAll", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json({ users });
  } catch (err) {
    return res.status(400).json("Can't get user information");
  }
});

router.get("/get", async (req, res) => {
  try {
    const { id } = req;

    const user = await User.findById(id);

    return res.json({ user });
  } catch (err) {
    return res.status(400).json("Can't get user information");
  }
});

module.exports = router;
