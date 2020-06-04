const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const { Notification } = require('../../database/models');

router.use(authMiddleware);

router.get("/get", async (req, res) => {  
    console.log(req.body);
    try { 
      const notifications = await Notification.findAll();
      console.log(notifications.json());
      return res.status(200).json();
    } catch (err) {
      return res.status(400).json("Notification index failed");
    }
  });