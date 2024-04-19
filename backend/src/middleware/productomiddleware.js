const{body}=require("express-validator");

const{getcategoria}=require('..src\models\categoriamodel');
const validatenome=body("vnombre")
.notempty()
.withmessage("se requiere nombre")
.isstring()
.withmessage("el nombre de producto debe ser string")
.islength({
    min:1,max:50
})
.withmessage("el nombre no puede supero los 50 caracteres")
const validatedescripcion=body("tdescripcion")
.isstring()
.withmessage("la descripcion debe ser unstring")
.islength({
    min:1,max:500
})
.withmessage("el nombre no puede supero los 500 caracteres")
const validateprecio=body("fprecio")
.notempty()
.withmessage("se requiere precio")
.isnumeric()
.withmessage("el precio debe ser numerico")
.islength({
    min:1
})
.withmessage("El precio debe ser igual o mayor a 1");
const validatecategoria=body("vcategoria")
.notempty()
.withmessage("se requiere una categoria");
const existcategoria=async(req,res,next)=>{
    const {vcategoria}=req.body;
    if(vcategoria !==undefined){
        const categoria=await getcategoria(vcategoria);
        if(categoria.length>0){
            next();
        }else{
            res.status(400).json({ message: "no existe la categoria", success: false });
             }
        }else{
            res.status(400).json({ message: "ingrese categoria", success: false });
             }
    };
module.exports={validatenome,validatecategoria, validatedescripcion,validateprecio}
