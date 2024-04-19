const productModel = require('..src\models\categoriamodel');

const checkCantidadesProducto = async (req, res, next) => {

    const {id_producto, ncantidad} = req.body;
    
    const product = await productmodel.getproductbyid(id_producto);
    const cantidades = product[0].ncantidad;

    if ( (cantidades - ncantidad )  >= 0) { 
        next();
    } else {
        res.status(401).json({ message: 'No hay cantidades suficientes para añadir a la orden', success: false });
    }
};

module.exports = {checkcantidadesproducto};
