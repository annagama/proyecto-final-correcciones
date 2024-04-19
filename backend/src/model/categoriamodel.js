const db=('..db\index');
const{querytype}=require("sequelize");
const getcategoria=()=>{
    return db.query('select * from categoria',{
        type:querytype.select
    })
}
const getcategoriaid=(ncategoria)=>{
    return db.query('select * from categoria ${ncategoria}',{
        type:querytype.select
    })
}
module.export={getcategoria,getcategoriaid}
