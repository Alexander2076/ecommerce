
const tarjeta = document.querySelector(".tarjeta-container");
const numeroParrafo = document.getElementById("numeroParrafo")
const inputNumero = document.getElementById("numero")
const nombreParrafo = document.getElementById("nombreParrafo")
const inputNombre = document.getElementById("nombre")
const fechaParrafo = document.getElementById("fechaParrafo")
const inputFecha = document.getElementById("fecha")
const cvvParrafo = document.getElementById("cvvParrafo")
const inputCvv = document.getElementById("cvv")
const formularioContainer = document.querySelector(".formulario-container")
const menuDesplegar = document.getElementById("desplegar")
const desplegarItem = document.querySelector(".desplegar-item")


tarjeta.addEventListener("click", ()=> {
	tarjeta.classList.toggle("rotada")
})


menuDesplegar.addEventListener("click", ()=> {
    formularioContainer.classList.toggle("transicion")
    animarMenu() //esto es para que cuando habra el formulario, el menu mustre una x para cerrarlo
})



function animarMenu(){

    desplegarItem.classList.toggle("abierto")
}


//aca rellenamos el numero de la tarjeta
inputNumero.addEventListener("input", ()=> {
    let valor = inputNumero.value.replace(/\D/g, '') //esto elimina todo lo q no sea numero
    inputNumero.value = valor //aca se resetea el inut para q solo permita numeros y no letras
    let resultado = valor.padEnd(16, "#") //aca rellenamos con "#" hasta llenar todo
    resultado = resultado.replace(/(.{4})/g, '$1 ').trim();
    numeroParrafo.textContent = resultado
    validarTarjeta(valor)
})



//aca rellenamos el nombre completo
inputNombre.addEventListener("input", ()=> {
    let valor = inputNombre.value.replace(/[^a-zA-Z\s]/g, '') //aca quitamos todo lo que no sea letras
    inputNombre.value = valor //de vuelta reseteamos el input asi no me deja ingresar numeros, ya que es un nombre
    if(valor === ""){ //aca validamos para que si no ingresa nada, que muestre el nombre de ejemplo
        nombreParrafo.textContent = "Jhon Doe"
    }else{
        
        nombreParrafo.textContent = valor //si ingresa algo, los mostramos
    }
})



inputFecha.addEventListener("input", ()=> {
    let valor = inputFecha.value //obtenemos el valor de la fecha
    let resultado = valor.split("-") //convertimos el valor en array asi lo acomodamos en DD/MM/AA
    resultado = `${resultado[2]}/${resultado[1]}/${resultado[0]}` //acomodamos para q quede en DD/MM/AA
    fechaParrafo.textContent = resultado
})



inputCvv.addEventListener("input", ()=> {
    let valor = inputCvv.value.replace(/\D/g, '') 
    inputCvv.value = valor
    if(valor === ""){

        cvvParrafo.textContent = "ej: 476"
    }else{

        cvvParrafo.textContent = valor

    }
})

//aca validamos la tarjeta para  poner el logo de visa o mastercard


function validarTarjeta(valor){
    let array = [...valor]//aca lo convertimos en array para validar el primer valor
    const img = document.getElementById("img")
    if (array[0] === "4"){
        img.src = "img/logos/visa.png"
    }else if (array[0] === "5"){
        img.src = "img/logos/mastercard.png"
    }else{
        img.src =  ""
    }
}


//ahora validamos para que cuando toque el input, se rote solo a la cara que estamos agregando datos


inputNumero.addEventListener("focus", ()=> {
    if(tarjeta.classList.contains("rotada")){
        
        tarjeta.classList.remove("rotada")
    }
})
inputNombre.addEventListener("focus", ()=> {
    if(tarjeta.classList.contains("rotada")){
        
        tarjeta.classList.remove("rotada")
    }
})


inputFecha.addEventListener("focus", ()=> {
    if(tarjeta.classList.contains("rotada")){
        
        tarjeta.classList.remove("rotada")
    }
})
inputCvv.addEventListener("focus", ()=> {
    if(!tarjeta.classList.contains("rotada")){
        
        tarjeta.classList.add("rotada")
    }
})