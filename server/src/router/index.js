const Router = require('express')
const router = new Router()
const telegram_bot_router = require('./telegrambotrouter')
const userrouter = require('./userrouter')
const merchantRouter = require('./merchantRouter')
const apiRouter = require('./apiRouter')
const handleCallbackController = require('./handleCallbackRouter')




router.use('/user', userrouter)
router.use('/registrationusers', telegram_bot_router)
router.use('/merchant', merchantRouter)
router.use('/api', apiRouter)
router.use("/bot", handleCallbackController);


 
module.exports = router


// http://localhost:5000/registrationusers/registration