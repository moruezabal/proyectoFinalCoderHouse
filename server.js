import Inventario from './Inventario.js'
import express from 'express';
import Carrito from './Carrito.js';
import handlebars from 'express-handlebars'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.engine('hbs', handlebars({extname:'.hbs', defaultLayout: 'index.hbs'}) )
app.set('views', './views')
app.set('view engine', 'hbs')

const routerProducto = express.Router();
const routerCarrito = express.Router();

app.use('/productos', routerProducto);
app.use('/carrito', routerCarrito);

let repositorio = new Inventario();
let carrito = new Carrito();

app.get('/', (req,res) => {
    let productos = repositorio.getProductos();
    //let date = new Date(productos.timestamp).toLocaleString();
    let compras = carrito.getCompras();
    res.render('formulario', {compras, productos});
});

routerProducto.get('/listar/:id?', (req, res) => {
    let productos = req.params.id ? repositorio.getProducto(req.params.id) : repositorio.getProductos();
    let error = {error : 'no hay productos cargados'};
    if (productos){
        productos.length != 0 ? res.status(200).json(productos) : res.status(200).json(error)
    }
    else {
        res.status(200).json({error: 'ese producto no existe'});
    }
});

routerProducto.post('/agregar', (req, res) => {
    let productoModificado = repositorio.addProducto(req.body);
    res.status(200).json(productoModificado);
});

routerProducto.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let productoSolicitado = repositorio.getProducto(id);
    if (productoSolicitado) {
        let productoActualizado = repositorio.updateProducto(id,req.body);
        res.status(200).json(productoActualizado);
    } 
    else{
        res.status(200).json({error: "no se encontró el producto a actualizar"});
    } 
});

routerProducto.delete('/borrar/:id', (req,res) => {
    let id = req.params.id;
    let productoSolicitado = repositorio.getProducto(id);
    if (productoSolicitado) {
        let productoBorrado = repositorio.deleteProducto(id,req.body);
        res.status(200).json(productoBorrado);
    } 
    else{
        res.status(200).json({error: "no se encontró el producto a borrar"});
    } 
});

routerCarrito.get('/listar/:id?', (req, res) => {
    let compras = req.params.id ? carrito.getCompra(req.params.id) : carrito.getCompras();
    let error = {error : 'El carrito está vacío'};
    if (compras){
        compras.length != 0 ? res.status(200).json(compras) : res.status(200).json(error)
    }
    else {
        res.status(200).json({error: 'esa compra no existe'});
    }
});

routerCarrito.post('/agregar', (req, res) => {
    let compraModificada = carrito.addCompra(req.body);
    res.status(200).json(compraModificada);
});

routerCarrito.delete('/borrar/:id', (req,res) => {
    let id = req.params.id;
    let compraSolicitado = repositorio.getCompra(id);
    if (compraSolicitado) {
        let compraBorrado = repositorio.deleteCompra(id,req.body);
        res.status(200).json(compraBorrado);
    } 
    else{
        res.status(200).json({error: "no se encontró la compra a borrar"});
    } 
});

const PORT = (process.env.PORT || 8080)
  
app.listen(PORT, () => {
    console.log(`Aplicación corriendo en http://localhost:${PORT}`)
})



