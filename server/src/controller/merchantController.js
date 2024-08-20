const db = require("../model/model"); 

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

  console.log(req.body, "req.body", req.query, "req.query");
    try {
      const { phoneNumber } = req.query; // Извлекаем номер телефона из query params
      const telephone_telegram = phoneNumber;
      const userbot = await db.userbot.findOne({
        where: { telephone_telegram },
      });
      const { chatId } = req.body;

      if (userbot) {
        userbot.chatid = chatId;

        await userbot.save();
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

exports.updateTerminalsByTelephoneTelegram = async (req, res) => {
  try {
    const { telephone_telegram, terminals } = req.body;

    // Проверка наличия необходимых данных
    if (!telephone_telegram || !terminals) {
      return res
        .status(400)
        .send("Missing required fields: telephone_telegram or terminals");
    }

    const [affectedRows] = await db.userbot.update(
      { terminals },
      {
        where: { telephone_telegram },
      }
    );

    if (affectedRows > 0) {
      // Получаем обновленные данные после обновления
      const updatedUserbot = await db.userbot.findOne({
        where: { telephone_telegram },
      });

      res.json({
        message: "Terminals updated successfully",
        data: updatedUserbot,
      });
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};



exports.sendbtn = async (req, res) => {
  console.log(req.body);
  const { chatId, callbackData } = req.body;



  return res.send("готово");

  
};

exports.findTerminal = async (req, res) => {
  try {
    const { terminal } = req.query; // Извлекаем номер телефона из query params
    const terminals = terminal;
    const userbot = await db.userbot.findOne({
      where: { terminals },
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


exports.findTerminalByKey = async (req, res) => {
  const { key, value } = req.query;
  try {
    const result = await db.sequelize.query(
      `
      SELECT *
      FROM "userbot"
      WHERE jsonb_array_elements_text(terminals->'${key}') LIKE '%${value}%'
    `,
      { type: db.Sequelize.QueryTypes.SELECT }
    );

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("No matching records found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};





exports.editUserbot = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const updateData = req.body; // Get the updated data from the request body

    // Find the userbot by ID and update it with the provided data
    const [updated] = await Userbot.update(updateData, {
      where: { id: id },
    });

    if (updated) {
      const updatedUserbot = await Userbot.findOne({ where: { id: id } });
      res
        .status(200)
        .json({
          message: "Userbot updated successfully",
          userbot: updatedUserbot,
        });
    } else {
      res.status(404).json({ message: "Userbot not found" });
    }
  } catch (error) {
    console.error("Error updating userbot:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while updating the userbot",
        error: error.message,
      });
  }
};


exports.apiPayLink = async (req, res) => {
    console.log(req.body);
    return res.send("готово");
};