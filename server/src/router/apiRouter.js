const Router = require("express");
const router = new Router();

const UsertelegramController = require("../controller/telegramUserController");

router.post("/paylink", UsertelegramController.searchByMerchant);

module.exports = router;
