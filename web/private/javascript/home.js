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

provider.addScope("email");
provider.addScope("profile");

// ================= TOAST =================
function mostrarToast(msg, cor = "#28a745") {
    const t = document.createElement("div");
    t.innerText = msg;

    Object.assign(t.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        background: cor,
        color: "#fff",
        padding: "12px 18px",
        borderRadius: "8px",
        zIndex: "9999"
    });

    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4000);
}

// ================= SENHA =================
function toggleSenha(id, elemento) {
    const input = document.getElementById(id);
    const icon = elemento.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("bi-eye", "bi-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("bi-eye-slash", "bi-eye");
    }
}

// ================= PERFIL =================
function abrirPerfil() {
    document.getElementById("modalPerfil").style.display = "flex";
}

function fecharPerfil() {
    document.getElementById("modalPerfil").style.display = "none";
}

window.abrirPerfil = abrirPerfil;
window.fecharPerfil = fecharPerfil;

// ================= APP =================
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("loginModal");
    const formLogin = document.getElementById("formLogin");
    const formCadastro = document.getElementById("formCadastro");
    const googleBtn = document.getElementById("google-login");
    const areaUsuario = document.getElementById("area-usuario");

    const modalPerfil = document.getElementById("modalPerfil");
    const perfilNome = document.getElementById("perfilNome");
    const popup = document.getElementById("popupUsername");

    const btnAbrirCadastro = document.getElementById("abrirCadastro");
    const btnVoltarLogin = document.getElementById("voltarLogin");
    const fecharModal = document.getElementById("fecharModal");

    // HELP MODAL
    const helpBtn = document.querySelector(".help-btn button");
    const helpModal = document.getElementById("helpModal");
    const fecharHelp = document.getElementById("fecharHelp");

    popup.style.display = "none";

    // ================= TROCA LOGIN / CADASTRO =================
    btnAbrirCadastro?.addEventListener("click", () => {
        formLogin.style.display = "none";
        formCadastro.style.display = "block";
    });

    btnVoltarLogin?.addEventListener("click", () => {
        formCadastro.style.display = "none";
        formLogin.style.display = "block";
    });

    fecharModal?.addEventListener("click", () => {
        modal.classList.remove("ativo");
    });

    // ================= OLHO SENHA =================
    document.querySelectorAll(".olho-senha").forEach(el => {
        el.addEventListener("click", () => {
            const id = el.getAttribute("data-target");
            toggleSenha(id, el);
        });
    });

    // ================= LOGIN =================
    formLogin?.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("../private/php/login.php", {
                method: "POST",
                body: new FormData(formLogin)
            });

            const data = await res.json();

            if (data.status === "success") {
                mostrarToast("Login OK");
                location.reload();
            } else {
                mostrarToast(data.message, "#dc3545");
            }
        } catch {
            mostrarToast("Erro no servidor", "#dc3545");
        }
    });

    // ================= CADASTRO =================
    formCadastro?.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("../private/php/cadastro.php", {
                method: "POST",
                body: new FormData(formCadastro)
            });

            const data = await res.json();

            if (data.status === "success") {
                mostrarToast("Cadastro OK");
                formCadastro.reset();
            } else {
                mostrarToast(data.message, "#dc3545");
            }
        } catch {
            mostrarToast("Erro no servidor", "#dc3545");
        }
    });

    // ================= GOOGLE LOGIN =================
    googleBtn?.addEventListener("click", async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const res = await fetch("../private/php/google-login.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    google_id: user.uid,
                    email: user.email
                })
            });

            const data = await res.json();

            if (data.status === "success") {
                mostrarToast("Google login OK");
                location.reload();
            } else if (data.status === "novo") {
                popup.style.display = "flex";
            } else {
                mostrarToast(data.message, "#dc3545");
            }

        } catch {
            mostrarToast("Erro Google", "#dc3545");
        }
    });

    // ================= USERNAME GOOGLE =================
    async function salvarUsername() {
        const nome = document.getElementById("inputUsername").value.trim();

        if (!nome) {
            mostrarToast("Digite um nome", "#dc3545");
            return;
        }

        try {
            const res = await fetch("../private/php/criar_usuario_google.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ nome })
            });

            const data = await res.json();

            if (data.status === "success") {
                mostrarToast("Conta criada!");
                location.reload();
            } else {
                mostrarToast(data.message, "#dc3545");
            }
        } catch {
            mostrarToast("Erro ao criar usuário", "#dc3545");
        }
    }

    window.salvarUsername = salvarUsername;

    // ================= PERFIL =================
    document.getElementById("salvarPerfil")?.addEventListener("click", async () => {

        try {
            const res = await fetch("../private/php/atualizar_usuario.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    nome: perfilNome.value,
                    senha_atual: document.getElementById("senhaAtual").value,
                    nova_senha: document.getElementById("novaSenha").value
                })
            });

            const data = await res.json();

            if (data.status === "success") {
                mostrarToast("Atualizado!");
                location.reload();
            } else {
                mostrarToast(data.message, "#dc3545");
            }

        } catch {
            mostrarToast("Erro ao atualizar", "#dc3545");
        }
    });

    // ================= CHECK AUTH =================
    fetch("../private/php/check-auth.php")
    .then(res => res.json())
    .then(data => {

        if (data.logado) {

            document.getElementById("dashboard").style.display = "block";
            document.querySelector(".titulo").style.display = "none";
            document.querySelector(".menu").style.display = "none";

            document.getElementById("dashboardNome").innerText = "Olá, " + data.nome;

            areaUsuario.innerHTML = `
                <button class="icon-btn dropdown-toggle" data-bs-toggle="dropdown">
                    <img src="icon-user.png" width="32" style="border-radius:50%">
                </button>

                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                    <li class="px-3 py-2 text-white">${data.nome}</li>
                    <li><hr></li>
                    <li><button class="dropdown-item" id="btnPerfil">Perfil</button></li>
                    <li><button class="dropdown-item text-danger" id="btnLogout">Sair</button></li>
                </ul>
            `;

        } else {

            if (data.precisa_username) {
                popup.style.display = "flex";
            }

            areaUsuario.innerHTML = `
                <button id="btnLogin" class="icon-btn">
                    <i class="bi bi-person-fill"></i>
                </button>
            `;

            document.getElementById("btnLogin").onclick = () => {
                modal.classList.add("ativo");
            };
        }
    });

    // ================= EVENTOS DINÂMICOS =================
    document.addEventListener("click", async (e) => {

        if (e.target.closest("#btnLogout")) {
            fetch("../private/php/logout.php")
            .then(() => location.reload());
        }

        if (e.target.id === "btnPerfil") {
            const res = await fetch("../private/php/get_usuario.php");
            const user = await res.json();

            perfilNome.value = user.nome;

            if (user.google === true) {
                document.getElementById("senhaAtual").style.display = "none";
            }

            abrirPerfil();
        }
    });

    // ================= HELP MODAL =================
    helpBtn?.addEventListener("click", () => {
        helpModal.classList.add("ativo");
    });

    fecharHelp?.addEventListener("click", () => {
        helpModal.classList.remove("ativo");
    });

    helpModal?.addEventListener("click", (e) => {
        if (e.target === helpModal) {
            helpModal.classList.remove("ativo");
        }
    });

});