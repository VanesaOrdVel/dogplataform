export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = 
            mostrarMensajeDeError(tipoDeInput, input);
    }
}


const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError",
];


const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patterMismatch: "al menos 6 caracterés, máximo 12, debe contener una letra minúsculas, una letra mayusculas y no debe contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad.", 
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patterMismatch: "El formato requerido es 10 digitos",
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patterMismatch: "El formato requerido es 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patterMismatch: "El formato requerido es 10 a 40 caracteres",
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patterMismatch: "El formato requerido es 10 a 40 caracteres",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach( (error) =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}



function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad."
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        ); 
    return diferenciaFecha < fechaActual;
}