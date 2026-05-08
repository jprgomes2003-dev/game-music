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
        zIndex: "99999"
    });

    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4000);
}

// ================= SENHA =================
function toggleSenha(id, el) {
    const input = document.getElementById(id);
    const icon = el.querySelector("i");

    if (!input) return;

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
    const modal = document.getElementById("modalPerfil");
    if (modal) modal.style.display = "flex";
}

function fecharPerfil() {
    const modal = document.getElementById("modalPerfil");
    if (modal) modal.style.display = "none";
}

window.abrirPerfil = abrirPerfil;
window.fecharPerfil = fecharPerfil;

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("loginModal");
    const formLogin = document.getElementById("formLogin");
    const formCadastro = document.getElementById("formCadastro");
    const googleBtn = document.getElementById("google-login");
    const areaUsuario = document.getElementById("area-usuario");

    const popup = document.getElementById("popupUsername");
    const helpModal = document.getElementById("helpModal");

    const btnAbrirCadastro = document.getElementById("abrirCadastro");
    const btnVoltarLogin = document.getElementById("voltarLogin");
    const fecharModal = document.getElementById("fecharModal");

    const helpBtn = document.getElementById("abrirHelp");
    const fecharHelp = document.getElementById("fecharHelp");

    const btnJogar = document.querySelector(".btn-jogar");
    const dashboard = document.getElementById("dashboard");
    const telaDificuldade = document.getElementById("telaDificuldade");

    // esconder popup inicial
    if (popup) popup.style.display = "none";

    // ================= TROCA LOGIN/CADASTRO =================
    btnAbrirCadastro?.addEventListener("click", () => {
        formLogin.style.display = "none";
        formCadastro.style.display = "block";
    });

    btnVoltarLogin?.addEventListener("click", () => {
        formCadastro.style.display = "none";
        formLogin.style.display = "block";
    });

    fecharModal?.addEventListener("click", () => {
        modal?.classList.remove("ativo");
    });

    // ================= OLHO SENHA =================
    document.querySelectorAll(".olho-senha").forEach(el => {
        el.addEventListener("click", () => {
            const id = el.getAttribute("data-target");
            toggleSenha(id, el);
        });
    });

    // ================= BOTÃO JOGAR =================
    btnJogar?.addEventListener("click", () => {

        if (dashboard) dashboard.style.display = "none";

        if (telaDificuldade) {
            telaDificuldade.style.display = "flex";
        } else {
            console.error("Tela de dificuldade não encontrada no HTML");
        }

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    google_id: user.uid,
                    email: user.email
                })
            });

            const data = await res.json();

            if (data.status === "success") {
                mostrarToast("Login Google OK");
                location.reload();
            } else if (data.status === "novo") {
                if (popup) popup.style.display = "flex";
            } else {
                mostrarToast(data.message, "#dc3545");
            }

        } catch {
            mostrarToast("Erro Google", "#dc3545");
        }
    });

    // ================= SALVAR USERNAME =================
    window.salvarUsername = async function () {
        const nome = document.getElementById("inputUsername")?.value.trim();

        if (!nome) return mostrarToast("Digite um nome", "#dc3545");

        try {
            const res = await fetch("../private/php/criar_usuario_google.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
    };

    // ================= CHECK AUTH =================
    fetch("../private/php/check-auth.php")
        .then(res => res.json())
        .then(data => {

            if (data.logado) {

                document.getElementById("dashboard").style.display = "flex";
                document.querySelector(".titulo").style.display = "none";
                document.querySelector(".menu").style.display = "none";

                const nomeEl = document.getElementById("dashboardNome");
                if (nomeEl) nomeEl.innerText = "Olá, " + data.nome;

                areaUsuario.innerHTML = `
                <div class="dropdown">

                    <button class="icon-btn dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle"></i>
                    </button>

                    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">

                        <li class="px-3 py-2 text-white">
                            <i class="bi bi-person-fill me-2"></i>
                            ${data.nome}
                        </li>

                        <li><hr class="dropdown-divider"></li>

                        <li>
                            <button class="dropdown-item" id="btnPerfil">
                                <i class="bi bi-person-gear me-2"></i>
                                Perfil
                            </button>
                        </li>

                        <li>
                            <button class="dropdown-item text-danger" id="btnLogout">
                                <i class="bi bi-box-arrow-right me-2"></i>
                                Sair
                            </button>
                        </li>

                    </ul>

                </div>
                `;

            } else {

                areaUsuario.innerHTML = `
                    <button id="btnLogin" class="icon-btn">
                        <i class="bi bi-person-fill"></i>
                    </button>
                `;

                document.getElementById("btnLogin")?.addEventListener("click", () => {
                    modal?.classList.add("ativo");
                });
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

            const nome = document.getElementById("perfilNome");
            const email = document.getElementById("perfilEmail");

            if (nome) nome.value = user.nome;
            if (email) email.innerText = user.email || "";

            abrirPerfil();
        }
    });

    // ================= HELP =================
    helpBtn?.addEventListener("click", () => {
        helpModal?.classList.add("ativo");
    });

    fecharHelp?.addEventListener("click", () => {
        helpModal?.classList.remove("ativo");
    });

});


// ================= FUNÇÃO GLOBAL =================
window.iniciarJogo = function (nivel) {
    alert("Iniciando jogo nível: " + nivel);

    // aqui você depois liga com sua lógica real do jogo
};