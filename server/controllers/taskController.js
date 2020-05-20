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
    return res.status(200).json();

  } catch (err) {
    return res.status(400).json("Task registration failed");
  }
  
});

router.delete('/delete/:id', async (req,res) => {
  try{
    const  { id }  = req.params;
    const task = await Task.findByPk(id);
    console.log('dkfpsakd', id);
    await task.destroy(req.body);
    return res.status(200).json("Task deleted");

  } catch (err) {
    return res.status(400).json("Task not deleted");
  };
})

module.exports = router;