const express = require("express");

const session = require('express-session');

const PORT = 3000;

const db = require("./db");

const producto = require("./router/producto");

const brand = require("./router/brand");

const page = require("./router/page");

const user = require("./router/user");

const ordenar = require("./router/ordenar");

const categoria = require("./router/categoria");

const pedido = require("./router/pedido);

const middlewaredeprueba = (req, res, next) => {
  console.log("Llego una petición al servidor");
  next();
};

const app = express();

app.use(
  session({
    secret: "topsecret123",
    resave: false,
    saveUninitialized: false,
    rolling: true, 
    cookie: {
      maxage: 60 * 60 * 1000, 
    },
  })
);

app.use(express.json());

app.use(middlewaredeprueba);


app.use("/", page); 

app.use("/order", ordenar); 

app.use("/brand", brand);

app.use("/category", categoria);

app.use("/user", user);

app.use("/product", producto);

app.use("/pedido", pedido);

app.listen(PORT, () => {
  db.authenticate().then(() => console.log("Conectado a la base de datos!"));
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
