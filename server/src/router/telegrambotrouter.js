const Router = require('express')
const router = new Router()

const UsertelegramController = require('../controller/telegramusercontroller')


router.post('/registration', UsertelegramController.registration)
router.post('/adit', UsertelegramController.edit)
router.post('/profile', UsertelegramController.profile)


module.exports = router