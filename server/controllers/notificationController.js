const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const { Notification } = require("../../database/models");
const { Task } = require("../../database/models");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { response } = require("express");

router.use(authMiddleware);

router.get("/get", async (req, res) => {  
    try {
      let authHeader = req.headers.authorization;
      const [scheme, token] = authHeader.split(" ");
      const decoded = await promisify(jwt.verify)(token, "secret");
      req.body.id_user = decoded.id;
      let notifications = await Notification.findAll({
        where: {id_user: req.body.id_user},
        order: [['createdAt', 'DESC']]
      });
      return res.status(200).json({notifications});
    } catch (err) {
      return res.status(400).json("Notification index failed");
    }
  });

router.post("/create/:id_task", async (req, res) =>{
  try{
    let authHeader = req.headers.authorization;
    const [scheme, token] = authHeader.split(" ");
    const decoded = await promisify(jwt.verify)(token, "secret");
    req.body.id_user = decoded.id;
    const {id_task} = req.params;
    const {name, description, type, deadline} = req.body;
    const notification = await Notification.create({
      title: name,
      description: description,
      viewed: false,
      type: type,
      deadline,
      id_user: req.body.id_user,
      id_task: id_task
    });
    return res.json(200).json();
  }catch{
    return res.json(400).json("Notification cannot be created");
  }
})

router.put("/edit/:id", async (req,res) => {
  try{
    const notification = await Notification.findOne({
      where: { id_task: req.params.id}
    })
    const {name, description, type, deadline} = req.body;
    notification.update({
      title: name,
      description: description,
      type: type,
      deadline: deadline
    });
    return res.status(200).json();
  }catch(err){
    return res.status(400).json("Notification alteration failed");
  }
});

module.exports = router;