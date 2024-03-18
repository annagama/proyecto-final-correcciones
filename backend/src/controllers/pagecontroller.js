const path = require('path');
const home = (req, res) => {    
    res.sendfile(path.join(__dirname, '..', 'view', 'index.html'))
}
const signup = (req, res) => {    
    res.sendfile(path.join(__dirname,  '..', 'view', 'signup.html'))
}
const login = (req, res) => {    
    res.sendfile(path.join(__dirname,  '..', 'view', 'login.html'))
}
const carrito = (req, res) => {    
    res.sendfile(path.join(__dirname,  '..', 'view', 'carrito.html'))
}
const productdetalle= (req, res) => {    
    res.sendfile(path.join(__dirname,  '..', 'view', 'productdetalle.html'))
}
module.exports = { home, signup, login, carrito, productdetalle }
