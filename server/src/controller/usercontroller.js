const bcrypt = require('bcrypt');
const { User } = require('../model/model'); // Убедитесь, что модель импортирована корректно
const jwt = require('jsonwebtoken');

// Функция для генерации JWT токена
const generateJwt = (id, login) => {
    return jwt.sign(
        { id, login },
        process.env.SECRET_KEY, // Убедитесь, что SECRET_KEY задан в .env файле
        { expiresIn: '24h' }
    );
};

class UserController {
  // Регистрация пользователя
  async registration(req, res, next) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res
          .status(400)
          .json({ message: "Некорректный логин или пароль" });
      }

      const candidate = await User.findOne({ where: { login } });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь уже зарегистрирован!" });
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const createdUser = await User.create({ login, password: hashPassword });

      const token = generateJwt(createdUser.id, createdUser.login);

      return res.status(201).json({ token });
    } catch (error) {
      console.error("Registration error:", error);
      next(error); // Передаем ошибку следующему обработчику
    }
  }

  // Авторизация пользователя
  async login(req, res) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res
          .status(400)
          .json({ message: "Некорректный логин или пароль" });
      }

      const foundUser = await User.findOne({ where: { login } });

      if (!foundUser) {
        return res.status(404).json({ message: "Пользователь не найден!" });
      }

      const comparePassword = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!comparePassword) {
        return res.status(401).json({ message: "Неверный пароль" });
      }

      const token = generateJwt(foundUser.id, foundUser.login);

      // Добавляем имя пользователя в ответ
      return res.status(200).json({ token, name: foundUser.name });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login error", error });
    }
  }

  // Проверка токена
  async check(req, res) {
    try {
      // Здесь `req.user` должен быть установлен каким-то middleware, проверяющим токен
      const token = generateJwt(req.user.id, req.user.login);

      return res.json({ token });
    } catch (error) {
      console.error("Check token error:", error);
      res.status(500).json({ message: "Check token error", error });
    }
  }

  // Получение информации о пользователе
  async profile(req, res) {
    try {
      const userInfo = req.user; // `req.user` должен быть установлен каким-то middleware, проверяющим токен

      if (!userInfo) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      res.json({ id: userInfo.id, login: userInfo.login });
    } catch (error) {
      console.error("Profile retrieval error:", error);
      res
        .status(500)
        .json({
          message: "Произошла ошибка при получении информации о пользователе",
        });
    }
  }
}

module.exports = new UserController();
