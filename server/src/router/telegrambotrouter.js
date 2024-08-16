const Router = require('express')
const router = new Router()

const UsertelegramController = require('../controller/telegramUserController')

router.post('/registration', UsertelegramController.registration)




module.exports = router