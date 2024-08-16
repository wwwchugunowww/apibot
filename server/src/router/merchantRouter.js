const express = require("express");
const router = express.Router();
const userbotController = require("../controller/merchantController");

router.get("/userbots", userbotController.getAllUserbots);
router.post("/userbots", userbotController.createUserbot);
router.put("/userbots/:id", userbotController.updateUserbot);
router.delete("/userbots/:id", userbotController.deleteUserbot);
router.get("/userbots/search", userbotController.findUserbotByPhoneNumber);
router.post(
  "/userbots/update-terminals",
  userbotController.updateTerminalsByTelephoneTelegram
);
router.get("/userbots/search-terminal", userbotController.findTerminal);
router.get("/userbots/terminals", userbotController.findTerminalByKey);


router.post("/userbots/sendbtn", userbotController.sendbtn);


module.exports = router;
