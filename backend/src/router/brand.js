const { Router } = require('express');
const BrandController = require('..src\controllers\brandcontroller.js');
const router = Router();


router.get("/getBrands", BrandController.getAll);



module.exports = router;
