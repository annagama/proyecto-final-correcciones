const CarritoModel = require('..src\models\carritomodel.js');
const OrdenCompraArticuloModel = require('..src\models\compraarticulocontroll.js');
const ViewOrdenCompraXArticuloModel = require('..src\models\viewcompraarticulo.js');
const ViewProductModel = require('src\models\viewproductomodel.js');

const addcarrito= async (req, res) => {
    try {
        const vObjProducto = req.body;
        const current_user =  req.session.userId;
        const existOrder = await CarritoModel.getOrderUserInProcess(current_user);        
        const getProduct = await ViewProductModel.getProductById(vObjProducto.id_producto);
        const cantidadProducto = getProduct[0].ncantidad;
        let result = null;
        let objResultado = null
        if(existOrder.length > 0){                          
            const existOrdenProducto = await OrdenCompraArticuloModel.productoInOrder(existOrder[0].idorden_compra, vObjProducto.id_producto);
            if(existOrdenProducto.length > 0) {
                const cantidad = existOrdenProducto[0].ncantidad
                if((cantidad + 1) > cantidadProducto ){
                    return res.status(400).json({ msg: 'No hay cantidad suficiente para agregar al carrito' , success: false });
                }
                result = await OrdenCompraArticuloModel.editCart(existOrder[0].idorden_compra, vObjProducto );  
            }else{
                result = await OrdenCompraArticuloModel.addcarrito(existOrder[0].idorden_compra, vObjProducto)
            }
            objResultado = await ViewOrdenCompraXArticuloModel.getProductInOrderByUserActive(existOrder[0].idorden_compra, current_user);
        }else{
            if( cantidadProducto < 1 ){
                return res.status(400).json({ msg: 'No hay cantidad suficiente para agregar al carrito', success: false });
            }
            const idOrder = await CarritoModel.initOrder(current_user);  
            result = await OrdenCompraArticuloModel.addcarrito(idOrder, vObjProducto)
            objResultado = await ViewOrdenCompraXArticuloModel.getProductInOrderByUserActive(idOrder, current_user);
        }
        const totalCantidad = objResultado.reduce((total, producto) => total + producto.ncantidad, 0);
        const precioTotal = objResultado.reduce((total, producto) => total + producto.ftotalprecio, 0);
        if(result) {                        
            res.status(200).json({ msg: 'Producto eliminado del carrito', success: true, cantidad: totalCantidad, productos: objResultado, precioTotal: precioTotal });
        }else{
            res.status(400).json({ msg: 'Hubo un problema al borrar el producto del carrito', success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'error interno del servidor', success: false });
    }
}
const deleteProductCart = async (req, res) => {
    try {
        const current_user =  req.session.userId;
        const vObjData = req.body;
       
        const result = await OrdenCompraArticuloModel.deleteProductOrder(vObjData.idOrdenCompraxproducto);
        const objResultado = await ViewOrdenCompraXArticuloModel.getProductInOrderByUserActive(vObjData.idOrden, current_user);

        const totalCantidad = objResultado.reduce((total, producto) => total + producto.ncantidad, 0);
        const precioTotal = objResultado.reduce((total, producto) => total + producto.ftotalprecio, 0);
        if(result){
            
            res.status(200).json({ msg: 'Producto eliminado del carrito', success: true, cantidad: totalCantidad, productos: objResultado, precioTotal: precioTotal  });
        }  else{
            res.status(404).json({ msg: 'Hubo un problema al borrar el producto del carrito', success: false });
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg:'error interno del servidor', success: false });
    }
  
}
module.exports = { addcarrito, deleteProductCart };
