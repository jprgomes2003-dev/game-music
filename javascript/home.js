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

    // 👁️ MOSTRAR/OCULTAR SENHA
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
    // 🔍 VALIDAÇÃO DE EMAIL
    // =============================
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // =============================
    // 🧾 MENSAGENS PERSONALIZADAS
    // =============================
    function getMensagem(campo) {

        switch (campo.name) {

            case "nome":
                return "Por favor, digite seu nome.";

            case "idade":
                return "Por favor, informe sua idade.";

            case "email":
                return "Por favor, digite um email válido.";

            case "senha":
                return "Por favor, crie uma senha.";

            case "confirmar_senha":
                return "Por favor, confirme sua senha.";

            default:
                return "Campo obrigatório.";
        }
    }

    // =============================
    // ✅ VALIDAÇÃO DO CADASTRO
    // =============================
    formCadastro.addEventListener("submit", function(event){

        let valido = true;

        const campos = formCadastro.querySelectorAll("input");

        campos.forEach(campo => {

            const mensagem = campo.parentElement.nextElementSibling;

            if (!campo.value.trim()) {

                campo.classList.add("is-invalid");
                campo.style.border = "2px solid #dc3545";

                if (mensagem) {
                    mensagem.textContent = getMensagem(campo);
                }

                valido = false;

            } else {

                campo.classList.remove("is-invalid");
                campo.style.border = "";

                if (mensagem) {
                    mensagem.textContent = "";
                }

            }

        });

        // ✅ valida email
        const email = formCadastro.querySelector('input[name="email"]');
        const mensagemEmail = email.parentElement.nextElementSibling;

        if (email.value && !validarEmail(email.value)) {

            email.classList.add("is-invalid");
            email.style.border = "2px solid #dc3545";

            if (mensagemEmail) {
                mensagemEmail.textContent = "Por favor, digite um email válido.";
            }

            valido = false;
        }

        // ✅ valida senha igual
        const senha = document.getElementById("senhaCadastro");
        const confirmar = document.getElementById("confirmarSenha");

        const mensagemConfirmar = confirmar.parentElement.nextElementSibling;

        if (senha.value && confirmar.value && senha.value !== confirmar.value) {

            confirmar.classList.add("is-invalid");
            confirmar.style.border = "2px solid #dc3545";

            if (mensagemConfirmar) {
                mensagemConfirmar.textContent = "As senhas não coincidem.";
            }

            valido = false;
        }

        if (!valido) {
            event.preventDefault();
        }

    });

    // =============================
    // 🔄 VALIDAÇÃO EM TEMPO REAL
    // =============================
    formCadastro.querySelectorAll("input").forEach(campo => {

        campo.addEventListener("input", function(){

            const mensagem = campo.parentElement.nextElementSibling;

            if (!campo.value.trim()) {

                campo.classList.add("is-invalid");
                campo.style.border = "2px solid #dc3545";

                if (mensagem) {
                    mensagem.textContent = getMensagem(campo);
                }

            } else {

                campo.classList.remove("is-invalid");
                campo.style.border = "";

                if (mensagem) {
                    mensagem.textContent = "";
                }

            }

            // valida email em tempo real
            if (campo.name === "email" && campo.value.trim()) {

                const mensagemEmail = campo.parentElement.nextElementSibling;

                if (!validarEmail(campo.value)) {

                    campo.classList.add("is-invalid");
                    campo.style.border = "2px solid #dc3545";

                    if (mensagemEmail) {
                        mensagemEmail.textContent = "Por favor, digite um email válido.";
                    }

                } else {

                    campo.classList.remove("is-invalid");
                    campo.style.border = "";

                    if (mensagemEmail) {
                        mensagemEmail.textContent = "";
                    }

                }
            }

        });

    });

    // =============================
    //  TOAST DE SUCESSO
    // =============================
    const params = new URLSearchParams(window.location.search);

    if (params.get("sucesso") === "1") {

        mostrarToast("Seu cadastro foi realizado com sucesso!");

        window.history.replaceState({}, document.title, window.location.pathname);
    }

    function mostrarToast(mensagem) {

    const toast = document.createElement("div");

    toast.innerText = mensagem;

    toast.style.position = "fixed";
    toast.style.top = "20px";          // ⬅️ topo
    toast.style.right = "20px";        // ⬅️ lado direito
    toast.style.background = "#28a745";
    toast.style.color = "#fff";
    toast.style.padding = "12px 18px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";

    document.body.appendChild(toast);

    // animação de entrada
    setTimeout(() => {
        toast.style.opacity = "1";
    }, 100);

    // remover após alguns segundos
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 4000);
   }

});