class Carrito {
    static id  = 0;
    constructor(){
        this.compras = [];
    }

    getCompras = function () { 
        return this.compras;
    }

    getCompra = function (id){
        let compraEncontrado = null
        this.compras.forEach(compra => {
            if (compra.id == id){
                compraEncontrado = compra;
            }
        });
        return compraEncontrado
    }

    addCompra = function(compra){
        Inventario.id++;
        compra.id = Inventario.id;
        compra.timestamp = Date.now();
        this.compras.push(compra);
        return compra;
    }

    deleteCompra = function(id){
        let pos = this.compras.findIndex(compra => compra.id == id);
        return this.compras.splice(pos,1)[0]; 
    }
}

export default Carrito;