    const Router = require('express');
    const router = new Router();
    const UserController = require('../controller/usercontroller');

    // Define routes correctly
    router.post('/regisration', UserController.registration);
    router.post('/login', UserController.login);
    router.get('/alluser', UserController.profile);

    module.exports = router;
