var carritoDiv = document.getElementById('products-cart');

function agregarAlCarrito(nombre, descripcion, precio) {
    var producto = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    };
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarProductosEnCarrito();
}

function mostrarProductosEnCarrito() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoDiv.innerHTML = '';

    var cantidadPorProducto = {};

    carrito.forEach(function(producto) {
        if (cantidadPorProducto[producto.nombre]) {
            cantidadPorProducto[producto.nombre].cantidad += 1;
            cantidadPorProducto[producto.nombre].precioTotal += producto.precio;
        } else {
            cantidadPorProducto[producto.nombre] = {
                cantidad: 1,
                precioTotal: producto.precio
            };
        }
    });

    for (var nombreProducto in cantidadPorProducto) {
        if (cantidadPorProducto.hasOwnProperty(nombreProducto)) {
            var cantidad = cantidadPorProducto[nombreProducto].cantidad;
            var precioTotal = cantidadPorProducto[nombreProducto].precioTotal;

            var productoDiv = document.createElement('div');
            productoDiv.innerHTML = '<p>' + nombreProducto + '</p>' +
                                     '<p>' + cantidad + '</p>' +
                                     '<p>$' + precioTotal + '</p>';
            carritoDiv.appendChild(productoDiv);
        }
    }
}

function limpiarCarrito() {
    localStorage.removeItem('carrito');
    carritoDiv.innerHTML = '';
}

mostrarProductosEnCarrito();

  