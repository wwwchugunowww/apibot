// const TelegramBot = require("node-telegram-bot-api");
// const axios = require("axios");
// // const { updateUserbot } = require("../controller/merchantController");

// // Замените этот токен на токен вашего Telegram-бота
// const token = "7163916049:AAGzzgjvJBYe3WuetEHzvH5qY2OULizh4r8";

// // Создаем экземпляр бота
// const bot = new TelegramBot(token, { polling: true });

// const terminalStates = {};

// // Обработка команды /start
// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(
//     chatId,
//     "Привет! Пожалуйста, поделитесь своим номером телефона.",
//     {
//       reply_markup: {
//         keyboard: [
//           [
//             {
//               text: "Поделиться номером телефона",
//               request_contact: true,
//             },
//           ],
//         ],
//         one_time_keyboard: true,
//       },
//     }
//   );
// });
// let globalTerminal = null
// // Обработка получения контакта (номера телефона)
// bot.on("contact", async (msg) => {
//   const chatId = msg.chat.id;
//   const phoneNumber = msg.contact.phone_number;
//   const phone = phoneNumber.slice(1);

//   try {
//     const response = await axios.get(
//       `http://localhost:5000/merchant/userbots/search?phoneNumber=%2B${phone}`
//     );
//     const data = response.data;
//     await axios.put(`http://localhost:5000/merchant/userbots/${data.id}`, {
//       chatid: chatId,
//     });

//     // const terminals = data.terminals;
//     globalTerminal = data.terminals;
//     console.log(globalTerminal, "globalTerminal")
//     const terminalsArray = data.terminals;
//     const terminalKeysAndValues = terminalsArray.map((terminal) => {
//       return Object.entries(terminal).map(([key, value]) => ({ key, value }));
//     });

//     console.log(terminalKeysAndValues);

//     // terminalStates[chatId] = {};
//     // terminalsArray.forEach((terminal) => {
//     //   terminalStates[chatId][terminal] = false; // Изначально все терминалы неактивны
//     // });

//     // Формируем сообщение с информацией о пользователе
//     const message = `
//     Профиль:
//     Чат: ${data.chatid}
//     Телефон: ${data.telephone_telegram}
//     Email: ${data.email}
//     Компания: ${data.company_name}
//     ФИО: ${data.full_name}
//     Зарегистрирован: ${new Date(data.createdAt).toLocaleString()}

// Выберите состояние терминала:
//     `;

//     // Создаем кнопки для терминалов
//     const inlineKeyboard = terminalKeysAndValues.flatMap((terminals, index) => {
//       return terminals.map((terminal) => [
//         {
//           text: `${index + 1}. Терминал ${terminal.key}: ${terminal.value}`,
//           callback_data: `${terminal.key}_${terminal.value}`,
//         },
//       ]);
//     });

//     console.log(inlineKeyboard, "inlineKeyboard!");

//     // Отправляем сообщение с inline кнопками
//     bot.sendMessage(chatId, message, {
//       reply_markup: {
//         inline_keyboard: inlineKeyboard,
//       },
//     });
//   } catch (error) {
//     console.error("Ошибка при отправке запроса на сервер:", error);
//     bot.sendMessage(chatId, "Не найдено");
//   }
// });

// // bot.on()

// // Обработка нажатия на кнопки
// bot.on("callback_query", (callbackQuery) => {
//   const chatId = callbackQuery.message.chat.id;
//     const messageId = callbackQuery.message.message_id;

//   const terminal = callbackQuery.data.split("_")[1];
//   console.log(callbackQuery);
//   const dirtyArray = callbackQuery.message.reply_markup.inline_keyboard;
//   const terminalsArray = []
//   dirtyArray.forEach((element, index) => {
//     console.log(element, index);
//     const splitArr = element[0].callback_data.split("_");
//     if(splitArr[1] === "false") {
//       splitArr[1] = false;
//     } else if (splitArr[1] === "true") {
//       splitArr[1] = true;
//     }
    
//     if (splitArr[0] === terminal && splitArr[1] ) {
//       !splitArr[1]
//     } else if (splitArr[0] === terminal && !splitArr[1]) {
//       splitArr[1] = true;
//     }

//     terminalsArray.push([{
//       key: splitArr[0],
//       value: splitArr[1],
//     }]);

//   });
//   console.log(terminalsArray);

//   // Обрабатываем нажатие на кнопку

//   // Переключаем состояние терминала
//   // terminalStates[chatId][terminal] = !terminalStates[chatId][terminal];

//   // Обновляем кнопки
// const terminalKeysAndValues = terminalsArray.map((terminal) => {
//   return Object.entries(terminal).map(([key, value]) => ({ key, value }));
// });
// const replyInlineKeyboard = terminalKeysAndValues.flatMap((terminals, index) => {
//   return terminals.map((terminal) => [
//     {
//       text: `${index + 1}. Терминал ${terminal.key}: ${terminal.value}`,
//       callback_data: `${terminal.key}_${terminal.value}`,
//     },
//   ]);
// });

//   // const inlineKeyboard = Object.keys(terminalStates[chatId]).map((terminal) => [
//   //   {
//   //     text: `Терминал ${terminal}: ${
//   //       terminalStates[chatId][terminal] ? "Активен" : "Неактивен"
//   //     }`,
//   //     callback_data: `toggle_${terminal}`,
//   //   },
//   // ]);
//   bot.editMessageReplyMarkup({
//     chat_id: chatId,
//     message_id: parseInt(callbackQuery.message.message_id),
//     reply_markup: {
//       inline_keyboard: replyInlineKeyboard,
//     },
//   });



