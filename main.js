
const icono = document.getElementById("icono")
const carrito = document.getElementById("carrito");
const botonAgregar = document.querySelectorAll("#agregar");
const producto = document.querySelectorAll(".producto");
const precioTotal = document.querySelector(".precioTotal")
const productosContainer = document.getElementById("productosContainer")
const btnComprar = document.getElementById("comprarBtn")
const pantallaDePago = document.getElementById("pantallaDePago")
const contenedorTarjeta = document.querySelector(".container")
const imgPrincipal = document.getElementById("imgPrincipal")
const imgMiniatura = document.querySelectorAll(".miniatura")
let arrayProductos = []; //array donde voy a guardar los productos


//este es elicono del carrito
icono.addEventListener("click", () => {
    aparecerCarrito()
})



//en esta parte lo que hago es verificar si le doy click afuera del carrito y si es asi, cerrarlo
const tienda = document.querySelector(".tienda-principal")
tienda.addEventListener("click", (e)=> {
    if(e.target === tienda){ //e.target devuelve el elemento al que le di click y verifica si di click fuera del carrito
        aparecerCarrito() 
    }
})


//aca lo que es que cuando doy click en comprar, me muestre la tarjeta o pantalla de pago
btnComprar.addEventListener("click", () => {
    pantallaDePago.style.display = "flex"
})


//lo mismo que con carrito, si doy click en el fondo o en cualquier lugar que no sea la tarjeta, se cierra.
contenedorTarjeta.addEventListener("click", (evento) => {
    if (evento.target === contenedorTarjeta) {
        pantallaDePago.style.display = "none"
    }
})

pantallaDePago.addEventListener("click", (evento) => {
    if (evento.target === pantallaDePago) {
        pantallaDePago.style.display = "none"
    }
})



//esta funcion es para que cuando doy click en el icono o agrego un elemento, se muestre el carrito.
function aparecerCarrito() {
    //lo que hace toggle es verififcar si existe la clase, si existe, la elimina y si no la crea
    carrito.classList.toggle("aparecer-carrito")
}







//aca lo que hago es recorrer los botones de agregar al carrito
botonAgregar.forEach((btn, i) => {

    btn.addEventListener("click", () => {
        agregarAlCarrito(i) //aca le paso el indice del boton clickeado, asi se que producto es.
        carrito.classList.add("aparecer-carrito") //aca agrego la clase para que muestre el carrito solo cuando agrego.
    })


})




//esta funcion recibe el indice del boton clickeado
function agregarAlCarrito(indice) {
    const productoParaAgregar = producto[indice]; //Aca obtenemos el producto por el indice, son el mismo indice que el boton.
    const imagen = productoParaAgregar.querySelector("img"); //obtenemos la imagen
    const nombre = productoParaAgregar.querySelector(".producto-titulo").textContent;//obtenemos el nombre
    const precio = productoParaAgregar.querySelector(".producto-precio").textContent;//obtenemos el precio
    const urlImagen = imagen.getAttribute("src");//aca le sacamos la url de la imagen

    let existe = false   //esta variable comprueba de que si los productos agregados son iguales
    arrayProductos.forEach(producto => { //con este forEach no encargamos de recorrer lo agregado al array
        if (producto.nombre === nombre) { //validamos si el nombre del producto ya esta
            existe = true //cambiamos a true si ya hay un producto igual
            producto.contador++ //y sumamos en el contador 
        }
    })

    if (existe === false) { //si da false es porque no hay otro producto igual

        // Agregamos el producto como objeto {nombre, precio, imagen y contador}.
        arrayProductos.push({ 
            nombre: nombre,
            precio: precio,
            imagen: urlImagen,
            contador: 1
        });

    }




    // actualizamos el carrito
    actualizarCarrito();
}



