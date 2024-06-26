const { Router } = require('express');

const usercontroller = require('..src\controllers\user');
const UserRouter = Router();

const { validarErrores } = require('..src/middlewares');
const { validatenome, validateapellido, validatedireccion, validateemail, validatePassword } = require('..src\middlewares\usermiddle');
UserRouter.post("/signUp", [validatenome, validateapellido, validatedireccion, validateemail, validatepassword, validarerrores], usercontroller.adduser);

UserRouter.post("/logIn", [validateemail, validatepassword, validarerrores], usercontroller.logIn);


module.exports = UserRouter;
