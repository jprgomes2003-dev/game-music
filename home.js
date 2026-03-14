const btnLogin = document.getElementById("btnLogin");
const modal = document.getElementById("loginModal");
const fechar = document.querySelector(".fechar");

btnLogin.addEventListener("click", function(){

    modal.classList.add("ativo");

});

fechar.addEventListener("click", function(){

    modal.classList.remove("ativo");

});

window.addEventListener("click", function(event){

    if(event.target === modal){

        modal.classList.remove("ativo");

    }

});


const toggleSenha = document.getElementById("toggleSenha");
const campoSenha = document.getElementById("campoSenha");

toggleSenha.addEventListener("click", () => {

if(campoSenha.type === "password"){

campoSenha.type = "text";
toggleSenha.innerHTML = '<i class="bi bi-eye-slash"></i>';

}else{

campoSenha.type = "password";
toggleSenha.innerHTML = '<i class="bi bi-eye"></i>';

}

});