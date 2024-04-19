const { Router } = require("express");
const OrdenCompraController = require('..src\controllers\ordenar');
const PedidoController = require('..src\controllers\pedido');
const OrderRouter = Router();
const { validarErrores } = require('..src\middlewares');
const { checkSession, checkSessionAdmin } = require('..src');
const { idRequired } = require('..src/middlewares/paramsmiddleware');
OrderRouter.post("/addproductcarrito", [checkSession, validarErrores], ordencompracontroller.addcarrito);

OrderRouter.post("/deleteproduct", [checkSession, validarErrores], ordencompracontroller.deleteproductcarrito);

OrderRouter.get("/getuserorder", [checkSession, validarErrores], ordencompracontroller.getuserorderinprocess);

OrderRouter.get("/getarticulosorden/:id", [checkSessionAdmin, idRequired, validarErrores], pedidocontroller.getarticulosorden);


module.exports = OrderRouter;
