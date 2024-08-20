const { userbot } = require("../model/model");

const { Sequelize } = require("sequelize");

class UsertelegramController {
  async registration(req, res) {
    try {
      const { telephone_telegram, chatid } = req.body;

      // Поиск пользователя по номеру телефона
      const user = await userbot.findOne({
        where: { telephone_telegram },
      });

      if (user) {
        // Если пользователь найден, обновляем его chatid
        user.chatid = chatid;
        await user.save();

        // Форматируем дату регистрации для отображения
        const enrollmentDate = user.enrollment_date
          ? new Date(user.enrollment_date).toLocaleDateString()
          : "Дата регистрации неизвестна";

        // Возвращаем обновлённого пользователя
        return res.status(200).json({
          telephone_telegram: user.telephone_telegram || "Телефон неизвестен",
          company_name: user.company_name || "Компания неизвестна",
          full_name: user.full_name || "ФИО неизвестно",
          enrollment_date: enrollmentDate,
          terminals: user.terminals
        });
      } else {
        // Если пользователь не найден, возвращаем сообщение
        return res.status(404).json({
          message: "Account not registered. Please contact the manager.",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred during registration.",
        error: error.message,
      });
    }
  }

   async searchByMerchant(req, res) {
  try {
    const { merchant } = req.body; 
    const foundUserbot = await userbot.findOne({
      where: {
        terminals: [{ merchant }]
      }}
        )

    if (!foundUserbot) {
      return res.status(404).json({ message: 'Userbot not found' });
    }

    res.status(200).json(foundUserbot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
}

module.exports = new UsertelegramController();
