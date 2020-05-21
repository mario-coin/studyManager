const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

const { Task } = require('../../database/models');

router.use(authMiddleware);

router.get("/get", async (req, res) => {
  const { username, password } = req.body;

  try {
    return res.status(200).json(await Task.findAll());
  } catch (err) {
    return res.status(400).json("Task index failed");
  }
});

router.post('/create',async (req,res) => {
  console.log('########################################################');
  console.log('----------------------------------->', req.body);

  try{
    Task = await Task.create(req.body);
    return res.status(200).json(req.body);

  } catch (err) {
    return res.status(400).json("Task registration failed");
  }
  
});


router.put('/edit/:id', async (req,res) => {
  const  { id }  = req.params;
  console.log('id: ', id);
  try{
    const task = await Task.findByPk(id);
    await task.update(req.body);
    return res.status(200).json(req.body);
  }catch(err){
    return res.status(400).json("Task alteration failed");
  }
});

module.exports = router;