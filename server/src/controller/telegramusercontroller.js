const db = require("../model/model"); // Импортируем модель userbot

class UsertelegramController {
  async registration(req, res) {
    try {
      const { phoneNumber } = req.query; // Извлекаем номер телефона из query params
      const telephone_telegram = phoneNumber;
      const userbot = await db.userbot.findOne({
        where: { telephone_telegram },
      });
      if (userbot) {
        res.json(userbot);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
    // console.log(req.body);
    // const { phoneNumber, chatId, username } = req.body;
    // console.log(phoneNumber, chatId, username);
    // res.send("Акаунта нет пошли нахуй");
  }
}

module.exports = new UsertelegramController();
