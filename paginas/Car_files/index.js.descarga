if ("loading" in HTMLImageElement.prototype) {
    // Si el navegador soporta lazy-load, tomamos todas las imágenes que tienen la clase
    // `lazyload`, obtenemos el valor de su atributo `data-src` y lo inyectamos en el `src`.
    const images = document.querySelectorAll("img.lazyload");
    images.forEach((img) => {
        img.src = img.dataset.src;
    });
    // Muestra mensaje
    console.log("El navegador soporta `lazy-loading`...");
} else {
    // Importamos dinámicamente la libreria `lazysizes`
    let script = document.createElement("script");
    script.async = true;
    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js";
    document.body.appendChild(script);
    console.log("Lazi loading no soportado, incorpora Libreria lazysizes.min.js");
}

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC7IxVax8cZ5eLwEhlHE5leNVlX7TBUIQ0",
    authDomain: "firestorecrud-f8226.firebaseapp.com",
    projectId: "firestorecrud-f8226",
});

var db = firebase.firestore();


// Carga incialmente
//datosParaWhatsApp();
//consultaDatosDelNegocio();


//Variable para capturar datos para trabajar
// Constantes GLOBALES formulario
//  No se como mostrarlas al cargar

function consultaDatosDelNegocio() {

    db.collection("negocios").where("negocio", "==", "The most Delicius")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //   console.log(doc.id, " => ", doc.data());
                configuraWhatsApp(doc.data().negocio, doc.data().telefono);

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    // window.open("https://wa.me/5215545158142?text=Quiero%20Una%20Hamburguesa%20" + articulo + "%20/t%20Contiene%20" + descripcion + "%20Con%20Precio%20de%20" + precio + "%20/n/n/n/n/n%20Precio%20de%20" + precio)
}

// YA NO SE USA  -> Consulta 
function leerDatos() {
    /**Donde Mostrar los Datos?? */
    // En Una Tabla 
    var table = document.getElementById('container-articulos');

    /**<LEER ARTICULOS>*/

    // LEE Documentos de Firebase
    //  Visualizacion en Tiempo Real
    /** Traer datos Una sola vez => Get()
     *  Leer Cambios y mostrarlos => onSnapshot
     * Remplaza get()  por onSnapshot()
     * Se Elimina .get().then((querySnapshot)...) y queda .onSnapshot((querySnapshot)...) 
     */

    let comprasRef = db.collection("articulos");
    comprasRef.orderBy("fechaHoraModificacion", "desc").limit(5).onSnapshot((querySnapshot) => {
        // table.innerHTML = "";
        querySnapshot.forEach((doc) => {
            // resultados
            // console.log(`${doc.id} => ${doc.data().fechaHora}`);
            /**La imagen se guarda con el url de un Tumbnail
             * Por eso hay que convertir la URl        */
            let urlBase = doc.data().imagen;
            // Separa la URL Base en un array
            let tokens = urlBase.split('/'); /**DIVIDE LA URL y su delimitador es */
            /**Elimina 'w_100,c_scale' del array*/
            tokens.splice(-3, 1); /**Elimina desde el final -3, elimina 1 y no inserta nada*/

            /**Une el contenido del array en uno nuevo*/
            let urlModificada = tokens.join('/');
            //  console.log('URL modif ->' + urlModificada); /**URL extraida de la respuesta */

            table.innerHTML += `
        <div class="articulo">
        <div class="imagen-articulo"> <img src="${urlModificada}" alt="${doc.data().articulo}" class="imagen">
        </div>
        <div class="precio-articulo" id="precio">$ ${doc.data().precio}</div>
        <div class="nombre-articulo" id="articulo">${doc.data().articulo}</div>
        <div class="descripcion-articulo" id="descripcion">${doc.data().descripcion}</div>
        <div class="area-whats"> <button id="btn-whats" class="btn-whats" 
        onclick="enviaMensajeWhatsApp('${doc.data().articulo}','${doc.data().descripcion}','${doc.data().precio}','${doc.data().imagen}')">
        Pidelo por Whats </button> 
        </div>     
    </div>       
        `

        });
    });
}

function configuraWhatsApp(nombreNegocio, telefonoNegcio) {

    console.log("Nombre del negocio =>" + nombreNegocio);
    console.log("Telefono del negocio =>" + telefonoNegcio);

}



function datosParaWhatsApp() {

    db.collection("negocios").where("negocio", "==", "The most Delicius")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    // console.log("Articulo: " + articulo + " Descripcion: " + descripcion + " Precio: " + precio + " Imagen: " + imagen);
    // window.open("https://wa.me/5215545158142?text=Quiero%20Una%20Hamburguesa%20" + articulo + "%20/t%20Contiene%20" + descripcion + "%20Con%20Precio%20de%20" + precio + "%20/n/n/n/n/n%20Precio%20de%20" + precio)
}





