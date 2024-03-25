const db = require("../db");
const { querytypes } = require("sequelize");

const addtocart = (idroder, vobj) => {
    return db.query(
        `INSERT INTO orden_compra_x_producto (id_orden_compra, id_producto, ncantidad) 
            VALUES ('${idorder}', '${vobj.id_producto}', 1)`
      );
}



const editCart = (idOrder, vObj) => {   
    return db.query(
        `UPDATE orden_compra_x_producto SET ncantidad = ncantidad + 1 
          WHERE id_orden_compra = ${idorder} and id_producto = ${vobj.id_producto}`
    );
}


const deleteproductorder = (idordencompraproducto) => {
    return db.query(
      `delete from orden_compra_x_producto WHERE idorden_compra_x_producto = ${idordencompraproducto}`
    );
}

const productsorder = (idorder) => {
    return db.query(
        `select * from orden_compra_x_producto where id_orden_compra = ${idorder}`,{
            type: querytypes.SELECT
        }
    );
}

const productoinorder = (idorder, idproduc) => {
    return db.query(
        `select * from orden_compra_x_producto where id_orden_compra = ${idorder} and id_producto = ${idproduc}`,{
            type: querytypes.SELECT
        }
    );
}



module.exports = { addtocart, editcart, deleteproductorder, productoinorder , productsorder};
