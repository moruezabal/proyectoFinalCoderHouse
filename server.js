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



routerCarrito.get('/', (req, res) => {
    res.send('Hello Carrito!')
})

const PORT = (process.env.PORT || 8080)
  
app.listen(PORT, () => {
    console.log(`Aplicación corriendo en http://localhost:${PORT}`)
})



