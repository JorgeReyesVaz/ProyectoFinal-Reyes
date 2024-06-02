//Botones para cambio de pantalla entre registro e ingresar

let btnIrRegistrar = document.getElementById("btnIrRegistrar")
btnIrRegistrar.addEventListener("click",IrRegistrar)

function IrRegistrar(){
    document.getElementById('formRegister').style.display = "block"
    document.getElementById('formLogin').style.display = "none"
}

let btnIrEntrar = document.getElementById("btnIrEntrar")
btnIrEntrar.addEventListener("click",IrEntrar)

function IrEntrar(){
    document.getElementById('formRegister').style.display = "none"
    document.getElementById('formLogin').style.display = "block"
}

//Registrar o revisar si ya esta registrada la persona
const btnRegistro  = document.querySelector("#formRegister")
btnRegistro.addEventListener("submit", (e)=>{
    e.preventDefault()
    const usuario = document.getElementById("InputUser").value 
    const correo = document.getElementById("InputEmail").value 
    const pass = document.getElementById("InputPassword").value 

    const Usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    const estaRegistrado = Usuarios.find(usuario => usuario.correo === correo)
    if(estaRegistrado){
        return alert("El usuario ya esta registrado")
    }
    Usuarios.push({usuario: usuario.toLowerCase(), correo: correo.toLowerCase(), contrasena:pass})
    localStorage.setItem("usuarios",JSON.stringify(Usuarios))
    document.getElementById('formRegister').style.display = "none"
    document.getElementById('formLogin').style.display = "block"
})

//Ingresar a la aplicación
const btnIngresar  = document.querySelector("#formLogin")
btnIngresar.addEventListener("submit", (e)=>{
    e.preventDefault()
    const correo = document.getElementById("InputEmail1").value 
    const pass = document.getElementById("InputPassword1").value 

    const Usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    const validarUsuario = Usuarios.find(usuario => usuario.correo === correo.toLowerCase() && usuario.contrasena === pass)
    if(!validarUsuario){
       return alert("Usuario y/o contraseña incorrectos")
    }
    alert(`Bienvenido ${validarUsuario.usuario}`)
    sessionStorage.setItem("Acceso_Exitoso", JSON.stringify(validarUsuario))
    window.location.href = "calculadora.html"
})