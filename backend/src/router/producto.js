const { Router } = require('express');
const ProductController = require('..src\controllers\producto.js')
const { validarErrores } = require('..src\middlewares');
const { idRequired } = require('..src\middlewares\paramsmiddleware.js');
const { validateName, validateDescription, validatePrice, validateBrand, validateCategoria, existCategoria, existMarca } = require('../Middlewares/ProductMiddleware');
const { checkSessionAdmin, checkSession } = require('.src')
const ProductRouter = Router();
ProductRouter.get("/getAll", ProductController.getAll);
ProductRouter.post("/addProduct", [checkSessionAdmin, validateName, validateDescription, validatePrice, validateBrand, validateCategoria, existCategoria, existMarca, validarErrores], ProductController.addProduct);
ProductRouter.put("/editProduct/:id", [checkSessionAdmin, idRequired, validateName, validateDescription,  validatePrice, validateBrand, validateCategoria, existCategoria, existMarca, validarErrores], ProductController.editProduct);
ProductRouter.get("/getProductById/:id", [idRequired, validarErrores], ProductController.getProductById);
ProductRouter.get("/getPrecioMinimoYMaximo",  ProductController.getPrecioMinimoYMaximo);
module.exports = ProductRouter;
