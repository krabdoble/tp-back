const express= require('express');
const app= express();
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();
const {dbConnection}= require("./config/dbConnection")


app.use(cors({
  origin: "https://proyecto-final-4483a.web.app"
}));
/*{
  origin: "https://proyecto-final-4483a.web.app"
}*/

//app.use(express.json());

app.use(bodyParser.json());


const loginroutes= require('./routes/usuarioLoginRoute');
const proveedorroutes= require('./routes/proveedorRoute');
const productoroutes= require('./routes/productoRoute');
const carritoroutes= require('./routes/carritoRoute');
const pedidoroutes= require('./routes/pedidoRoute');


const PORT = process.env.PORT || 3000;

app.use('/api/login',loginroutes)
app.use('/api/proveedor',proveedorroutes)
app.use('/uploads', express.static('uploads'));
app.use('/api/producto',productoroutes)
app.use('/api/carrito',carritoroutes)
app.use('/api/pedido',pedidoroutes)

let admin = require("firebase-admin")

var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  dbConnection.authenticate()
  .then(() => console.log('Conexión exitosa a MySQL'))
  .catch(err => console.error('Error al conectar:', err));

app.listen(PORT,() =>{
    console.log(`listening on port ${PORT}`)
});