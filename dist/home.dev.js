"use strict";

var btnLogin = document.getElementById("btnLogin");
var modal = document.getElementById("loginModal");
var fechar = document.querySelector(".fechar");
btnLogin.addEventListener("click", function () {
  modal.classList.add("ativo");
});
fechar.addEventListener("click", function () {
  modal.classList.remove("ativo");
});
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("ativo");
  }
});
var toggleSenha = document.getElementById("toggleSenha");
var campoSenha = document.getElementById("campoSenha");
toggleSenha.addEventListener("click", function () {
  if (campoSenha.type === "password") {
    campoSenha.type = "text";
    toggleSenha.innerHTML = '<i class="bi bi-eye-slash"></i>';
  } else {
    campoSenha.type = "password";
    toggleSenha.innerHTML = '<i class="bi bi-eye"></i>';
  }
});
//# sourceMappingURL=home.dev.js.map
