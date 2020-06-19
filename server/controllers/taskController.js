const router = require("express").Router();
const { Op } = require("sequelize");
const authMiddleware = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { Task } = require('../../database/models');

router.use(authMiddleware);

router.get("/get", async (req, res) => {
  const { filter, order, orderBy, rowsPerPage, page } = req.query;

  let authHeader = req.headers.authorization;
  const [scheme, token] = authHeader.split(" ");
  const decoded = await promisify(jwt.verify)(token, "secret");
  req.body.id_user = decoded.id;

  try {
    let where = {};
    if(filter.length > 0)
      where[Op.or] = [
        { name: filter },
        { description: filter }
      ];

    let tasks = await Task.findAll({
      where:{
        id_user: req.body.id_user
      },
      order: [
        [orderBy, order.toUpperCase()]
      ],
      limit: +rowsPerPage,
      offset: page * rowsPerPage
    });
    let count = await Task.count({ where });
    
    return res.status(200).json({ tasks, count });
  } catch (err) {
    return res.status(400).json("Task index failed");
  }
});

router.post('/create',async (req,res) => {
    let authHeader = req.headers.authorization;

    const [scheme, token] = authHeader.split(" ");
  
    const decoded = await promisify(jwt.verify)(token, "secret");
    
    req.body.id_user = decoded.id;

  try {
    task = await Task.create(req.body);
    return res.status(200).json();

  } catch (err) {
    return res.status(400).json("Task registration failed");
  }
  
});

router.delete('/delete/:id', async (req,res) => {
  try{
    const  { id }  = req.params;
    const task = await Task.findByPk(id);
    await task.destroy(req.body);
    return res.status(200).json("Task deleted");
  } catch (err) {
    return res.status(400).json("Task not deleted");
  };
})

router.put('/edit/:id', async (req,res) => {
  const  { id }  = req.params;
  try{
    const task = await Task.findByPk(id);
    await task.update(req.body);
    return res.status(200).json(req.body);
  }catch(err){
    return res.status(400).json("Task alteration failed");
  }
});

router.get('/edit/:id', async (req, res) => {
  const {id} = req.params;
  try{
    let task = await Task.findByPk(id);
    return res.status(200).json({task});
  }catch(err){
    return res.status(400).json("Cannot get");
  }
});

router.get("/autocomplete", async (req, res) => {
  // const { filter, order, orderBy, rowsPerPage, page } = req.query;

  // console.log('########################################################');
  // console.log('----------------------------------->', req.query);

  try {
    let tasks = await Task.findAll({
      attributes: ['id', 'name'],
      order: [
        ['name', 'ASC']
      ]
    });
    
    return res.status(200).json({ tasks });
  } catch (err) {
    console.log(err);
    return res.status(400).json("Task autocomplete failed");
  }
});

module.exports = router;