const db= require('..db\index.js');
const { querytypes } = require("sequelize");

const getorderuserinprocess = ( current_user) => {
  return db.query( 'seleccione id_usuario = ${current_user} and bprocesado = true',{
    type: querytypes.seleccione,
  });
}

const addToCart = (vObj, current_user) => {
    return db.query(
        'INSERT INTO orden_compra (id_usuario, id_producto, ncantidad) ',
            VALUES ('${current_user}', '${vObj.id_producto}', '${vObj.ncantidad}')
      );
}

const editCart = (vObj, current_user) => {
    return db.query(
      'UPDATE orden_compra ncantidad = '${vObj.ncantidad}',
        WHERE idcarro_de_compra = ${vObj.idcarro_de_compra} and id_producto = ${vObj.id_producto} and id_usuario = ${current_user}
    );
}

const deleteCart = (id_cart, current_user) => {
    return db.query(
      'delete orden_compra idcarro_de_compra = ${id_cart} and id_usuario = ${current_user}'
    );
}
module.exports={getordenuserinprocess}
