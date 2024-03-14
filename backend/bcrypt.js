//incriptacion de contraseña
const bcrypt=require('bcrypt');
const fs=require('fs');
const round=10;

const password="pepito123";
const passwordmalo1="pepito123";
const passwordmalo2="123456789";

const passwordencriptado= bcrypt.hashSync(password, round);

const resultado1=bcrypt.compareSync(password, passwordencriptado);
console.log(password , resultado1);
const resultado2= bcrypt.compareSync(passwordmalo1, passwordencriptado);
console.log(passwordmalo1, resultado2);
const resultado3=bcrypt.compareSync(passwordmalo2, passwordencriptado);
console.log(passwordmalo2, resultado3);
