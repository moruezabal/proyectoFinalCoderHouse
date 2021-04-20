class Inventario {
    static id  = 0;
    constructor(){
        this.productos = [];
    }

    getProductos = function () { 
        return this.productos;
    }

    getProducto = function (id){
        let productoEncontrado = null
        this.productos.forEach(producto => {
            if (producto.id == id){
                productoEncontrado = producto;
            }
        });
        return productoEncontrado
    }

    addProducto = function(producto){
        Inventario.id++;
        producto.id = Inventario.id;
        producto.timestamp = Date.now();
        this.productos.push(producto);
        return producto;
    }

    updateProducto = function (id, productoNuevo) {
        let producto = this.getProducto(id);
        
        producto.title = productoNuevo.title;
        producto.description = productoNuevo.description;
        producto.timestamp  = Date.now();
        producto.code = productoNuevo.code;
        producto.price = productoNuevo.price;
        producto.thumbnail = productoNuevo.thumbnail;
        producto.stock = productoNuevo.stock;
        
        return producto;
        
    }

    deleteProducto = function(id){
        let pos = this.productos.findIndex(producto => producto.id == id);
        return this.productos.splice(pos,1)[0]; // splice() devuelve un arreglo de un solo elemento en este caso
    }
}

export default Inventario;