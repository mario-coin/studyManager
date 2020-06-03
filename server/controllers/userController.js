const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const crypto = require('crypto');
const { User } = require('../../database/models');
const mailer = require('../modules/mailer');

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

router.post('/forgot', async (req,res) => {
  const { email } = req.body;
  
  try {
    const em = await User.findOne({ where: { email: email } });
    if (!em){
      return res.status(400).json("Email not found in database");
    }
    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1);


    await User.update({passwordResetExpires: now, passwordResetToken: token,},
      {where: {
        id: em.id
        }
      });

    mailer.sendMail({
      to: email,
      from: 'forgot@studymanager.com',
      subject: 'Link To Reset Password',
      html: 'You are receiving this baceause you (or someone else) have requested the reset of the password for your account.<br><br>'
             + 'Please click ' + `<a href='http://localhost:3000/reset/${token}'>here</a>` + ' to complete the process within one hour of receiving it.<br><br>'
             + 'If you did not request this, please ignore this email and your password will remain unchanged',
    }, (err) => {
      if (err)
        return res.status(400).json({ error: 'Cannot send forgot password email' });
      return res.status(200).json();
    })
  } catch(err) {
    res.status(400).json({ error: 'Error on forgot password, try again please!'});
  }
});

router.post('/reset', async (req,res) => {
  const { password, token, email } = req.body;

  try{
    const user = await User.findOne({ where: { email: email} })
    
    if (!user)
      return res.status(400).json('User not found' );
    
    if (token !== user.passwordResetToken)
      return res.status(400).json('Token Invalid' );

    const now = new Date();

    if (now > user.passwordResetExpires)
      return res.status(400).json('Token expired, generate other one' );
  
    user.password = password;

    user.passwordResetExpires = null;
    user.passwordResetToken = null;
    await user.save();

    return res.status(200).json();
    
    }catch(err) {
      res.status(400).json('Cannot reset password, try again please!');
  }

});

router.get('/reset/:token', async (req,res) => {
  try{
    console.log('CHEGUEI NO GET');
  } catch (err){
    res.status(400).json({ error: 'Falha no get'});
  }
  res.status(200).json();
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
