const formRegister = document.querySelector("#formRegister");

const clearValidations = () => {
    document.querySelector("#firstname").classList.remove('error');
    document.querySelector("#lastname").classList.remove('error');
    document.querySelector("#email").classList.remove('error');
    document.querySelector("#password").classList.remove('error');
    document.querySelector("#error-firstname").textContent='';
    document.querySelector("#error-lastname").textContent='';
    document.querySelector("#error-email").textContent='';
    document.querySelector("#error-password").textContent='';
    
}
const validarFormulario = (event) => {
    event.preventDefault();
    clearValidations();

    const firstname = document.querySelector("#firstname");
    const lastname = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    let validation = true;
    if(!firstname.value.trim()){
        firstname.classList.add('error')
        document.querySelector("#error-firstname").textContent='Debe completar el campo Nombre';
        validation=false;
    }
    if(!lastname.value.trim()){
        // alert("Los campos Nombre, Apellido, Email y Password son obligatorios")
        document.querySelector("#error-lastname").textContent='Debe completar el campo Apellido';
        lastname.classList.add('error')
        validation=false;
    }
    if(!email.value.trim()){
        // alert("Los campos Nombre, Apellido, Email y Password son obligatorios")
        document.querySelector("#error-email").textContent='Debe completar el campo Email';
        email.classList.add('error')
        validation=false;
    }
    if(!password.value.trim()){
        // alert("Los campos Nombre, Apellido, Email y Password son obligatorios")
        document.querySelector("#error-password").textContent='Debe completar el campo contraseña';
        password.classList.add('error')
        validation=false;
    }else if(password.value.length < 6 || password.value.length > 12){
        document.querySelector("#error-password").textContent ='La contraseña debe contener entre 6 y 12 caracteres';
        password.classList.add('error')
        validation=false;
    }

    if(validation){
        formRegister.submit()
    }else{
        return false;
    }
}


formRegister.addEventListener('submit',validarFormulario);