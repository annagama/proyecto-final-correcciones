const db = require("../db");
const { querytypes } = require("sequelize");

const getall = () => {
    return db.query("SELECT * FROM view_producto", {
        type: querytypes.SELECT,
    });
}

const getproductbyid = (id) => {
    return db.query(`SELECT * FROM view_producto where id_producto = ${id}`, {
        type: querytypes.SELECT,
    });
}

const getpreciominimoymaximo = async () => {
    try {
        const result = await db.query(
          "SELECT MIN(fpreciooferta) AS precio_minimo, MAX(fpreciooferta) AS precio_maximo FROM view_producto",
          {
            type: querytypes.SELECT,
          }
        );
       
        return result[0]; 
      } catch (error) {
        console.error('Error al obtener el precio mínimo y máximo:', error);
        throw error;
      }
}
module.exports = { getall, getproductbyid, getpreciominimoymaximo}

module.exports = { getAll, getProductById, getPrecioMinimoYMaximo}
