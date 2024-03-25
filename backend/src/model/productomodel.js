const db = require("../db");
const { QueryTypes } = require("sequelize");

const getall = () => {
    return db.query("SELECT * FROM producto", {
        type: querytypes.SELECT,
    });
}

const getproductbyid = (id) => {
    return db.query(`SELECT * FROM producto where id_producto = ${id}`, {
        type: querytypes.SELECT,
    });
}

const addproduct = (vobj, current_admin) => {   
    return db.query(
        `INSERT INTO producto (vnombre, tdescripcion, fprecio, nusuariocreador, id_marca, id_categoria, ncantidad) 
            VALUES ('${vObj.vnombre}', '${vobj.tdescripcion}', '${vobj.fprecio}', '${current_admin}', '${vobj.id_marca}', '${vObj.idcategoria}', '${vObj.ncantidad}')`
      );
}

const editProduct = (id, vObj) => {
    return db.query(
      `UPDATE producto SET vnombre = '${vobj.vnombre}', tdescripcion = '${vobj.tdescripcion}', fprecio = ${vobj.fprecio}, id_marca = ${vobj.id_marca}, id_categoria = ${vobj.idcategoria}, ncantidad = ${vobj.ncantidad}, boferta = ${vobj.boferta}, tsofertahasta = '${vobj.tsofertahasta}', bhabilitado = '${vobj.bhabilitado}' WHERE id_producto = ${id}`
    );
}

const editCantidad = (id, cantidad) => {
    return db.query(
      `UPDATE producto SET ncantidad = ncantidad - '${cantidad}' WHERE id_producto = ${id}`
    );
}




module.exports = { getall, getproductbyid, addproduct, editproduct, editcantidad }
