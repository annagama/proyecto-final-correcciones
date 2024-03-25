const authbcrypt=require('..src\bcrypt.js');
const usermodel=require('9');
const adminmodel=require('..src\models\adminmodel.js');
const adduser=async(req, res)=>{
    try{
        const user=req.body;
        const existinguser=await usermodel.getuser(user.email);
        if (existinguser.length>0){
            return res.status(400).json({msg:'el usuario ${user.email} ya no esta disponible', success:false});
        }
        user.password=authbcrypt.transformatehash(user.password);
        if(user.depto==undefined|| user.depto==''){
            user.depto='';
        }
        const result=await usermodel.adduser(user);
        if(result){
            const getuser= await usermodel.getuser(user.email);
            if(getuser.length>0){
                req.session.userid=getuser[0].id_usuario;
                req.session.nombrecompleto=getuser[0].vnombrecompleto;
                req.session.apellido=getuser[0].vapellido;
                req.session.administrador=false;
                req.session.direccion=getuser[0].vdireccion;
                req.session.email=getuser[0].vemail;
            }
            else{
                return res.status(402).json({msg:'no se pudo guardar sus datos, vuelva a intentarlo', success:false});
            }
            res.status(200).json({msg:'usuario creado con exito', success: true , sessiondata:{
                user: req.session.userid,
                nombrecompleto:req.session.nombrecompleto,
                apellido:req.session.apellido,
                administrador:req.session.administrador,
                direccion:req.session.direccion,
                email:req.session.email,
            }});
            }
            else{
                res.status(402).json({msg:'hubo un error, vuelva a intentarlo', success:false});
            }
        }
        catch(error){
            console.error(error);
            res.status(402).json({msg:'hubo un error en el servidor',success : false });
    }
}
const login= async(req,res)=>{
    try{
        const{email, password}=req.body;
        const existinguser=await usermodel.getuser(email);
        if(!authbcrypt.comparehash(password,existinguser[0].vpassword)){
            return res.status(401).json({
                msg: 'contraseña incorrecta', success:false
            });
        }
        req.session.user=existinuser[0].id_usuario;
        req.session.nombrecompleto=existinguser[0].vnombrecompleto;
        req.session.apellido=existinguser[0].vapellido;
        req.administrador=false;
        req.session.direccion=existinguser[0].vdireccion;
        req.session.email=existinguser[0].vemail;
        res.status(200).json({msg:"sesion iniciada", success:true, sessiondata:{
            user: req.session.userid,
            nombrecompleto:req.session.nombrecompleto,
            apellido:req.session.apellido,
            administrador: req.session.administrador,
        }});
    } catch(error){
    console.error(error);
res.status(500).json({msg:"hubo un error en el servidor", success:false});
}   

module.exports={adduser, login};
}
