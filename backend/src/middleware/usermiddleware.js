const {body}=require("express-validator");
const validatenome=body("nombre")
.notempty()
.withmessage("se requiere nombre")
.isstring()
.withmessage("el nombre debe ser texto")
.islength({
    min:1,max:50
})
.withmessage("el nombre no puede superar los 50 caracteres");
const validateapaellido=body("apellido")
.notempty()
.withmessage("se requiere apellido")
.isstring()
.withmessage("el apellido debe ser texto")
.islength({
    min:1,max:50
})
.withmessage("el nombre no puede superar los 50 caracteres");
const validatedireccion=body("direccion")
.notempty()
.withmessage("se requiere direccion")

.islength({
    min:1,max:150
})
.withmessage("la direccion no puede superar los 150 caracteres");
const validateemail=body("email")
.notempty()
.withmessage("se requiere email")
.islength({
    min:1,max:150
})
.withmessage("el email no puede superar los 150 caracteres");
const validatepassword=body("password")
.notempty()
.withmessage("se requiere contraseña")
.islength({
    min:1,max:50
})
.withmessage("la contraseña no puede superar los 50 caracteres");
module.exports={validatenome,validateapaellido,validatedireccion,validateemail,validatepassword}
