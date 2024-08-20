const express = require("express");
const router = express.Router();
const userbotController = require("../controller/merchantController");

router.post("/userbots", userbotController.createUserbot); //+
router.post("/userbots/:id", userbotController.updateUserbot);
router.delete("/userbots/:id", userbotController.deleteUserbot);
router.post("/userbots/search", userbotController.findUserbotByPhoneNumber);
router.post(
  "/userbots/update-terminals",
  userbotController.updateTerminalsByTelephoneTelegram
);
router.get("/userbots/search-terminal", userbotController.findTerminal);
router.get("/userbots/terminals", userbotController.findTerminalByKey);
router.post("/userbots/sendbtn", userbotController.sendbtn);





router.post("/api/paylink", userbotController.apiPayLink);
router.get("/api/getmerchant", userbotController.getAllUserbots);
router.get("/api/getmerchant/edit/:id", userbotController.editUserbot);


module.exports = router;
