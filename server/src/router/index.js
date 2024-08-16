const Router = require('express')
const router = new Router()
const telegram_bot_router = require('./telegrambotrouter')
const userrouter = require('./userrouter')
const merchantRouter = require('./merchantRouter')



router.use('/user', userrouter)
router.use('/registrationusers', telegram_bot_router)
router.use('/merchant', merchantRouter)



module.exports = router


// http://localhost:5000/registrationusers/registration