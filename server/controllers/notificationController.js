const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const { Notification } = require("../../database/models");

router.use(authMiddleware);

router.get("/get", async (req, res) => {  
    try {
      let notifications = await Notification.findAll();
      return res.status(200).json({notifications});
    } catch (err) {
      return res.status(400).json("Notification index failed");
    }
  });

module.exports = router;