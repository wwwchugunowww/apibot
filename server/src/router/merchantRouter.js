const express = require("express");
const router = express.Router();
const userbotController = require("../controller/merchantController");

router.get("/userbots", userbotController.getAllUserbots);
router.post("/userbots", userbotController.createUserbot);
router.post("/userbots/:id", userbotController.updateUserbot);
router.delete("/userbots/:id", userbotController.deleteUserbot);
router.get("/userbots/search", userbotController.findUserbotByPhoneNumber);
router.post(
  "/userbots/update-terminals",
  userbotController.updateTerminalsByTelephoneTelegram
);
router.get("/userbots/search-terminal", userbotController.findTerminal);
router.get("/userbots/terminals", userbotController.findTerminalByKey);


router.post("/userbots/sendbtn", userbotController.sendbtn);


router.post("/api/paylink", userbotController.apiPayLink);


module.exports = router;