//lo que hace esta funcion es agregar los productos del array al carrito
function actualizarCarrito() {

    let total = 0 //esta variable es para contar el total de los precios


    productosContainer.innerHTML = "" //esto sirve para limpiar el carrito y hacer que no se agreguen dos elementos
    arrayProductos.forEach(producto => { //recorremos el array de los productos
        let html = ` 
        <div class="producto-carrito">
        <span class="producto-cantidad">${producto.contador}</span>
        <div class="img-container">
        <img src="${producto.imagen}">
        </div>
        <div class="carrito-info">
        <h4>${producto.nombre}</h4>
        <p>${producto.precio}</p>
        <button class="boton-eliminar">Eliminar</button>
        
        </div>
        </div>
        
        ` //y aca agregamos con bacticks
        productosContainer.innerHTML += html //aca finalmente lo metemos dentro del elemento html que esta dentro del carrito

        let precio = parseInt(producto.precio.replace("$", "")) //aca convertimos el precio "ej: $2,000 a 20000"
        //lo convertimos de string a un numero entero

        total += precio * parseInt(producto.contador) //finalmente a la variable total le asignamos el precio por la cantidad de productos

    })

    contador() //esto es para mostrar el total de productos agregados
    actualizarTotal(total)
    eliminar()
    carritoVacio()
    contadorIcono()
    bloquearBoton()
}



//esta funcion cuenta cuantos productos se van agregando
function contador() {
    
    let cantidadDeProductos = 0 //la variable que van almacenar la cantidad
    arrayProductos.forEach(producto => { //recorremos el array de los productos
        cantidadDeProductos += producto.contador //y le asignamos la cantidad a la variable
    })
    const contador = document.querySelector(".contador") //aca metemos el contador en un elemento html asi se muestra
    contador.innerHTML = `total de productos: ${cantidadDeProductos} `
    
}


//esta funcion muestra la cantidad de productos, pero en el icono del carrito
function contadorIcono() { //es lo mismo que la funcion de arriba, solo que esta vez lo agrego al icono 
    let cantidadDeProductos = 0
    arrayProductos.forEach(producto => {
        cantidadDeProductos += producto.contador
    })
    const contador = document.querySelector(".contadorIcono")
    contador.innerHTML = cantidadDeProductos
}



//aca mostramos el total de precios
function actualizarTotal(total) {
    
    precioTotal.innerHTML = `precio total: $${total}`
}






//aca lo que hacemos es eliminar los productos
function eliminar() {
    const boton = document.querySelectorAll(".boton-eliminar") //obtenemos los botones que se crean al agregar
    boton.forEach((eliminar, indice) => { //los recorremos y obtenemos su indice del que fue clickeado
        eliminar.addEventListener("click", () => {
            
            arrayProductos.splice(indice, 1) //borramos del array el indice clickeado
            actualizarCarrito() //actualizamos el carrito para que se vea reflejado los cambios
        })
    })
}





//esto sirve para que salga el mensaje de carrito vacio
function carritoVacio() {
    const mensajeVacio = document.querySelector(".vacio");

    if (arrayProductos.length !== 0) { //si en el array hay productos, quitamos el mensaje
        mensajeVacio.classList.add("mostrar-vacio"); 
    } else { //si no hay, mostramos el mensaje
        mensajeVacio.classList.remove("mostrar-vacio");
    }
    
}










//lo que hace esto es que bloque el uso del boton de comprar si no hay nada, si hay, se habilita
function bloquearBoton() {
    const iconoBloqueo = document.getElementById("lock")
    if (arrayProductos.length === 0) {
        btnComprar.disabled = true
        iconoBloqueo.classList.remove("mostrar-lock")
    } else {

        btnComprar.disabled = false
        iconoBloqueo.classList.add("mostrar-lock")
    }
}




bloquearBoton()



//esta seccion es para darle click al producto y q me muestre su pagina

const hidrolavadora = document.getElementById("hidrolavadora")
const pagina = document.getElementById("pagina")

hidrolavadora.addEventListener("click", () => {
    pagina.style.display = "flex"
})


pagina.addEventListener("click", (evento) => {
    if (evento.target === pagina) {
        pagina.style.display = "none"
    }
})




