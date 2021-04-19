import Inventario from './Inventario.js'
import express from 'express';
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

const routerProducto = express.Router();
const routerCarrito = express.Router();

app.use('/productos', routerProducto);
app.use('/carrito', routerCarrito);

let repositorio = new Inventario();



routerProducto.get('/listar:id?', (req, res) => {
    res.send('Hello Producto!')
})

routerCarrito.get('/', (req, res) => {
    res.send('Hello Carrito!')
})

const PORT = (process.env.PORT || 8080)
  
app.listen(PORT, () => {
    console.log(`Aplicación corriendo en http://localhost:${PORT}`)
})



