//------------ Funcion que hace la peticion al archivo de los usuarios -------------- 

const cargarUsuarios = async () => {
    try {
        const peticion = await fetch("empleados.json")
        if (peticion.status === 200) {
            const datos = await peticion.json();
            let arrayUsuarios = datos.map((usuario) => {
                let usuarios = { nombre: usuario.nombre, pass: usuario.legajo }
                return usuarios
            })
            console.log(arrayUsuarios)
            return arrayUsuarios
        } else {
            console.log("no se encontraron los datos")
        }
    } catch (error) {
        console.log(error)
    }
}

//-------------- Ahora traajamos con el formulario ----------------------

const form = document.getElementById("form");
form.addEventListener("submit", validarFormulario)

async function validarFormulario(e) {
    e.preventDefault()

    const usua = document.getElementById(`username`).value.toUpperCase()
    const pass = document.getElementById(`password`).value
    console.log(usua, pass);
    const arrayUsuarios = await cargarUsuarios()
    const usuarioEncontrado = arrayUsuarios.find((usuario) => { return usuario.nombre === usua && usuario.pass === pass })
    usuarioEncontrado ? guardarUsuario(usua, pass) :
        Swal.fire({
            position: `button`,
            title: 'Error',
            text: 'Revise los datos ingresados',
            icon: 'error',
            confirmButtonText: 'ok',
            timer: `5000`,
            background: `grey`,
            timerProgressBar: true,

        })
}

//----------------Creamos function guardarUsuario y va a guardar el usuario en el localstorage para llevarlo a la pagina de la lista ----------

function guardarUsuario(nombre, pass) {
    let usuarioActual = { nombre: nombre, legajo: pass }
    localStorage.setItem("usuario", JSON.stringify(usuarioActual))
    window.location.href = "index.html";
}


