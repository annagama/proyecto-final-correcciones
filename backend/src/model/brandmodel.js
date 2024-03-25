const db=require("../db");
const{querytype}=require("sequelize");
const getall=()=>{
    return db.query('select * from marca',{
        type:querytype.select
    });
}
const getbrand=(id)=>{
    return db.query('select * from marca ${id}',{
        type:querytype.seleccione
    });
}
module.exports={getall,getbrand}
