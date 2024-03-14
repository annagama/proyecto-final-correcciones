const checksession=(req, res, next)=>{
    if(req.session , req.session.userid , req.session.admin){
        next();
    }
    else{
        res.status(401).json({message: "Debe iniciar sesion primero"});

    }
};
const checksessionadmin=(req, res,next)=>{
    if(req.session, req.session.userid, req.session.administrador){
        next();
    }
    else{
        res.status(401).json({message:"Iniciar sesion como administrador primero"})
    
    }
};
module.exports={checksession, checksessionadmin}
