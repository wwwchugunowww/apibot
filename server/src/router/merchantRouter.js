const express = require("express");
const router = express.Router();
const userbotController = require("../controller/merchantController");

router.get("/userbots", userbotController.getAllUserbots);
router.post("/userbots", userbotController.createUserbot);
router.put("/userbots/:id", userbotController.updateUserbot);
router.delete("/userbots/:id", userbotController.deleteUserbot);
router.get("/userbots/search", userbotController.findUserbotByPhoneNumber);


module.exports = router;
