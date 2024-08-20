const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Замените ваш токен на реальный
const token = "7163916049:AAGzzgjvJBYe3WuetEHzvH5qY2OULizh4r8";
const bot = new TelegramBot(token, { polling: true });

// Адрес для регистрации и получения данных
const url = "http://localhost:5000/registrationusers/registration";

// Состояние пользователей для отслеживания контекста
const userState = {};

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "👋 Привіт! Щоб продовжити, поділіться своїм номером телефону.",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "📞 Поділитися номером телефону",
              request_contact: true,
            },
          ],
        ],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    }
  );
});

// Функция для очистки номера телефона от символов и пробелов
const cleanPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/[^\d]/g, "");
};

// Обработчик получения контакта
bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  let phoneNumber = msg.contact.phone_number;

  // Очищаем номер телефона от символов и пробелов
  phoneNumber = cleanPhoneNumber(phoneNumber);

  if (!phoneNumber) {
    return bot.sendMessage(
      chatId,
      "⚠️ Телефонний номер не вказано. Будь ласка, спробуйте ще раз."
    );
  }

  try {
    // Проверяем состояние пользователя
    if (userState[chatId] && userState[chatId].action === "get_info") {
      // Запрос данных по chatid
      const response = await axios.post(url, {
        telephone_telegram: phoneNumber,
        chatid: chatId,
      });

      const data = response.data;

      if (!data || !data.telephone_telegram) {
        bot.sendMessage(
          chatId,
          "🔍 Ваші дані не знайдено. Переконайтеся, що ви правильно подали номер телефону."
        );
      } else {
        const terminalsString = data.terminals
          ? data.terminals.join(", ")
          : "Терміни не вказані";
        const message = `
          🎉 Ваш акаунт успішно активований!
          📞 Телефон: ${data.telephone_telegram || "Телефон не зазначено"}
          🏢 Компанія: ${data.company_name || "Компанія не зазначена"}
          👤 ПІБ: ${data.full_name || "ПІБ не зазначено"}
          📅 Зареєстровано: ${
            data.enrollment_date || "Дата реєстрації невідома"
          }
          📋 Мерчант: ${terminalsString}
        `;

        bot.sendMessage(chatId, message);

        // Отправляем сообщение о будущих обновлениях
      }

      // Очистка состояния
      delete userState[chatId];
    } else {
      // Регистрация
      const response = await axios.post(url, {
        telephone_telegram: phoneNumber,
        chatid: chatId,
      });

      const data = response.data;

      if (!data || !data.telephone_telegram) {
        bot.sendMessage(
          chatId,
          "⚠️ Ваші дані не знайдено. Будь ласка, зверніться до менеджера для уточнення інформації."
        );
      } else {
        const terminalsString = data.terminals
          ? data.terminals.join(", ")
          : "Терміни не вказані";

        const message = `
          🎉 Ваш акаунт успішно активований!
          📞 Телефон: ${data.telephone_telegram || "Телефон не зазначено"}
          🏢 Компанія: ${data.company_name || "Компанія не зазначена"}
          👤 ПІБ: ${data.full_name || "ПІБ не зазначено"}
          📅 Зареєстровано: ${
            data.enrollment_date || "Дата реєстрації невідома"
          }
          📋 Мерчант: ${terminalsString}
        `;

        bot.sendMessage(chatId, message, {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "📄 Особисті дані",
                },
              ],
            ],
            resize_keyboard: true,
            one_time_keyboard: false, // Кнопка всегда доступна
          },
        });
      }
    }
  } catch (error) {
    console.error("Помилка при отриманні даних з сервера:", error);
    bot.sendMessage(
      chatId,
      "❌ Нажаль, акаунт не знайдено в системі. Зверніться до менеджера для уточнення інформації. ❌"
    );
  }
});

// Обработчик кнопки "Особисті дані"
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "📄 Особисті дані") {
    // Устанавливаем состояние пользователя на получение информации
    userState[chatId] = { action: "get_info" };

    bot.sendMessage(
      chatId,
      "📝 Щоб отримати інформацію про ваш акаунт, поділіться своїм номером телефону.",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "📞 Поділитися номером телефону",
                request_contact: true,
              },
            ],
          ],
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      }
    );
  }
});

// Обработчик ошибок polling
bot.on("polling_error", (error) => console.log(`Polling error: ${error}`));
