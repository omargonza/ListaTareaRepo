//Funcion que hace la peticion al archivo de los usuarios 
const cargarUsuarios= async()=> {
    //como la funcion va a tener una promesa, utilizamos el async y await para trabajarla

    try{//tambien utilizamos el try en caso de tener una respuesta positivia
        const peticion = await fetch("./ListaTarea2/empleados.json")//realizamos el fetch con la url que corresponde
        if(peticion.status === 200){//si nos da un status de 200 es decir que se realizo
            const datos = await peticion.json();//tranformamos esa promesa a un objeto
            let arrayUsuarios = datos.map((usuario)=>{//luego mapeamos ese obejeto en un nuevo array
                let usuarios = {nombre: usuario.nombre,pass:usuario.legajo}//creando un array de objetos
                return usuarios//y retornamos cada usuario al array de usuarios
            })
            console.log(arrayUsuarios)
            return arrayUsuarios//por ultimo retornamos el array entero con cada objeto creado
        }else{
            console.log("no se encontraron los datos")
        }
    }catch(error){//el catch en caso de que haya alguna error
        console.log(error)
    }
}

//ahora trabajos con el formulario
const form  = document.getElementById("form");
form.addEventListener("submit",validarFormulario)//a ese formulario le agregamos la funcion principal de todas

async function validarFormulario(e){
    //le quitamos el evento por default
    e.preventDefault()
    //Estos elementos del html, estaban mal linkeados, y lo que necesitas es el value, x eso iria el .value
const usua = document.getElementById(`username`).value.toUpperCase()//cada dato que ponga en este input lo volvemos mayusculas para ahorarr condicionales
const pass = document.getElementById(`password`).value
console.log(usua,pass);
const arrayUsuarios = await cargarUsuarios()//luego ejecutamos la funcion que realiza la peticion para traer el array
//a ese array que nos devuelve le hacemos un metodo find para buscar los datos que coloco el usuario
const usuarioEncontrado = arrayUsuarios.find((usuario)=> {return usuario.nombre === usua && usuario.pass === pass})
//en el caso de que los datos sean validos ejecutamos la funcion guardarUsuario , en caso de que sea false mostramos un alert
//te recomiendo cambiar el alert comun x uno de sweet alert
usuarioEncontrado ? guardarUsuario(usua,pass): alert("error") 
}

//la function guardarUsuario  va a guardar el usuario en el localstorage para llevartelo a la pagina de la lista
function guardarUsuario(nombre,pass){
    //primero crea un objeto con los datos que puso el usuario
    let usuarioActual = {nombre:nombre,legajo:pass}
    //luego lo guarda en el localStorage , volviendo a string primero
    localStorage.setItem("usuario",JSON.stringify(usuarioActual))
    //y luego te redirige a la lista de tarea
    window.location.href = "./ListaTarea2/index.html";
}


