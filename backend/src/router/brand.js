const { Router } = require('express');
const BrandController = require('..src\controllers\brandcontroller');
const router = Router();


router.get("/getBrands", BrandController.getAll);



module.exports = router;
