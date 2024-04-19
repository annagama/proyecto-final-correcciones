const pedidomodel=requiere('..src\models\pedidomodel');
const carritomodel = require('..src\models\carritomodel');
const viewpedidomodel = require('..src/models/viewpedidomodel');
const viewordenarcompraarticulo = require('..src/models/viewcompraarticulo');
const getall = async (req, res) => {
    try {
        const pedidos = await viewpedidomodel.getpedidos();

        res.status(200).json({ msg: 'se han encontrado ${pedidos.length} pedidos', data: pedidos, success: true });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'error interno del servidor', success: false });
    }
}
const getpedidossinprocesar = async (req, res) => {
    try {
        const pedidos = await viewpedidomodel.getpedidossinprocesar();
        res.status(200).json({ msg: 'se han encontrado ${pedidos.length} pedidos', data: pedidos, success: true });       
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'error interno del servidor', success: false });
    }
}
const generarpedido = async (req, res) => {
    try {
        const vobj = req.body;        
        await carritomodel.updateorder(vobj.id_orden_compra);
        const pedido = await pedidomodel.generarpedido(vobj);
        res.status(200).json({ msg: 'ha realizado un pedido numero de orden ${pedido}', data: pedido, success: true });       
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'error interno del servidor', success: false });
    }
}
const procesarpedido = async (req, res) => {
    try {
        const idparams = number(req.params.id);       
        const pedido = await pedidomodel.procesarpedido(idparams);
        res.status(200).json({ msg:'se ha procesado el pedido numero de orden ${pedido}', success: true });       
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'error interno del servidor', success: false });
    }
}
const getarticulosorden = async (req, res) => {
    try {
        const idparams = number(req.params.id);       
        const articulos = await viewordenarcompraarticulo.getarticulosorden(idparams);
        res.status(200).json({ data: articulos, success: true });       
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'error interno del servidor', success: false });
    }
}
const getpedidousuario = async (req, res) => {
    try {
        const current_user =  req.session.userId;    
        const pedidos = await viewpedidomodel.getpedidousuario(current_user);
        const pedidosprocesadossinnotificar = await viewpedidomodel.getPedidosProcesadosSinNotificar(current_user);
        for (const pedido of pedidos) {
            pedido.articulos = await viewordenarcompraarticulo.getproductinorderbyuseractive(pedido.id_orden_compra, current_user);
        }
        res.status(200).json({ pedidos: pedidos, success: true, cantidadsinprocesar: pedidosprocesadossinnotificar.length  });       
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg:'error interno del servidor', success: false });
    }
}
const procesarnotificacion = async (req, res) => {
    try {
        const current_user =  req.session.userId;  
        const pedidosprocesadossinnotificar = await viewpedidomodel.getpedidosprocesadossinnotificar(current_user);
        const idsorden = pedidosprocesadossinnotificar.map((pedido) => pedido.id_orden_compra);
        const pedidos = await pedidomodel.procesarpedidonotificado(idsorden);  
        res.status(200).json({ pedidos: pedidos, success: true, cantidadsinprocesar:pedidosprocesadossinnotificar.length  });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg:'error interno del servidor' , success: false });
    }
}
module.exports = { getall, generarpedido, getpedidossinprocesar, procesarpedido, getarticulosorden, getpedidousuario, procesarnotificacion };
