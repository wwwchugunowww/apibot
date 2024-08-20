const express = require("express");
const router = express.Router();
const handleCallback = require("../controller/handleCallbackController"); // Путь к контроллеру

// Маршрут для обработки входящих запросов
router.post("/handleCallback", handleCallback);

module.exports = router;
