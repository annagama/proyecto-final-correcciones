const productmodel=require('..src\models\productomodel.js');
const viewproductmodel= require('..src\models\viewproductomodel.js');
const getall=async(req,res)=>{
    try{
        const product=await viewproductmodel.getall();
        if(producto){
            res.status(200).send({data: product,success: true});
        }else {
            res.status(404).send({msg:'Producto no disponible',sucess:false});

        }
    } catch(error){
        console.log(error)
        res.status(404).send({msg:'No se pudo cargar el producto', success: false});
    }
}
const addproduct=async(req, res)=>{
    try{
        const current_admin= req.session.user;
        const response= productmodel.addproduct(req.body, current_admin);
        if(response){
            res.status(200).send({
                msg:'el producto ya esta en tu carrito',
                success:true

            });
        }else{
            res.status(404).send({
             msg:'error al crear el producto', success: false   
            });
        }
    }catch(error){
        console.log(error)
        res.status(404).send({msg:'error al crear el producto', success:false})
    const editproduct =async(req,res)=>{
    try{
            const idparams=number(req.params.id);
            if(req.body.boferta===0|| req.body.tsofertahasta== null){
                req.body.tsofertahasta="2024-07-30 15:00:00";
            }
            if(req.body.tsofertahasta==null){
                req.body.tsofertahasta="2024-07-30 15:00:00";

            }
            if(req.body.tsofertahasta.includes('l')){
                req.body.tsofertahasta= req.body.tsofertahasta.replace('l','').replace('000','');

            }
            const response= await productmodel.editproduct(idparams, req.body);
            if(response){
                res.status(200).send({
                    msg:'el producto${req.body.vnombre} se actualizo correctamente',
                    "success":true
                });
            }else{
                res.status(404).send({
                    msg:'hubo un error en la actualizacion del producto',
                    error: editproduct,
                    sucess: false
                });
            }
            }catch(error){
                console.log(error)
                res.status(404).send({msg:'error al modificar el producto', success:false})
        } 
    }
}
const getpreciominimoymaximo=async(req,res)=>{
    try{
       const response=await viewproductmodel.getpreciominimoymaximo();
       if(response){
        res.status(200).send({
            'data':response,
            "success":true
        });
       }else{
        res.status(404).send({
            msg:'hubo un  error a obtener el precio minimo y maximo'
        });
       }
    }catch(error){
    console.log(error)
    res.status(404).send({
        msg:'error al obtener precio minimo y maximo', success:false
    })
}
}
const getcomentariosbyid=async(req, res)=>{
    try{ const idparams= numer(req.params.id);
    const response= await viewcomentartio.getcomentarioproducto(idparams);
if(response.length>0){
    res.status(200).send({
        'data':response,
        msg:'hay un total de ${response.lenght}', success: true
    });
}else{
    res.status(200).send({
        'data': response,
        msg: 'no hay comentarios',
        success: true
    });
}
}catch(error){
    console.log(error)
    res.status(404).send({msg:'error al obtener comentarios', success:false})
}
module.exports={getall,addproduct,getpreciominimoymaximo,getcomentariosbyid}
}
}
