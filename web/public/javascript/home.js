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



// ================= TOAST GLOBAL =================
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
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
}
// ================= toggle senha =================
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
// ================= DOM =================
document.addEventListener("DOMContentLoaded", function () {

    const btnLogin = document.getElementById("btnLogin");
    const modal = document.getElementById("loginModal");
    const fechar = document.querySelector(".fechar");

    const formLogin = document.getElementById("formLogin");
    const formCadastro = document.getElementById("formCadastro");

    const abrirCadastro = document.getElementById("abrirCadastro");
    const voltarLogin = document.getElementById("voltarLogin");

    const googleBtn = document.getElementById("google-login");
    const areaUsuario = document.getElementById("area-usuario");

    // ================= MODAL =================
    if (btnLogin && modal) {
        btnLogin.onclick = () => modal.classList.add("ativo");
    }

    if (fechar && modal) {
        fechar.onclick = () => modal.classList.remove("ativo");
    }

    // ================= TROCA FORM =================
    if (abrirCadastro) {
        abrirCadastro.onclick = (e) => {
            e.preventDefault();
            formLogin.style.display = "none";
            formCadastro.style.display = "block";
        };
    }

    if (voltarLogin) {
        voltarLogin.onclick = (e) => {
            e.preventDefault();
            formCadastro.style.display = "none";
            formLogin.style.display = "block";
        };
    }

    // ================= LOGIN =================
    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(formLogin);

            try {
                const res = await fetch("../private/php/login.php", {
                    method: "POST",
                    body: formData
                });

                const data = await res.json();

                if (data.status === "success") {
                    mostrarToast(data.message);
                    setTimeout(() => location.href = "../private/php/home.php", 1000);
                } else {
                    mostrarToast(data.message, "#dc3545");
                }

            } catch {
                mostrarToast("Erro no servidor", "#dc3545");
            }
        });
    }

    // ================= CADASTRO =================
    formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = formCadastro.nome.value.trim();
    const data = formCadastro.data_nascimento.value;
    const senha = formCadastro.senha.value;
    const confirmar = formCadastro.confirmar_senha.value;

    if (!nome || !data || !senha || !confirmar) {
        mostrarToast("Preencha todos os campos", "#dc3545");
        return;
    }

    if (senha !== confirmar) {
        mostrarToast("As senhas não coincidem", "#dc3545");
        return;
    }

    const formData = new FormData(formCadastro);

    try {
        const res = await fetch("../private/php/cadastro.php", {
            method: "POST",
            body: formData
        });

        const dataRes = await res.json();

        if (dataRes.status === "success") {
            mostrarToast(dataRes.message);
            formCadastro.reset();
            formCadastro.style.display = "none";
            formLogin.style.display = "block";
        } else {
            mostrarToast(dataRes.message, "#dc3545");
        }

    } catch {
        mostrarToast("Erro no servidor", "#dc3545");
    }
});

    // ================= GOOGLE LOGIN =================
    if (googleBtn) {
        googleBtn.addEventListener("click", async () => {

            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                const res = await fetch("../private/php/google-login.php", {
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

                const data = await res.json();

                if (data.status === "success") {
                    mostrarToast("Login com Google OK");
                    setTimeout(() => location.href = "../private/php/home.php", 1000);
                }

            } catch (e) {
                console.error(e);
                mostrarToast("Erro Google", "#dc3545");
            }
        });
    }

    // ================= CHECK AUTH =================
    if (areaUsuario) {
        fetch("../private/php/check-auth.php")
        .then(res => res.json())
        .then(data => {
            if (data.logado) {
                areaUsuario.innerHTML = `
                    <span class="text-white">Olá, ${data.nome}</span>
                    <a href="../private/php/logout.php" class="btn btn-danger btn-sm">Sair</a>
                `;
                if (modal) modal.style.display = "none";
            }
        })
        .catch(err => console.error(err));
    }
    // ================= MOSTRAR/OCULTAR SENHA =================
document.querySelectorAll(".olho-senha").forEach(btn => {
    btn.addEventListener("click", function () {
        const id = this.getAttribute("data-target");
        const input = document.getElementById(id);
        const icon = this.querySelector("i");

        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("bi-eye", "bi-eye-slash");
        } else {
            input.type = "password";
            icon.classList.replace("bi-eye-slash", "bi-eye");
        }
    });
});

});