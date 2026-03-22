# 🎯 home.js - Interações do Frontend

Este arquivo JavaScript é responsável por toda a interatividade da página inicial, incluindo:

* Abertura e fechamento do modal de login
* Alternância entre login e cadastro
* Mostrar/ocultar senha
* Validação de formulário
* Feedback visual de erros
* Notificação de sucesso (toast)

---

## 🚀 Inicialização

```javascript
document.addEventListener("DOMContentLoaded", function() {
```

Garante que todo o código só será executado após o carregamento completo do HTML.

---

## 🔐 Modal de Login

```javascript
const btnLogin = document.getElementById("btnLogin");
const modal = document.getElementById("loginModal");
const fechar = document.querySelector(".fechar");
```

Seleciona os elementos do modal.

### ▶️ Abrir modal

```javascript
btnLogin.addEventListener("click", function(){
    modal.classList.add("ativo");
});
```

Adiciona a classe `ativo`, tornando o modal visível.

### ❌ Fechar modal

```javascript
fechar.addEventListener("click", function(){
    modal.classList.remove("ativo");
});
```

Remove a classe `ativo`, escondendo o modal.

### 🖱️ Fechar clicando fora

```javascript
window.addEventListener("click", function(event){
    if(event.target === modal){
        modal.classList.remove("ativo");
    }
});
```

Fecha o modal ao clicar fora da área interna.

---

## 👁️ Mostrar/Ocultar Senha

```javascript
window.toggleSenha = function(idCampo, elemento)
```

Função global para alternar a visibilidade da senha.

```javascript
if (campo.type === "password") {
    campo.type = "text";
```

Mostra a senha.

```javascript
icone.classList.replace("bi-eye", "bi-eye-slash");
```

Troca o ícone visual.

✔ Permite melhor experiência ao usuário ao digitar senha.

---

## 🔄 Alternar Login ↔ Cadastro

```javascript
abrirCadastro.addEventListener("click", function(e){
```

Mostra o formulário de cadastro.

```javascript
formLogin.style.display = "none";
formCadastro.style.display = "block";
```

Oculta login e exibe cadastro.

```javascript
voltarLogin.addEventListener("click", function(e){
```

Faz o processo inverso.

---

## 🔍 Validação de Email

```javascript
function validarEmail(email)
```

Utiliza expressão regular (regex) para validar formato de email.

```javascript
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

✔ Garante que o email tenha formato válido.

---

## 🧾 Mensagens Personalizadas

```javascript
function getMensagem(campo)
```

Retorna mensagens específicas para cada campo.

Exemplo:

```javascript
case "email":
    return "Por favor, digite um email válido.";
```

✔ Melhora a experiência do usuário com feedback claro.

---

## ✅ Validação do Formulário (Cadastro)

```javascript
formCadastro.addEventListener("submit", function(event)
```

Executa validação antes de enviar o formulário.

### 🔹 Verificação geral

```javascript
if (!campo.value.trim())
```

* Marca campo como inválido
* Adiciona borda vermelha
* Exibe mensagem de erro

---

### 🔹 Validação de email

```javascript
if (email.value && !validarEmail(email.value))
```

Verifica se o email está no formato correto.

---

### 🔹 Validação de senha

```javascript
if (senha.value !== confirmar.value)
```

Confirma se as senhas coincidem.

---

### 🚫 Bloqueio de envio

```javascript
if (!valido) {
    event.preventDefault();
}
```

Impede envio do formulário caso haja erros.

---

## 🔄 Validação em Tempo Real

```javascript
campo.addEventListener("input", function()
```

Valida os campos enquanto o usuário digita.

✔ Remove erros automaticamente ao corrigir
✔ Torna a experiência mais dinâmica

Também inclui validação de email em tempo real.

---

## 🔔 Toast de Sucesso

```javascript
const params = new URLSearchParams(window.location.search);
```

Lê parâmetros da URL.

```javascript
if (params.get("sucesso") === "1")
```

Verifica se houve cadastro com sucesso.

---

### 📢 Exibir mensagem

```javascript
mostrarToast("Seu cadastro foi realizado com sucesso!");
```

Cria uma notificação visual.

---

### 🎨 Estilo do toast

```javascript
toast.style.position = "fixed";
toast.style.top = "20px";
toast.style.right = "20px";
```

Posiciona no canto superior direito.

---

### ✨ Animação

```javascript
toast.style.opacity = "0 → 1 → 0";
```

* Fade in (aparece)
* Permanece visível
* Fade out (desaparece)

---

### 🧹 Limpeza da URL

```javascript
window.history.replaceState({}, document.title, window.location.pathname);
```

Remove o parâmetro `?sucesso=1` da URL após exibir o toast.

---

## ✅ Funcionalidades

✔ Modal de login interativo
✔ Alternância entre login e cadastro
✔ Mostrar/ocultar senha
✔ Validação completa de formulário
✔ Validação em tempo real
✔ Feedback visual de erros
✔ Notificação de sucesso

---

## 🚀 Possíveis melhorias

* Animações mais suaves com CSS
* Validação mais avançada de senha
* Integração com API de autenticação
* Reutilização de componentes

---
