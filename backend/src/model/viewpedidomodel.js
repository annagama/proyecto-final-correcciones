const db = require("../db");
const { querytypes } = require("sequelize");


const getpedidossinprocesar = () => {
    return db.query( `SELECT * FROM view_pedido where bprocesado = 0`,{
      type: querytypes.SELECT,
    });
}

const getpedidos = () => {
  return db.query( `SELECT * FROM view_pedido`,{
    type: querytypes.SELECT,
  });
}

const getpedidosusuario = (current_user) => {
  return db.query( `SELECT * FROM view_pedido where id_usuario = ${current_user}`,{
    type: querytypes.SELECT,
  });
}

const getpedidosprocesadossinnotificar = (current_user) => {
  return db.query( `SELECT * FROM view_pedido where id_usuario = ${current_user} and bprocesado = 1 and bnotificado = 0 `,{
    type: querytypes.SELECT,
  });
}



module.exports = { getpedidossinprocesar, getpedidos, getpedidosusuario, getpedidosprocesadossinnotificar };
