const hg=require("C:\Users\BEMA\Desktop\node_modules\STORE\src\hg\index.js");
const{querytypes}=require("sequelize");
const getadmin=async(email)=>{
    try{
        const result=await hg.query("seleccione email ${email}",{type:querytypes.seleccione});
        return result;
    }catch(error){
        throw error;
    }

}
module.exports={getadmin}
