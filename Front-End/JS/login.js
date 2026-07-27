const form = document.getElementById("loginForm");
const nomeInput = document.getElementById("nomeAdmin");
const senhaInput = document.getElementById("senhaAdmin");
const erroNome = document.getElementById("erro-nome");
const erroSenha = document.getElementById("erro-senha");
const erroNomeInvalido = document.getElementById("erro-nome-invalido");
const erroSenhaInvalida = document.getElementById("erro-senha-invalida");

const apiUrl = "http://localhost:3000/login";

function clearErrors() {
  erroNome.style.display = "none";
  erroSenha.style.display = "none";
  erroNomeInvalido.style.display = "none";
  erroSenhaInvalida.style.display = "none";
}

async function handleLogin(event) {
  event.preventDefault();
  clearErrors();
  
  const nome = nomeInput.value.trim();
  const senha = senhaInput.value.trim();
  let hasError = false;

  if (!nome) {
    erroNome.style.display = "block";
    hasError = true;
  }

  if (!senha) {
    erroSenha.style.display = "block";
    hasError = true;
  }

  if (hasError) {
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        if (data.field === "nome") {
          erroNomeInvalido.style.display = "block";
          erroSenhaInvalida.style.display = "none";
        } else if (data.field === "senha") {
          erroNomeInvalido.style.display = "none";
          erroSenhaInvalida.style.display = "block";
        } else {
          erroNomeInvalido.style.display = "block";
          erroSenhaInvalida.style.display = "block";
        }
      } else {
        alert(data.error || "Erro ao validar login. Tente novamente.");
      }
      return;
    }

    window.location.href = "inicio.html";
  } catch (error) {
    console.error("Erro de conexão com o backend:", error);
    alert("Não foi possível conectar ao servidor de login. Verifique se a API está rodando.");
  }
}

form.addEventListener("submit", handleLogin);
