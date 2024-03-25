const hg=require('..src\hg\index.js);
const{querytype}=require("sequelize");
const getall=()=>{
    return hg.query("seleccione marca",{
        type:querytype.seleccione
    });
}
const getbrand=(id)=>{
    return hg.query("seleccione marca ${id}",{
        type:querytype.seleccione
    });
}
module.exports={getall,getbrand}
