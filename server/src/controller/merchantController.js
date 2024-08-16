const db = require("../model/model"); // Импортируем модель userbot

// Получаем все записи
exports.getAllUserbots = async (req, res) => {
  try {
    const userbots = await db.userbot.findAll();
    res.json(userbots);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Создаем новую запись
exports.createUserbot = async (req, res) => {
  try {
    const newUserbot = await db.userbot.create(req.body);
    res.status(201).json(newUserbot);
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad request");
  }
};




// Обновляем запись по ID
exports.updateUserbot = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserbot = await db.userbot.update(req.body, {
      where: { id: Number(id) },
      returning: true,
    });
    res.json(updatedUserbot[0]);
  } catch (error) {
    console.error(error);
    res.status(404).send("Not found");
  }
};

// Удаляем запись по ID
exports.deleteUserbot = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await db.userbot.destroy({
      where: { id: Number(id) },
    });
    if (deletedRows > 0) {
      res.status(204).end(); // No content
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.findUserbotByPhoneNumber = async (req, res) => {
    try {
      const { phoneNumber } = req.query; // Извлекаем номер телефона из query params
      const telephone_telegram = phoneNumber;
      const userbot = await db.userbot.findOne({
        where: { telephone_telegram },
      });
      if (userbot) {
        res.json(userbot);
      } else {
        res.send("Акаунта нет пошли нахуй");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
    // console.log(req.body);
    // const { phoneNumber, chatId, username } = req.body;
    // console.log(phoneNumber, chatId, username);
  
};
