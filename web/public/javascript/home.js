import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyAJKPVKbkBxVroymnunX1VYPk7fi72xvPU",
  authDomain: "gamemusic-de421.firebaseapp.com",
  projectId: "gamemusic-de421",
  storageBucket: "gamemusic-de421.firebasestorage.app",
  messagingSenderId: "694028870780",
  appId: "1:694028870780:web:fbc25d74ee3e627d4c15f9",
  measurementId: "G-D96WLBDM7Z"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



document.addEventListener("DOMContentLoaded", function() {
    
    const btnLogin = document.getElementById("btnLogin");
    const modal = document.getElementById("loginModal");
    const fechar = document.querySelector(".fechar");

    // =============================
    // 🔒 MODAL LOGIN
    // =============================
    if (btnLogin && modal && fechar) {

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
    }

    // =============================
    // 👁️ SENHA
    // =============================
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

    // =============================
    // FORM TROCA LOGIN/CADASTRO
    // =============================
    const abrirCadastro = document.getElementById("abrirCadastro");
    const voltarLogin = document.getElementById("voltarLogin");

    const formLogin = document.getElementById("formLogin");
    const formCadastro = document.getElementById("formCadastro");

    if (abrirCadastro && formLogin && formCadastro) {
        abrirCadastro.addEventListener("click", function(e){
            e.preventDefault();
            formLogin.style.display = "none";
            formCadastro.style.display = "block";
        });
    }

    if (voltarLogin && formLogin && formCadastro) {
        voltarLogin.addEventListener("click", function(e){
            e.preventDefault();
            formCadastro.style.display = "none";
            formLogin.style.display = "block";
        });
    }

    // =============================
    // EMAIL
    // =============================
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // =============================
    // MENSAGENS
    // =============================
    function getMensagem(campo) {

        switch (campo.name) {

            case "nome":
                return "Por favor, digite seu nome.";

            case "data_nascimento":
                return "Por favor, informe sua data de nascimento.";

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
    // VALIDAÇÃO CADASTRO + API
    // =============================
    if (formCadastro) {

        formCadastro.addEventListener("submit", async function(event){

            event.preventDefault();
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

            if (!valido) return;

            try {
                const formData = new FormData(formCadastro);

                const response = await fetch("http://localhost/game-music-main/private/php/cadastro.php", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (data.status === "success") {
                    mostrarToast(data.message);
                    formCadastro.reset();
                    document.getElementById("idade").textContent = "--";

                    formCadastro.style.display = "none";
                    formLogin.style.display = "block";

                } else {
                    mostrarToast(data.message, "#dc3545");
                }

            } catch (error) {
                mostrarToast("Erro ao conectar com o servidor", "#dc3545");
            }

        });
    }

    // =============================
    // LOGIN API
    // =============================
    if (formLogin) {

        formLogin.addEventListener("submit", async function(event) {
            event.preventDefault();

            const formData = new FormData(formLogin);

            try {
                const response = await fetch("http://localhost/game-music-main/private/php/login.php", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (data.status === "success") {
                    mostrarToast(data.message);

                    setTimeout(() => {
                        window.location.href = "../../private/php/home.php";
                    }, 1000);

                } else {
                    mostrarToast(data.message, "#dc3545");
                }

            } catch (error) {
                mostrarToast("Erro ao conectar com o servidor", "#dc3545");
            }
        });
    }

    // =============================
    // TOAST
    // =============================
    function mostrarToast(mensagem, cor = "#28a745") {

        const toast = document.createElement("div");

        toast.innerText = mensagem;

        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.background = cor;
        toast.style.color = "#fff";
        toast.style.padding = "12px 18px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
        toast.style.fontSize = "14px";
        toast.style.zIndex = "9999";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.5s ease";

        document.body.appendChild(toast);

        setTimeout(() => toast.style.opacity = "1", 100);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

});

// =============================
// CALCULO IDADE
// =============================
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

function atualizarIdade() {
    const input = document.getElementById("data_nascimento");
    const spanIdade = document.getElementById("idade");

    if (!input.value) {
        spanIdade.textContent = "--";
        return;
    }

    const idade = calcularIdade(input.value);
    spanIdade.textContent = idade;
}

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("data_nascimento");

    if (input) {
        input.addEventListener("change", atualizarIdade);
    }
});
// ================= GOOGLE LOGIN =================
const googleBtn = document.getElementById("google-login");

if (googleBtn) {
    googleBtn.addEventListener("click", async () => {

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const response = await fetch("http://localhost/game-music-main/private/php/google-login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: user.displayName,
                    email: user.email,
                    google_id: user.uid
                })
            });

            const data = await response.json();

            if (data.status === "success") {
                mostrarToast(data.message);

                setTimeout(() => {
                    window.location.href = "../../private/php/home.php";
                }, 1000);

            } else {
                mostrarToast(data.message, "#dc3545");
            }

        } catch (error) {
            console.error(error);
            mostrarToast("Erro no login com Google", "#dc3545");
        }

    });
}


