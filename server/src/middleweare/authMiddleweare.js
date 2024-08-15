const { verify } = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1]; // Разделение строки по пробелу и получение второго элемента
            if (!token) {
                res.status(401).json({ message: "Пользователь не авторизован!" });
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({ message: "Пользователь не авторизован!" });
        }
    }
};