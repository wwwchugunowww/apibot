const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
// const { updateUserbot } = require("../controller/merchantController");

// Замените этот токен на токен вашего Telegram-бота
const token = "7163916049:AAGzzgjvJBYe3WuetEHzvH5qY2OULizh4r8";

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

const terminalStates = {};

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Привет! Пожалуйста, поделитесь своим номером телефона.",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Поделиться номером телефона",
              request_contact: true,
            },
          ],
        ],
        one_time_keyboard: true,
      },
    }
  );
});

// Обработка получения контакта (номера телефона)
bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact.phone_number;
  const phone = phoneNumber.slice(1);

  try {
    const response = await axios.get(
      `http://localhost:5000/merchant/userbots/search?phoneNumber=%2B${phone}`
    );
    const data = response.data;
    await axios.put(`http://localhost:5000/merchant/userbots/${data.id}`, {
      chatid: chatId,
    });

    // const terminals = data.terminals;

    const terminalsArray = data.terminals;
    const terminalKeysAndValues = terminalsArray.map((terminal) => {
      return Object.entries(terminal).map(([key, value]) => ({ key, value }));
    });

    console.log(terminalKeysAndValues);

    // terminalStates[chatId] = {};
    // terminals.forEach((terminal) => {
    //   terminalStates[chatId][terminal] = false; // Изначально все терминалы неактивны
    // });

    // Формируем сообщение с информацией о пользователе
    const message = `
    Профиль:
    Чат: ${data.chatid}
    Телефон: ${data.telephone_telegram}
    Email: ${data.email}
    Компания: ${data.company_name}
    ФИО: ${data.full_name}
    Зарегистрирован: ${new Date(data.createdAt).toLocaleString()}

Выберите состояние терминала:
    `;

    // Создаем кнопки для терминалов
    const inlineKeyboard = terminalKeysAndValues.flatMap((terminals) => {
      return terminals.map((terminal) => [
        {
          text: `Терминал ${terminal.key}: ${terminal.value}`,
          callback_data: `toggle_${terminal.key}`,
        },
      ]);
    });

    console.log(inlineKeyboard, "inlineKeyboard!");

    // Отправляем сообщение с inline кнопками
    bot.sendMessage(chatId, message, {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    });
  } catch (error) {
    console.error("Ошибка при отправке запроса на сервер:", error);
    bot.sendMessage(chatId, "Не найдено");
  }
});

// Обработка нажатия на кнопки
bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const terminal = callbackQuery.data.split("_")[1];

  // Обрабатываем нажатие на кнопку

  // Переключаем состояние терминала
  terminalStates[chatId][terminal] = !terminalStates[chatId][terminal];

  // Обновляем кнопки

  // const inlineKeyboard = terminalKeysAndValues.flatMap((terminals) => {
  //   return terminals.map((terminal) => [
  //     {
  //       text: `Терминал ${terminal.key}: ${terminal.value}`,
  //       callback_data: `toggle_${terminal.key}`,
  //     },
  //   ]);
  // });

  const inlineKeyboard = Object.keys(terminalStates[chatId]).map((terminal) => [
    {
      text: `Терминал ${terminal}: ${
        terminalStates[chatId][terminal] ? "Активен" : "Неактивен"
      }`,
      callback_data: `toggle_${terminal}`,
    },
  ]);

  bot.editMessageReplyMarkup(
    {
      inline_keyboard: inlineKeyboard,
    },
    {
      chat_id: chatId,
      message_id: callbackQuery.message.message_id,
    }
  );
});

// Запуск бота
bot.on("polling_error", (error) => console.log(`Polling error: ${error}`));
