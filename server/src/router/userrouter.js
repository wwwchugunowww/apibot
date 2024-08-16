    const Router = require('express');
    const router = new Router();
    const UserController = require('../controller/userController');

    // Define routes correctly
    router.post('/registration', UserController.registration);
    router.post('/login', UserController.login);
    router.get('/alluser', UserController.profile);

    module.exports = router;
