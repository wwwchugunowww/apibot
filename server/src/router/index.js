const Router = require('express')
const router = new Router()
const telegram_bot_router = require('./telegrambotrouter')
const userrouter = require('./userrouter')



router.use('/user', userrouter)
router.use('/registrationusers', telegram_bot_router)



module.exports = router