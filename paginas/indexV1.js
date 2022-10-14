

// Array que almacena Solo Claves.
let carrito = [];
const divisa = '$';
const DOMarticulos = document.querySelector('#articulos');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotales = document.querySelector('#totales');
const DOMordenar = document.querySelector('#ordenar');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMcontrolArea = document.querySelector('#control-area-carrito');
const DOMareaCarrito = document.querySelector('#area-carrito');
const DOMbotonWhatsApp = document.querySelector('#boton-whats-area');
const DOMbotonPedirPorWhatsApp = document.querySelector('#btn-whats');
const DOMcontadorFlotante = document.querySelector('#counter-pedido');

const DOMidentidadNegocio = document.getElementById('identidad-negocio');
const DOMimagenNegocio = document.getElementById('imagen-negocio');
const DOMdatosNegocio = document.getElementById('datos-negocio');

const miLocalStorage = window.localStorage;
var carritoEnTexto = "";
var nombreNegocio = "";

var importeTotalGlobal = 0.0;
var piezasTotalesGlobal = 0.0;

var telefonoNegocioGlobal = ""
var nombreNegocioGlobal = ""


function renderizaIdentidadDelNegocio(nombreColeccion, idNegocio) {
    // let idNegocio = "SKp6WJ8feVlnb7n1XWjb"
    // let negocioRef = db.collection("negocios");
    // Agrega el Texto al carrito
    let docRef = db.collection(nombreColeccion).doc(idNegocio);
    docRef.get().then((doc) => {
        if (doc.exists) {

            telefonoNegocioGlobal = doc.data().telefono
            nombreNegocioGlobal = doc.data().negocio

            /**La imagen se guarda con el url de un Tumbnail
            * Por eso hay que convertir la URl        */
            let urlBase = doc.data().imagen;
            // Separa la URL Base en un array
            let tokens = urlBase.split('/'); /**DIVIDE LA URL y su delimitador es */
            /**Elimina 'w_100,c_scale' del array*/
            tokens.splice(-3, 1); /**Elimina desde el final -3, elimina 1 y no inserta nada*/
            /**Une el contenido del array en uno nuevo*/
            let urlModificada = tokens.join('/');
            console.log('URL modif ->' + urlModificada); /**URL extraida de la respuesta */

            DOMimagenNegocio.innerHTML += `<img src="${urlModificada}" alt="#" id="logo-negocio" class="logo-negocio">`;

            DOMdatosNegocio.innerHTML += ` <div class="grid-item1"> ${doc.data().negocio} </div>
                                       <div class="grid-item2"> ${doc.data().variedad} </div>
                                       <div class="grid-item3"> ${doc.data().rangoPrecios} </div>
                                       <div class="grid-item4"> ${doc.data().horario} </div>
                                       <div class="grid-item4"> ${doc.data().telefono} </div>`
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function renderizarTextoContadorFlotante(numeroDePiezas) {
    DOMcontadorFlotante.innerHTML = '';
    const textoIconoWhats = document.createElement('label');
    textoIconoWhats.textContent = '';
    textoIconoWhats.textContent = numeroDePiezas;
    DOMcontadorFlotante.appendChild(textoIconoWhats);
}

function renderizarBotonWhatsApp() {
    //   const DOMbotonWhatsApp = document.querySelector('#boton-whats-area');
    //    DOMbotonWhatsApp.setAttribute('href', `${enviarPedidoPorWhatsApp()}`);
    const iconoWhats = document.createElement('i');
    iconoWhats.classList.add('fa', 'fa-whatsapp', 'my-float');
    DOMbotonWhatsApp.appendChild(iconoWhats);
}


DOMbotonWhatsApp.addEventListener("click", function (e) {
    const botonDinamicoMostrar = document.getElementById("mostrarCarrito");
    if (botonDinamicoMostrar) {
        botonDinamicoMostrar.click();
        DOMbotonWhatsApp.href = "#control-area-carrito";
    }
    // e.preventDefault(); // prevent navigation to "#"
}, false);


DOMbotonPedirPorWhatsApp.addEventListener('click', () => {
    //window.open(textoParaWhatsApp());
    window.open(textoParaWhatsAppV1(telefonoNegocioGlobal, nombreNegocioGlobal));
})


function renderizarBotonesAreaCarrito() {
    const botonMostrarArea = document.createElement('button');
    botonMostrarArea.classList.add('btn', 'btn-primary');
    botonMostrarArea.textContent = 'Mostrar';
    botonMostrarArea.style.marginLeft = '1rem';
    botonMostrarArea.style.display = 'inline';
    botonMostrarArea.id = 'mostrarCarrito';
    botonMostrarArea.addEventListener('click', mostrarArea);

    const botonOcultarArea = document.createElement('button');
    botonOcultarArea.classList.add('btn', 'btn-primary');
    botonOcultarArea.textContent = 'Ocultar';
    botonOcultarArea.style.marginLeft = '1rem';
    botonOcultarArea.style.display = 'inline';
    botonOcultarArea.id = 'ocultarCarrito';
    botonOcultarArea.addEventListener('click', ocultaArea);

    DOMcontrolArea.appendChild(botonMostrarArea);
    DOMcontrolArea.appendChild(botonOcultarArea);
}

function ocultaArea() {
    DOMareaCarrito.style.display = 'none';
}

function mostrarArea() {
    DOMareaCarrito.style.display = 'block';
}

function consultaNombreNegocio() {
    // Consulta de FireBAse los datos del negocio
    // AUnque no cro que sean Necesario
    //1 Acceso a la coleccion de negocion y obtener el Nombre
    let idNegocio = "SKp6WJ8feVlnb7n1XWjb"
    // Agrega el Texto al carrito
    let docRef = db.collection("negocios").doc(idNegocio);
    docRef.get().then((doc) => {
        if (doc.exists) {
            // Extrae el nombre del negocio
            nombreNegocio = doc.data().negocio;
            // console.log("El negocio es: " + nombreNegocio);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function renderizarBotonPedirPorWhats() {
    //  const miBotonOrdenar = document.createElement('button');
    //  miBotonOrdenar.classList.add('btn');
    //  miBotonOrdenar.id = "btn-whats";
    const miBotonOrdenar = document.getElementById("btn-whats");
    miBotonOrdenar.textContent = 'Pedir por Whats PArcial';
    miBotonOrdenar.addEventListener('click', textoParaWhatsApp);
    // No hay q agregar    //DOMordenar.appendChild(miBotonOrdenar);
}

function renderizarBotonVaciarCarrito() {
    //  const miBotonOrdenar = document.createElement('button');
    //  miBotonOrdenar.classList.add('btn');
    //  miBotonOrdenar.id = "btn-whats";
    const botonVaciar = document.getElementById("boton-vaciar");
    botonVaciar.textContent = 'Vaciar Carrito';
    botonVaciar.addEventListener('click', vaciarCarrito);
    // No hay q agregar    //DOMordenar.appendChild(miBotonOrdenar);
}

//Renderizar Articulos
function renderizarArticulosFirebase() {

    let articulosRef = db.collection("articulos");

    articulosRef.orderBy("fechaHoraModificacion", "desc").onSnapshot((querySnapshot) => {
        //table.innerHTML = "";
        // console.log(`${doc.id} => ${doc.data().fechaHora}`);

        // POr cada Nodo o DOcumento en Firebase
        // Equivalente NODO a DOCUMENTO
        querySnapshot.forEach((doc) => {
            // Estructura
            const miNodo = document.createElement('div');
            //miNodo.classList.add('card', 'col-sm-4');
            miNodo.classList.add('card')

            // Body
            const miNodoCardBody = document.createElement('div');
            //miNodoCardBody.classList.add('card-body');
            miNodo.classList.add('card-body')

            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = doc.data().articulo;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', doc.data().imagen);
            // Precio
            const miNodoTexto = document.createElement('p');
            miNodoTexto.classList.add('card-text');
            miNodoTexto.textContent = `${doc.data().descripcion}`;
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-price');
            miNodoPrecio.textContent = `${divisa} ${doc.data().precio}`;
            // Boton 

            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'Agregar al Pedido';
            miNodoBoton.setAttribute('marcador', doc.id);
            // miNodoBoton.setAttribute('onclick', "anyadirProductoAlCarritoVersion2(" + doc.data().precio + ")");
            //Agregar funcion On click con los dtaos del articulo seleccionado
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos

            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTexto);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMarticulos.appendChild(miNodo);
        });
    });


}

/**Evento para añadir un producto al carrito de la compra*/
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    // AQUI CAPTURO EL iD QUE YO DECIDI GURADR EN EL BOTON
    carrito.push(evento.target.getAttribute('marcador'))
    //Aqui lo muestro
    console.log(evento.target)
    // Muesra contenido
    console.log("Carrito contiene solo IDs" + carrito);
    /**Adicional Borrrar*/
    renderizarCarrito();
    renderizarTotales();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
    // Activa o desactiva
    onOffBotonPedirWhatsApp();
}

/* Evento para borrar un elemento del carrito **/
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    renderizarTotales();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
    // Activa o desactiva
    onOffBotonPedirWhatsApp();

}

//function enviarPedidoPorWhatsApp() {
function textoParaWhatsAppV1(telefonoNegocio, nombreNegocio) {

//    let telefonoDiezDigitos = 31056448844;
    //Une la base con el telefono del negocio
    let textoParaWhatsApp = agregaTextoABase("https://wa.me/310", "", telefonoNegocio);
    //Une lo anterior con el comienzo del mensaje 
    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", "?text=%20")
    // Une lo anterior con un saludo modificable
    //let saludo = "Hola Taquitos te encargo porfa"
    //Fail por que es asincornico  let saludo = "Hola" + consultaNombreNegocio();
    //let saludo = nombreNegocio;

   // textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", saludo);
    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", nombreNegocio);
   
    // Lo anterior mas el contenido del carrito en Texto
    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", carritoEnTexto)
    // Agrega al final el Importe que tiene que pagar el cliente
    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", "Total a pagar " + divisa + totalesCarrito().importe);
    // Agrega al final las piezas que compro el cliente.
    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", " de " + totalesCarrito().piezas) + " piezas ";

    //window.open(textoParaWhatsApp);

    return textoParaWhatsApp;
}

//function enviarPedidoPorWhatsApp() {
function textoParaWhatsApp() {

    let telefonoDiezDigitos = 55451447774;
    //Une la base con el telefono del negocio
    let textoParaWhatsApp = agregaTextoABase("https://wa.me/310", "", telefonoDiezDigitos);
    //Une lo anterior con el comienzo del mensaje 
    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", "?text=%20")
    // Une lo anterior con un saludo modificable
    //let saludo = "Hola Taquitos te encargo porfa"
    //Fail por que es asincornico  let saludo = "Hola" + consultaNombreNegocio();
    let saludo = nombreNegocio;

    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", saludo);
    // Lo anterior mas el contenido del carrito en Texto
    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", carritoEnTexto)
    // Agrega al final el Importe que tiene que pagar el cliente
    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", "Total a pagar " + divisa + totalesCarrito().importe);
    // Agrega al final las piezas que compro el cliente.
    textoParaWhatsApp = agregaTextoABase(textoParaWhatsApp, "", " de " + totalesCarrito().piezas) + " piezas ";

    //window.open(textoParaWhatsApp);

    return textoParaWhatsApp;
}

function totalesCarrito() {
    let objTotales = {
        piezas: piezasTotalesGlobal,
        importe: importeTotalGlobal
    }
    return objTotales;
}

// Definir la función asíncrona preCalentarHorno
const preCalentarHorno = async () => {
    console.log('Pre calentar horno.');
    const respuesta = await hornoListo();
    console.log(respuesta);
}
// Esta función asíncrona simula la respuesta del horno
const hornoListo = async () => {
    return new Promise(resolve => setTimeout(() => {
        resolve('Beep! Horno Calentado!')
    }, 3000));
}
// Definir la función asíncrona preCalentarHorno
const preCalentarHorno1 = async () => {
    console.log('Pre calentar horno.');
    const respuesta = await hornoListo1();
    console.log(respuesta);
}
// Esta función asíncrona simula la respuesta del horno
const hornoListo1 = async () => {

    return new Promise(resolve => setTimeout(() => {
        resolve([{
            dia: 12,
            mes: "enero",
            anio: 343
        },
        {
            dia: 12,
            mes: "enero",
            anio: 343
        },
        {
            dia: 12,
            mes: "enero",
            anio: 343
        }
        ]);
    }, 5000));
}

function agregaTextoABase(base, textoAlInicio, textoAlFinal) {
    base = textoAlInicio + base + textoAlFinal;
    return base;
}

function renderizarTotales() {
    // Vaciamos todo el html
    // Div donde se colocara el Carrito
    DOMtotales.textContent = '';

    /// Set es una estructura de datos, una colección de valores que permite sólo almacenar valores únicos de cualquier tipo,
    const carritoSinDuplicados = [...new Set(carrito)];

    // Contador 
    let counter = carritoSinDuplicados.length;

    console.log("El tamaño de Items en el array es de " + counter);
    // Sumadores
    let piezas = 0.0;
    let importe = 0.0;

    // Generamos los Nodos a partir de carrito  /Aqui el BUCLE
    carritoSinDuplicados.forEach((item) => {  // Guarda solo los ID
        //Quito la unidad al contador
        counter -= 1;

        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario lo mantengo
            return itemId === item ? total += 1 : total;
        }, 0);

        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('div');
        const DOMpiezaTotales = document.createElement('div');
        const DOMimporteTotal = document.createElement('div');

        //Borra el contenido de carrito/
        carritoEnTexto = "";

        // Agrega el Texto al carrito
        let docRef = db.collection("articulos").doc(item);
        docRef.get().then((doc) => {

            // Borra todo y solo deja los totales jejeje Gane
            DOMtotales.textContent = '';

            if (doc.exists) {
                importe = importe + (doc.data().precio * numeroUnidadesItem);
                piezas = piezas + numeroUnidadesItem;

                importeTotalGlobal = importe;
                piezasTotalesGlobal = piezas;

                // Agrega texto a los elemtos que se muestran en el carrito.
                DOMpiezaTotales.textContent = `Total de Piezas: ${piezas} `;
                DOMimporteTotal.textContent = ` Importe total: ${importe}  `;

                miNodo.appendChild(DOMpiezaTotales);
                miNodo.appendChild(DOMimporteTotal);
                // Si contador es 0 coloca en el area el resultado.
                counter ? 0 : DOMtotales.appendChild(miNodo)

                counter ? 0 : renderizarTextoContadorFlotante(piezas)

                // if (counter === 0) {
                //     renderizarTextoContadorFlotante(piezas);
                // }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");

            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    });
    // Renderizamos el precio total en el HTML
    // DOMtotal.textContent = calcularTotalFirebase();
}

function renderizarCarrito() {
    // Vaciamos todo el html
    // Div donde se colocara el Carrito
    DOMcarrito.textContent = '';

    // Set es una estructura de datos,
    // una colección de valores que permite sólo 
    // almacenar valores únicos de cualquier tipo,
    const carritoSinDuplicados = [...new Set(carrito)];

    // Contador 
    let counter = carritoSinDuplicados.length;

    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {  // Guarda solo los ID
        //Quito la unidad al contador
        counter -= 1;

        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario lo mantengo
            return itemId === item ? total += 1 : total;
        }, 0);

        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('articulo-carrito');

        const seccionUno = document.createElement('div');
        seccionUno.classList.add('seccionUno');

        const seccionDos = document.createElement('div');
        seccionDos.classList.add('seccionDos');

        const miCantidad = document.createElement('div');
        miCantidad.classList.add('cantidad-articulo-carrito')

        const miTexto = document.createElement('div');
        miTexto.classList.add('texto-articulo-carrito')

        const precioUnitarioArticulo = document.createElement('div');
        precioUnitarioArticulo.classList.add('precio-unitario-articulo')

        const miPrecioTotalPorArticulo = document.createElement('div');
        miPrecioTotalPorArticulo.classList.add('precio-total-articulo-carrito')

        //Borra el contenido de carrito/
        carritoEnTexto = "";

        // Agrega el Texto al carrito
        let docRef = db.collection("articulos").doc(item);
        docRef.get().then((doc) => {
            if (doc.exists) {
                /**Convierte cada Partida en Texto y la va concatenando en cada Ciclo a var "carritoEnTexto"*/
                let espacio = "%20"
                let textoFormateado = espacio + "(" + espacio + numeroUnidadesItem + espacio + "x" + espacio + doc.data().articulo + espacio + ")" + espacio;
                carritoEnTexto = agregaTextoABase(carritoEnTexto, "", textoFormateado);

                // Agrega texto a los elemtos que se muestran en el carrito.
                miCantidad.textContent = ` x ${numeroUnidadesItem}  `;
                miTexto.textContent = ` ${doc.data().articulo} `;
                precioUnitarioArticulo.textContent = `${divisa} ${doc.data().precio}`;
                miPrecioTotalPorArticulo.textContent = `=${divisa} ${doc.data().precio * numeroUnidadesItem} `;
                // Boton de borrar
                const miBoton = document.createElement('button');
                miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                miBoton.textContent = 'X';
                miBoton.style.margin = '.1rem';
                miBoton.dataset.item = item;
                miBoton.addEventListener('click', borrarItemCarrito);
                // Mezclamos nodos
                //miNodo.appendChild(miTexto);
                seccionUno.appendChild(miTexto);

                seccionDos.appendChild(precioUnitarioArticulo);
                seccionDos.appendChild(miCantidad);
                seccionDos.appendChild(miPrecioTotalPorArticulo);
                seccionDos.appendChild(miBoton);


                // miNodo.appendChild(precioUnitarioArticulo);
                // miNodo.appendChild(miCantidad);
                // miNodo.appendChild(miPrecioTotalPorArticulo);
                // miNodo.appendChild(miBoton);
                miNodo.appendChild(seccionUno);
                miNodo.appendChild(seccionDos);

                DOMcarrito.appendChild(miNodo);

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                miNodo.textContent = ` 1 x Error de Lectura - Error de Lectura`;
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    });

    // Renderizamos el precio total en el HTML
    // DOMtotal.textContent = calcularTotalFirebase();
}
function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem('carrito') !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        console.log("fun cargarCarritoDesdeLocalStorage  " + carrito)
    }
}

function vaciarCarrito() {
    carrito = []
    carrito.length = 0
    carritoEnTexto = ""

    importeTotalGlobal = 0.0;
    piezasTotalesGlobal = 0.0;

    // Quita el enlace
    DOMbotonWhatsApp.removeAttribute('href');
    renderizarTextoContadorFlotante(carrito.length)

    guardarCarritoEnLocalStorage();
    renderizarCarrito();
    renderizarTotales();

    console.log(carrito)
}


function onOffBotonPedirWhatsApp() {
    const botonWhats = document.getElementById("btn-whats");
    // Elementos en el carrito declarado en storeV1.js
    if (carrito.length === 0) {
        console.log("Carrito vacio " + carrito.length);
        setSubmitDisable(botonWhats);
    } else {
        console.log("Carrito NO vacio " + carrito.length)
        setSubmitEnable(botonWhats);
    }
}

// ACTIVA / DESACTIVA Boton enviar
function setSubmitDisable(boton) {
    boton.disabled = true;
    //const botonControl = boton.parentElement;  // .form-control
    //Agrega la clase del boton Inactivo
    boton.className = 'inactivo enviar';
}
function setSubmitEnable(boton) {
    boton.disabled = false;
    //const botonControl = boton.parentElement;  // .form-control
    //Agrega la clase del boton Inactivo
    boton.className = 'activo envia';
}

DOMcarrito.addEventListener('change', (event) => {
    console.log("Hubo cambios");
    console.log(event);
    //  if (checkInputs() === true) {
    //     console.log("Campos vacios");
    //      setSubmitDisable(miBoton);
    //  } else {
    //      console.log("Sin campos vacios");
    //       setSubmitEnable(miBoton);
    //   }
})

/***Al iniciar */
consultaNombreNegocio();

renderizaIdentidadDelNegocio("negocios", "SKp6WJ8feVlnb7n1XWjb");
// let idNegocio = "SKp6WJ8feVlnb7n1XWjb"
// let negocioRef = db.collection("negocios");

cargarCarritoDeLocalStorage();
renderizarArticulosFirebase();
renderizarCarrito();
// Ahora voy a mostra los totales;
renderizarTotales()
//-> Aqui se cre el boton Pedir por Whats
renderizarBotonPedirPorWhats()
// Aqui el boton para Vaciar carrito
//-> Aqui se cre el boton
renderizarBotonVaciarCarrito();
renderizarBotonesAreaCarrito();
// Btn Whats app
renderizarBotonWhatsApp();
//renderizarContadorFlotante();
// llena el nombre del negocio que se enviar por Whatsapp
consultaNombreNegocio();

renderizarTextoContadorFlotante(carrito.length)