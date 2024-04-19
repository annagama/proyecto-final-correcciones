const db=require('..db\index');
const{querytypes}=require("sequelize");
const getadmin=async(email)=>{
    try{
        const result=await hg.query('select email '${email}'',{type:querytypes.select);
        return result;
    }catch(error){
        throw error;
    }

}
module.exports={getadmin}
