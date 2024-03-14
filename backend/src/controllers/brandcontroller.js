const BrandModel = require('..src\models\brandmodel.js');
const getall = async (req, res) => {    
    try {
        const brand = await BrandModel.getall();
        if(brand){
            res.status(200).send({msg: 'Se encontraron ${brand.length} marcas', data: brand, success: false});
        }else{
            res.status(404).send({msg: 'Hubo un problema al obtener Marcas', success: false});
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({msg: 'error en el servicio interno', success: false});
    }
}
module.exports = { getall }
