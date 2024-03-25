const db = require("../db");
const { querytypes } = require("sequelize");

const getuser = async (email) => {
    try {
        const result = await db.query(`SELECT * FROM usuario WHERE vemail = '${email}'`, {
            type: querytypes.SELECT,
        });
        return result;
    } catch (error) {
        throw error;
    }
};

const adduser = async (vuser) => {
    try {
        const result = await db.query(
            `INSERT INTO usuario (vnombre, vapellido, dnacimiento, vdireccion, nnumero, vdepto, vemail, vpassword) 
            VALUES ('${vuser.nombre}', '${vuser.apellido}', '${vuser.nacimiento}', '${vuser.direccion}', '${vuser.numero}', '${vuser.depto}', '${vuser.email}', '${vuser.password}')`
        );
       return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {getuser, adduser}
