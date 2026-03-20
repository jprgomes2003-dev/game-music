document.addEventListener("DOMContentLoaded", function() {

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

// 👁️ FUNÇÃO GLOBAL (FUNCIONA EM TODOS OS CAMPOS)
window.toggleSenha = function(idCampo, elemento) {
    const campo = document.getElementById(idCampo);
    const icone = elemento.querySelector("i");

    if (!campo || !icone) return;

    if (campo.type === "password") {
        campo.type = "text";
        icone.classList.replace("bi-eye", "bi-eye-slash");
    } else {
        campo.type = "password";
        icone.classList.replace("bi-eye-slash", "bi-eye");
    }
};

// 🔄 TROCAR LOGIN ↔ CADASTRO
const abrirCadastro = document.getElementById("abrirCadastro");
const voltarLogin = document.getElementById("voltarLogin");

const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

abrirCadastro.addEventListener("click", function(e){
    e.preventDefault();
    formLogin.style.display = "none";
    formCadastro.style.display = "block";
});

voltarLogin.addEventListener("click", function(e){
    e.preventDefault();
    formCadastro.style.display = "none";
    formLogin.style.display = "block";
});


// =============================
// ✅ VALIDAÇÃO DO CADASTRO
// =============================
formCadastro.addEventListener("submit", function(event){

    let valido = true;

    const campos = formCadastro.querySelectorAll("input");

    campos.forEach(campo => {

        const grupo = campo.closest(".input-group");
        const feedback = grupo.querySelector(".invalid-feedback");

        if (!campo.value.trim()) {

            campo.classList.add("is-invalid");

            // 🔥 força borda vermelha (resolve Bootstrap)
            campo.style.border = "2px solid #dc3545";

            if (feedback) {
                feedback.innerText = "Preencher o campo obrigatório!";
            }

            valido = false;

        } else {

            campo.classList.remove("is-invalid");
            campo.style.border = "";

        }

    });

    if (!valido) {
        event.preventDefault();
    }

});


// =============================
// 🔄 REMOVER ERRO AO DIGITAR
// =============================
formCadastro.querySelectorAll("input").forEach(campo => {

    campo.addEventListener("input", function(){

        const grupo = campo.closest(".input-group");
        const feedback = grupo ? grupo.querySelector(".invalid-feedback") : null;

        if (!campo.value.trim()) {

          campo.classList.add("is-invalid");
            campo.closest(".input-group").classList.add("has-validation");
            campo.style.border = "2px solid #f9a8b0";

            if (feedback) {
                feedback.innerText = "Campo vazio";
            }

        } else {

            campo.classList.remove("is-invalid");
            campo.style.border = "";

        }

    });

});



});