// });

// // Запуск бота
// bot.on("polling_error", (error) => console.log(`Polling error: ${error}`));


const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Замените ваш токен на реальный
const token = "7163916049:AAGzzgjvJBYe3WuetEHzvH5qY2OULizh4r8";
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
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

currentData = null;
// Обработчик получения контакта
bot.on("contact", async (msg) => {
  console.log(msg, "msg!!!!");
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact.phone_number;
  console.log(phoneNumber, "phoneNumber");


  try {
    const response = await axios.get(
      //http://localhost:5000/merchant/userbots/search?phoneNumber=%2B380638532509
      `http://localhost:5000/merchant/userbots/search?phoneNumber=%2B${phoneNumber}`
    );
    const data = response.data;
console.log(data, "resData");
    currentData = data;
    // await axios.post(`http://localhost:5000/merchant/userbots/${data.id}`, {
    //   chatid: chatId,
    // }).then(() => console.log("userbot updated")).catch((err) => console.error(err));

    const terminalsArray = data.terminals;
    const inlineKeyboard = terminalsArray.map((terminal, index) => [
      {
        text: `${terminal.name}: ${terminal.status}`,
        callback_data: `update`,
      },
    ]);

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

// Обработчик нажатий на кнопки (callback_query)
bot.on("callback_query", async (callbackQuery) => {
      // const data = JSON.parse(callbackQuery.data);
      // const opts = {
      //   chat_id: callbackQuery.message.chat.id,
      //   message_id: callbackQuery.message.message_id,
      // };
  const msg = callbackQuery.message;
    bot.answerCallbackQuery(callbackQuery.id)
        .then(() => bot.sendMessage(msg.chat.id, "You clicked!"));

      
  const chatId = callbackQuery.message.chat.id;
  const callbackData = callbackQuery.data;
  console.log(currentData, "currentData");
  try {
    // Отправляем данные на сервер
    

const splitData = callbackData.split("_")

console.log(currentData.terminals, "currentData.terminals", currentData.terminals[splitData[0]]);


if (splitData[0] >= 0 && splitData[0] < currentData.terminals.length) {
  // Извлекаем объект по индексу
  const item = currentData.terminals[splitData[0]];

  // Здесь должна быть логика для определения, какой именно ключ нужно изменить
  // Например, предположим, что мы хотим изменить первый ключ объекта
  const keys = Object.keys(item); // Получаем все ключи объекта
  const firstKey = keys[0]; // Берем первый ключ

  let newValue;
  if (splitData[2]) {
    newValue = false;
  } else if (!splitData[2]) {
    newValue = true;
  }

  // Новое значение для ключа

  // Создаем новый объект с измененным значением первого ключа
  const updatedItem = { ...item, [firstKey]: newValue };

  // Заменяем старый объект новым в массиве
  currentData.terminals[splitData[0]] = updatedItem;

  console.log(currentData.terminals);
} else {
  console.log('Index out of bounds');
}


    await axios.post("http://localhost:5000/merchant/userbots/sendbtn", {
      chatId,
      callbackData,
    });
    // await axios.put(`http://localhost:5000/merchant/userbots/${currentData.id}`, {
    //   terminals: ,
    // });

    // const inlineKeyboard = currentData.terminals.map((terminal, index) => [
    //   {
    //     text: `${index + 1}. Терминал ${Object.keys(terminal)[0]}: ${
    //       Object.values(terminal)[0]
    //     }`,
    //     callback_data: `${index}_${Object.keys(terminal)[0]}_${
    //       Object.values(terminal)[0]
    //     }`,
    //   },
    // ]);


  // bot.editMessageReplyMarkup(
  //   {
  //     inline_keyboard: inlineKeyboard,
  //   },
  //   {
  //     chat_id: chatId,
  //     message_id: callbackQuery.message.message_id,
  //   }
  // );

  bot.answerCallbackQuery(callbackQuery.id);
    // bot.sendMessage(chatId, `Вы нажали кнопку с данными: ${callbackData}`);
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    bot.sendMessage(chatId, "Произошла ошибка при отправке данных на сервер.");
  }
});

// Обработчик команды /profile
bot.onText(/\/profile/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    // Получаем данные пользователя по chatId
    const response = await axios.get(
      `http://localhost:5000/merchant/userbots/search?chatId=${chatId}`
    );
    const data = response.data;

    const terminalsArray = data.terminals;
    const inlineKeyboard = terminalsArray.map((terminal, index) => [
      {
        text: `${index + 1}. Терминал ${Object.keys(terminal)[0]}: ${
          Object.values(terminal)[0]
        }`,
        callback_data: `${Object.keys(terminal)[0]}_${
          Object.values(terminal)[0]
        }`,
      },
    ]);

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

    bot.sendMessage(chatId, message, {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    });
  } catch (error) {
    console.error("Ошибка при получении профиля:", error); 
    bot.sendMessage(chatId, "Не удалось получить профиль.");
  }
});

// Обработчик ошибок polling
bot.on("polling_error", (error) => console.log(`Polling error: ${error}`));
