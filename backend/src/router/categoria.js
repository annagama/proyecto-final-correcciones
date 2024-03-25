const { Router } = require('express');
const CategoriaRouter = require('..src\controllers\categoria.js');
const router = Router();


router.get("/", CategoriaRouter.getCategorias);



module.exports = router;
